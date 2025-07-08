import { useState, useEffect } from "react";

export default function StudentSchedule() {
  const [year, setYear] = useState(2025);
  const [weeks, setWeeks] = useState([]);
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [schedule, setSchedule] = useState([]);

  const daysOfWeek = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
  const slotLabels = [
    "Slot 0",
    "Slot 1",
    "Slot 2",
    "Slot 3",
    "Slot 4",
    "Slot 5",
  ];

  const generateWeeksOfYear = (targetYear) => {
    const startDate = new Date(`${targetYear}-01-01`);
    const weeks = [];

    while (startDate.getDay() !== 1) {
      startDate.setDate(startDate.getDate() + 1);
    }

    for (let i = 0; i < 53; i++) {
      const weekStart = new Date(startDate);
      weekStart.setDate(startDate.getDate() + i * 7);

      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);

      if (weekStart.getFullYear() > targetYear) break;

      const label = `${weekStart.toLocaleDateString(
        "en-GB"
      )} To ${weekEnd.toLocaleDateString("en-GB")}`;
      weeks.push({
        label,
        start: new Date(weekStart),
        end: new Date(weekEnd),
      });
    }
    return weeks;
  };

  const formatDate = (dateObj) => {
    if (!(dateObj instanceof Date) || isNaN(dateObj)) return "";
    return dateObj.toISOString().split("T")[0];
  };

  const getDateByOffset = (startDate, offset) => {
    if (!startDate) return null;
    const date = new Date(startDate);
    date.setDate(date.getDate() + offset);
    return date;
  };

  const getScheduleItem = (slotId, dateStr) => {
    return schedule.find(
      (item) => item.slotId === slotId && item.date === dateStr
    );
  };

  useEffect(() => {
    const newWeeks = generateWeeksOfYear(year);
    setWeeks(newWeeks);
    setSelectedWeek(newWeeks[0]);
  }, [year]);

  useEffect(() => {
    const fetchedSchedule = [
      {
        id: "1",
        slotId: "1",
        className: "A",
        course: "TOEIC",
        room: "R101",
        date: "2025-07-08", // Tuesday
      },
      {
        id: "2",
        slotId: "2",
        className: "A",
        course: "TOEIC",
        room: "R102",
        date: "2025-07-10", // Thursday
      },
      {
        id: "3",
        slotId: "3",
        className: "A",
        course: "TOEIC",
        room: "R103",
        date: "2025-07-09", // Wednesday
      },
    ];
    setSchedule(fetchedSchedule);
  }, []);

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="flex items-center gap-4 mb-4">
        <label className="text-sm font-semibold">YEAR</label>
        <select
          value={year}
          onChange={(e) => setYear(+e.target.value)}
          className="border px-3 py-2 rounded text-sm"
        >
          <option value={2024}>2024</option>
          <option value={2025}>2025</option>
          <option value={2026}>2026</option>
        </select>

        <label className="text-sm font-semibold">WEEK</label>
        <select
          value={selectedWeek?.label || ""}
          onChange={(e) => {
            const week = weeks.find((w) => w.label === e.target.value);
            setSelectedWeek(week);
          }}
          className="border px-3 py-2 rounded text-sm max-w-[250px]"
        >
          {weeks.map((week) => (
            <option key={week.label} value={week.label}>
              {week.label}
            </option>
          ))}
        </select>
      </div>

      {selectedWeek ? (
        <table className="w-full border-collapse border border-gray-300 text-sm">
          <thead>
            <tr className="bg-blue-200 text-center">
              <th className="border border-gray-300 p-2 font-bold">WEEK</th>
              {daysOfWeek.map((day, idx) => {
                const date = getDateByOffset(selectedWeek.start, idx);
                return (
                  <th key={day} className="border border-gray-300 p-2">
                    {day}
                    <br />
                    {date.toLocaleDateString("en-GB")}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {slotLabels.map((slotLabel, rowIdx) => (
              <tr key={slotLabel} className="text-center">
                <td className="border border-gray-300 p-2 font-semibold">
                  {slotLabel}
                </td>
                {daysOfWeek.map((_, colIdx) => {
                  const date = getDateByOffset(selectedWeek.start, colIdx);
                  const dateStr = formatDate(date);
                  const item = getScheduleItem(`${rowIdx}`, dateStr);

                  return (
                    <td
                      key={colIdx}
                      className="border border-gray-300 p-2 text-left min-w-[150px] align-top"
                    >
                      {item ? (
                        <div className="space-y-1">
                          <div>
                            <span className="font-bold">Class:</span>{" "}
                            {item.className}
                          </div>
                          <div>
                            <span className="font-bold">Course:</span>{" "}
                            {item.course}
                          </div>
                          <div>
                            <span className="font-bold">Room:</span> {item.room}
                          </div>
                        </div>
                      ) : (
                        <span className="text-gray-400 text-xs">–</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500">Loading schedule...</p>
      )}
    </div>
  );
}
