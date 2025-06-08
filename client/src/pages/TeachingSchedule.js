import TeacherLayout from '../layouts/TeacherLayout';
import { User, ChevronDown } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import ScheduleService from '../services/ScheduleService';

export default function TeachingSchedule() {
    const navigate = useNavigate();

    const handleAttendanceClick = (classItem, date) => {
        navigate(`/student-attendance-list?classId=${classItem.id}&date=${date}&className=${classItem.name}`);
    };

    // Get schedule details and slots using data from ScheduleService
    const scheduleItems = ScheduleService.getSchedule();
    const slots = ScheduleService.getSlots();

    // Group schedule items by slotId so that each row represents one slot
    const groupedSchedule = {};
    scheduleItems.forEach(item => {
        const { slotId } = item;
        if (!groupedSchedule[slotId]) {
            groupedSchedule[slotId] = [];
        }
        groupedSchedule[slotId].push(item);
    });

    // Define weekdays (Monday is 1 and Sunday is 0)
    const weekdays = [
        { label: "Monday", targetDay: 1 },
        { label: "Tuesday", targetDay: 2 },
        { label: "Wednesday", targetDay: 3 },
        { label: "Thursday", targetDay: 4 },
        { label: "Friday", targetDay: 5 },
        { label: "Saturday", targetDay: 6 },
        { label: "Sunday", targetDay: 0 }
    ];

    return (
        <TeacherLayout>
            <div className="w-full p-8 bg-gray-50 min-h-screen">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Teaching Schedule</h2>
                        <p className="text-gray-500">Week of 26/5/2025 - 1/6/2025</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="w-36 h-12 border rounded-md px-2 py-2 bg-white text-gray-800 font-medium shadow-sm hover:bg-gray-100 flex items-center justify-center">
                            Week View <ChevronDown className="ml-2 w-6 h-6" />
                        </button>
                    </div>
                </div>
                <div className="bg-white rounded-xl shadow p-4 mb-6 flex items-center gap-6">
                    <span className="text-blue-600 text-3xl">
                        <User className="inline w-8 h-8" />
                    </span>
                    <div className="flex-1">
                        <div className="font-semibold text-lg text-gray-900">Welcome back, Sarah Johnson</div>
                        <div className="text-gray-500 text-sm">Teacher</div>
                    </div>
                </div>
                {/* Schedule Table */}
                <div className="">
                    <table className="min-w-full bg-white shadow-md rounded-lg border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                                <th className="py-3 px-4 text-center border border-gray-200">Time</th>
                                {weekdays.map(day => (
                                    <th key={day.label} className="py-3 px-4 text-center border border-gray-200">
                                        {day.label}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="text-gray-700 text-sm">
                            {slots.map(slot => {
                                const slotNumber = slot.id;
                                const itemsForSlot = groupedSchedule[slotNumber] || [];
                                return (
                                    <tr key={slotNumber} className="border-b last:border-none">
                                        {/* First cell shows the slot time */}
                                        <td className="py-4 px-4 font-semibold text-gray-500 border border-gray-200">
                                            <div className={`text-lg text-gray-800 text-center`}>Slot {slotNumber}</div>
                                            <div className='text-center'>{slot.from} - {slot.to}</div>
                                        </td>
                                        {weekdays.map(day => {
                                            // Find a schedule item in this slot group that matches the weekday
                                            const scheduleForDay = itemsForSlot.find(item => {
                                                const date = new Date(item.date);
                                                return date.getDay() === day.targetDay;
                                            });
                                            return (
                                                <td key={day.label} className="py-2 px-2 border border-gray-200">
                                                    {scheduleForDay ? (
                                                        <>
                                                            <div>
                                                                <span className="pr-2 font-semibold">Class:</span>
                                                                <span className="text-blue-800 cursor-pointer">
                                                                    {scheduleForDay.class.name}
                                                                </span>
                                                            </div>
                                                            <div>
                                                                <span className="pr-2 font-semibold">Course:</span>
                                                                <span className="text-blue-800 cursor-pointer">
                                                                    {scheduleForDay.course.name}
                                                                </span>
                                                            </div>
                                                            <div>
                                                                <span className="text-sm text-gray-500 font-semibold py-0.5 rounded mt-1 inline-block">
                                                                    {scheduleForDay.date} in {scheduleForDay.room.name}
                                                                </span>
                                                            </div>
                                                            {scheduleForDay.meeting && (
                                                                <div>
                                                                    <span className="bg-green-300 text-xs font-semibold py-0.5 px-2 rounded">
                                                                        Online
                                                                    </span>
                                                                    <button
                                                                        type="button"
                                                                        className="p-0 ml-0.5 bg-transparent border-none text-blue-800 underline cursor-pointer"
                                                                        onClick={() => window.open(scheduleForDay.meeting, '_blank')}
                                                                    >
                                                                        Click to join meeting
                                                                    </button>
                                                                </div>
                                                            )}
                                                            <div>
                                                                <button
                                                                    className="bg-blue-600 text-white text-xs font-semibold px-2 py-0.5 rounded align-middle hover:bg-blue-700 transition"
                                                                    type="button"
                                                                    onClick={() => handleAttendanceClick(scheduleForDay.class, scheduleForDay.date)}
                                                                >
                                                                    Take attendance
                                                                </button>
                                                            </div>
                                                        </>
                                                    ) : null}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </TeacherLayout>
    );
}