import React from "react";

const scheduleData = [
  {
    day: "Monday",
    slot: "08:00 - 09:30",
    class: "Math",
    room: "101",
    date: "2025-06-10",
    status: "Onsite",
  },
  {
    day: "Wednesday",
    slot: "13:00 - 14:30",
    class: "Physics",
    room: "Lab A",
    date: "2025-06-12",
    status: "Online",
    link: "https://zoom.us/j/123456789",
  },
];

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const slots = [
  "08:00 - 09:30",
  "09:40 - 11:10",
  "13:00 - 14:30",
  "15:00 - 17:30",
];

const StudentSchedule = () => {
  return (
    <div className="flex justify-end w-full p-6 pr-16">
      <div className="bg-white rounded-xl shadow p-6 overflow-x-auto w-[98%] max-w-[1200px]">
        <h2 className="text-xl font-bold mb-4 text-center">Weekly Schedule</h2>
        <div className="overflow-x-auto">
          <table className="table w-full border border-gray-200 min-w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2 text-left w-32">Time</th>
                {daysOfWeek.map((day) => (
                  <th key={day} className="border p-2 text-center">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {slots.map((slot) => (
                <tr key={slot}>
                  <td className="border p-2 font-semibold w-32">{slot}</td>
                  {daysOfWeek.map((day) => {
                    const item = scheduleData.find(
                      (s) => s.day === day && s.slot === slot
                    );
                    return (
                      <td
                        key={day}
                        className="border p-2 text-sm align-top min-w-[120px] text-left"
                      >
                        {item ? (
                          <div className="space-y-1">
                            <div>
                              <span className="font-bold">Class:</span>{" "}
                              {item.class}
                            </div>
                            <div>
                              <span className="font-bold">Room:</span>{" "}
                              {item.room}
                            </div>
                            <div>
                              <span className="font-bold">Date:</span>{" "}
                              {item.date}
                            </div>
                            <div>
                              <span
                                className={`text-xs font-medium px-2 py-1 rounded-full ${
                                  item.status === "Online"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-blue-100 text-blue-700"
                                }`}
                              >
                                {item.status}
                              </span>
                            </div>
                            {item.link && (
                              <a
                                href={item.link}
                                className="text-blue-600 underline text-xs"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Join Meeting
                              </a>
                            )}
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
        </div>
      </div>
    </div>
  );
};

export default StudentSchedule;
