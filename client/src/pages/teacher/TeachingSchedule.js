import { useState, useEffect } from "react";
import ScheduleService from "../../services/ScheduleService";

export default function TeachingSchedule() {
    const [schedule, setSchedule] = useState([]);
    const [slots, setSlots] = useState([]);
    const weekdays = [
        { label: "Monday", targetDay: 1, date: "2025-05-26" },
        { label: "Tuesday", targetDay: 2, date: "2025-05-27" },
        { label: "Wednesday", targetDay: 3, date: "2025-05-28" },
        { label: "Thursday", targetDay: 4, date: "2025-05-29" },
        { label: "Friday", targetDay: 5, date: "2025-05-30" },
        { label: "Saturday", targetDay: 6, date: "2025-05-31" },
        { label: "Sunday", targetDay: 0, date: "2025-06-01" }
    ];

    useEffect(() => {
        // Fetch schedule and slots using ScheduleService
        const fetchedSchedule = ScheduleService.getSchedule();
        const fetchedSlots = ScheduleService.getSlots();
        setSchedule(fetchedSchedule);
        setSlots(fetchedSlots);
    }, []);

    // Group schedule items by slotId
    const groupedSchedule = {};
    schedule.forEach(item => {
        const { slotId } = item;
        if (!groupedSchedule[slotId]) {
            groupedSchedule[slotId] = [];
        }
        groupedSchedule[slotId].push(item);
    });

    return (
        <div>
            <div className="w-full p-8 bg-gray-50 min-h-screen">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Teaching Schedule</h2>
                        <p className="text-gray-500">Week of 26/5/2025 - 1/6/2025</p>
                    </div>
                </div>
                <div className=" rounded-lg shadow-lg">
                    <table className="max-w-full min-w-[600px] bg-white shadow-md border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                                <th rowSpan={2} className="py-3 px-4 text-center border border-gray-200">Time</th>
                                {weekdays.map(day => (
                                    <th
                                        key={day.label}
                                        className="py-3 px-4 text-center border border-gray-200 w-[150px]" // Set equal width for all columns
                                    >
                                        {day.label}
                                    </th>
                                ))}
                            </tr>
                            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                                {weekdays.map(day => (
                                    <th
                                        key={day.label}
                                        className="py-3 px-4 text-center border border-gray-200 w-[150px]" // Set equal width for all columns
                                    >
                                        {day.date}
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
                                        <td className="py-4 px-4 font-semibold text-gray-500 border border-gray-200">
                                            <div className="text-lg text-gray-800 text-center">Slot {slotNumber}</div>
                                            <div className="text-center">{slot.from} - {slot.to}</div>
                                        </td>
                                        {weekdays.map(day => {
                                            const scheduleForDay = itemsForSlot.find(item => {
                                                const date = new Date(item.date);
                                                return date.getDay() === day.targetDay;
                                            });
                                            return (
                                                <td
                                                    key={day.label}
                                                    className="py-2 px-2 border border-gray-200 w-[250px]" // Set equal width for all columns
                                                >
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
                                                                    {scheduleForDay.course}
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
        </div>
    );
}