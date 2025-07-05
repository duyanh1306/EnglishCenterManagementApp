import React from "react";

const scheduleData = [
  {
    day: "Monday",
    time: "08:00 - 09:30",
    subject: "Math",
    room: "101",
    date: "2025-06-10",
    mode: "Onsite",
  },
  {
    day: "Wednesday",
    time: "13:00 - 14:30",
    subject: "Physics",
    room: "Lab A",
    date: "2025-06-12",
    mode: "Online",
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

const timeSlots = [
  "08:00 - 09:30",
  "09:40 - 11:10",
  "13:00 - 14:30",
  "15:00 - 17:30",
];

const StudentSchedule = () => {
  return (
    <div className="flex flex-col w-full p-6">
      <div className="mb-4">
        <h2 className="text-2xl font-bold">Weekly Schedule</h2>
        {/* <p className="text-gray-500">Week of 9/6/2025 - 15/6/2025</p> */}
      </div>

      <div className="bg-white rounded-xl shadow p-6 overflow-x-auto w-full max-w-[1200px]">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-xl">
              👤
            </div>
            <div>
              <p className="font-semibold">Welcome back, John Doe</p>
              <p className="text-sm text-gray-500">Student</p>
            </div>
          </div>
        </div>

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
            {timeSlots.map((time) => (
              <tr key={time}>
                <td className="border p-2 font-semibold w-32">{time}</td>

                {daysOfWeek.map((day) => {
                  const item = scheduleData.find(
                    (s) => s.day === day && s.time === time
                  );

                  return (
                    <td
                      key={day}
                      className="border p-2 text-sm align-top min-w-[140px] text-left"
                    >
                      {item ? (
                        <div className="space-y-1">
                          <div>
                            <span className="font-bold">Subject:</span>{" "}
                            {item.subject}
                          </div>
                          <div>
                            <span className="font-bold">Room:</span> {item.room}
                          </div>
                          <div>
                            <span className="font-bold">Date:</span> {item.date}
                          </div>
                          <div>
                            <span
                              className={`text-xs font-medium px-2 py-1 rounded-full ${
                                item.mode === "Online"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-blue-100 text-blue-700"
                              }`}
                            >
                              {item.mode}
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
  );
};

export default StudentSchedule;
