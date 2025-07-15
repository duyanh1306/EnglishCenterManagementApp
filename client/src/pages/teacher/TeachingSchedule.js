import { useState, useEffect } from "react";
import axios from "axios";
import {getDecodedToken} from "../../middlewares/auth"

export default function TeachingSchedule() {
    const [schedule, setSchedule] = useState([]);
    const [slots, setSlots] = useState([]);
    const [weekdays, setWeekdays] = useState([]);

    // Function to get current week dates (Monday to Sunday)
    const getCurrentWeekDates = () => {
        const today = new Date();
        const currentDayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

        // Calculate the difference to get Monday (start of week)
        // For Saturday (6), we want to go back 5 days to get Monday
        // For Sunday (0), we want to go back 6 days to get Monday
        const daysToMonday = currentDayOfWeek === 0 ? -6 : -(currentDayOfWeek - 1);
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

    // Function to format week range for display in real time
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
        const fetchSchedule = async () => {
            try {
                const decoded = getDecodedToken();
                const teacherId = decoded?.id || "";
                const response = await axios.get(`http://localhost:9999/api/teacher/${teacherId}/schedules`);

                if (response.data && response.data.success && Array.isArray(response.data.data)) {
                    setSchedule(response.data.data);
                } else {
                    console.error("Unexpected schedule response structure:", response.data);
                    setSchedule([]);
                }
            } catch (error) {
                console.error("Error fetching schedule:", error);
                setSchedule([]);
            }
        };

        const fetchSlots = async () => {
            try {
                const response = await axios.get('http://localhost:9999/api/teacher/slots');

                if (response.data && response.data.success && Array.isArray(response.data.data)) {
                    setSlots(response.data.data);
                } else {
                    console.error("Unexpected slots response structure:", response.data);
                    setSlots([]);
                }
            } catch (error) {
                console.error("Error fetching slots:", error);
                setSlots([]);
            }
        };

        // Call the async functions
        fetchSchedule();
        fetchSlots();
    }, []);

    // Group schedule items by slot ID
    const groupedSchedule = {};
    if (Array.isArray(schedule)) {
        schedule.forEach(item => {
            const slotId = item.slot.id;
            if (!groupedSchedule[slotId]) {
                groupedSchedule[slotId] = [];
            }
            groupedSchedule[slotId].push(item);
        });
    }

    return (
        <div>
            <div className="w-full p-8 bg-gray-50 min-h-screen">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Teaching Schedule</h2>
                        <p className="text-gray-500">{getWeekRange(weekdays)}</p>
                    </div>
                </div>
                <div className="rounded-lg shadow-lg">
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
                            {slots.map((slot, index) => {
                                const slotId = slot._id;
                                const itemsForSlot = groupedSchedule[slotId] || [];
                                return (
                                    <tr key={slotId} className="border-b last:border-none">
                                        <td className="py-4 px-4 font-semibold text-gray-500 border border-gray-200">
                                            <div className="text-lg text-gray-800 text-center">Slot {index + 1}</div>
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
                                                                <span className="pr-2 font-semibold text-green-500">Class:</span>
                                                                <span className="text-blue-800 cursor-pointer">
                                                                    {scheduleForDay.class.name}
                                                                </span>
                                                            </div>
                                                            <div>
                                                                <span className="pr-2 font-semibold text-orange-500">Course:</span>
                                                                <span className="text-blue-800 cursor-pointer">
                                                                    {scheduleForDay.class.course}
                                                                </span>
                                                            </div>
                                                            <div>
                                                                <span className="pr-2 font-semibold text-blue-500">Room:</span>
                                                                <span className="text-blue-800 cursor-pointer">
                                                                    {scheduleForDay.room.name }
                                                                </span>
                                                            </div>
                                                            <div>
                                                                <span className="text-md text-gray-500 font-semibold">
                                                                    {scheduleForDay.room.location}
                                                                </span>
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