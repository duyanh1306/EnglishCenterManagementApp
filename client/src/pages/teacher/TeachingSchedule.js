import { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
export default function TeachingSchedule() {
    const [schedule, setSchedule] = useState([]);
    const [slots, setSlots] = useState([]);
    const [weekdays, setWeekdays] = useState([]);

    const navigate = useNavigate();
    const handleTakeAttendance = (scheduleId) => {
        navigate(`/teacher/attendance/${scheduleId}`);
    };

    // Function to get current week dates (Monday to Sunday)
    const getCurrentWeekDates = () => {
        const today = new Date();
        const currentDayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
        
        // Calculate the difference to get Monday (start of week)
        const daysToMonday = currentDayOfWeek === 0 ? -6 : 1 - currentDayOfWeek;
        const monday = new Date(today);
        monday.setDate(today.getDate() + daysToMonday);

        const weekDates = [];
        const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        const targetDays = [1, 2, 3, 4, 5, 6, 0]; // Monday=1, Tuesday=2, ..., Sunday=0

        for (let i = 0; i < 7; i++) {
            const date = new Date(monday);
            date.setDate(monday.getDate() + i);
            
            weekDates.push({
                label: dayNames[i],
                targetDay: targetDays[i],
                date: date.toISOString().split('T')[0] // Format as YYYY-MM-DD
            });
        }

        return weekDates;
    };

    // Function to format week range for display
    const getWeekRange = (weekDates) => {
        if (weekDates.length === 0) return "";
        
        const firstDate = new Date(weekDates[0].date);
        const lastDate = new Date(weekDates[6].date);
        
        const formatDate = (date) => {
            return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        };

        return `Week of ${formatDate(firstDate)} - ${formatDate(lastDate)}`;
    };

    useEffect(() => {
        // Set current week dates
        const currentWeekDates = getCurrentWeekDates();
        setWeekdays(currentWeekDates);

        // Fetch schedule and slots
        const fetchedSchedule = [
            {
                "id": "1",
                "slotId": "1",
                "className": "A",
                "course": "TOEIC",
                "room": "R101",
                "date": "2025-07-06"
            },
            {
                "id": "2",
                "slotId": "2",
                "className": "A",
                "course": "TOEIC",
                "room": "R102",
                "date": "2025-07-07"
            },
            {
                "id": "3",
                "slotId": "3",
                "className": "A",
                "course": "TOEIC",
                "room": "R103",
                "date": "2025-07-08"
            }
        ];
        const fetchedSlots = [
            {
                "id": "1",
                "from": "08:00",
                "to": "09:30"
            },
            {
                "id": "2",
                "from": "09:40",
                "to": "11:10"
            },
            {
                "id": "3",
                "from": "13:00",
                "to": "14:30"
            },
            {
                "id": "4",
                "from": "14:40",
                "to": "16:10"
            },
            {
                "id": "5",
                "from": "18:00",
                "to": "19:30"
            },
            {
                "id": "6",
                "from": "19:40",
                "to": "21:10"
            }
        ];
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
                        <p className="text-gray-500">{getWeekRange(weekdays)}</p>
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
                                        className="py-3 px-4 text-center border border-gray-200 w-[150px]"
                                    >
                                        {day.label}
                                    </th>
                                ))}
                            </tr>
                            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                                {weekdays.map(day => (
                                    <th
                                        key={day.label}
                                        className="py-3 px-4 text-center border border-gray-200 w-[150px]"
                                    >
                                        {new Date(day.date).getDate()}/{new Date(day.date).getMonth() + 1}
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
                                                    className="py-2 px-2 border border-gray-200 w-[250px]"
                                                >
                                                    {scheduleForDay ? (
                                                        <>
                                                            <div>
                                                                <span className="pr-2 font-semibold">Class:</span>
                                                                <span className="text-blue-800 cursor-pointer">
                                                                    {scheduleForDay.className}
                                                                </span>
                                                            </div>
                                                            <div>
                                                                <span className="pr-2 font-semibold">Course:</span>
                                                                <span className="text-blue-800 cursor-pointer">
                                                                    {scheduleForDay.course}
                                                                </span>
                                                            </div>
                                                            <div>
                                                                <span className="pr-2 font-semibold">Room:</span>
                                                                <span className="text-sm text-gray-500 font-semibold py-0.5 rounded mt-1 inline-block">
                                                                    {scheduleForDay.room}
                                                                </span>
                                                            </div>
                                                            <div>
                                                                <button className="mt-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                                                                    onClick={() => handleTakeAttendance(scheduleForDay.id)}>
                                                                    Take Attendance
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
        </div>
    );
}