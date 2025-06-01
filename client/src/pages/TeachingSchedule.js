import TeacherLayout from '../layouts/TeacherLayout';
import { User, ChevronDown, Plus } from 'lucide-react';
import { useNavigate } from "react-router-dom";


export default function TeachingSchedule() {
    const navigate = useNavigate();
    const handleAttendanceClick = (classId) => {
        navigate(`/student-attendance-list?classId=${classId}`);
    };

    return (
        <TeacherLayout>
            {/* Schedule content goes here */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Teaching Schedule</h2>
                    <p className="text-gray-500">Week of 26/5/2025 - 1/6/2025</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="w-36 h-12 border rounded-md px-2 py-2 bg-white text-gray-800 font-medium shadow-sm hover:bg-gray-100 flex items-center justify-center">
                        Week View <ChevronDown className="ml-2 w-6 h-6" />
                    </button>
                    <button className="w-36 h-12 flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md font-semibold shadow hover:bg-blue-600">
                        <Plus className="w-5 h-5" /> Add Class
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
            <div className="">
                <table className="min-w-full bg-white shadow-md rounded-lg border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-4 text-left w-24 border border-gray-200">Time</th>
                            <th className="py-3 px-4 text-center border border-gray-200">Monday<br /><span className="font-normal text-xs text-gray-500">May 26</span></th>
                            <th className="py-3 px-4 text-center border border-gray-200">Tuesday<br /><span className="font-normal text-xs text-gray-500">May 27</span></th>
                            <th className="py-3 px-4 text-center border border-gray-200">Wednesday<br /><span className="font-normal text-xs text-gray-500">May 28</span></th>
                            <th className="py-3 px-4 text-center border border-gray-200">Thursday<br /><span className="font-normal text-xs text-gray-500">May 29</span></th>
                            <th className="py-3 px-4 text-center border border-gray-200">Friday<br /><span className="font-normal text-xs text-gray-500">May 30</span></th>
                            <th className="py-3 px-4 text-center border border-gray-200">Saturday<br /><span className="font-normal text-xs text-gray-500">May 31</span></th>
                            <th className="py-3 px-4 text-center border border-gray-200">Sunday<br /><span className="font-normal text-xs text-gray-500">Jun 1</span></th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700 text-sm">
                        {/* Slot 1 */}
                        <tr>
                            <td className="py-4 px-4 font-semibold text-gray-500 border border-gray-200">Slot 1</td>
                            <td className="py-2 px-2 border border-gray-200">
                                <div>
                                    <span className="pr-2"> Class: </span>
                                    <span className="text-blue-700 underline cursor-pointer">ABC123</span>
                                </div>
                                <div>
                                    <span className="text-sm font-semibold py-0.5 rounded mt-1 inline-block">7:30 - 9:00 at R-309</span>
                                </div>
                                <div>
                                    <span
                                        className="bg-green-600 text-white text-xs font-semibold px-2 py-0.5 rounded align-middle"
                                    >
                                        Online
                                    </span>
                                    <span className="text-sm text-blue-800 underline py-0.5 rounded ml-1 inline-block">
                                        <button
                                            type="button"
                                            className="p-0 m-0 bg-transparent border-none text-blue-800 underline cursor-pointer"
                                            onClick={() => alert('Joining meeting...')}
                                        >
                                            Click to join meeting
                                        </button>
                                    </span>
                                </div>
                                <div>
                                    <button
                                        className="bg-blue-600 text-white text-xs font-semibold px-2 py-0.5 rounded align-middle hover:bg-blue-700 transition"
                                        type="button"
                                        onClick={() => handleAttendanceClick('1')}
                                    >
                                        Take attendance
                                    </button>
                                </div>
                            </td>
                            <td className="py-2 px-2 border border-gray-200"></td>
                            <td className="py-2 px-2 border border-gray-200"></td>
                            <td className="py-2 px-2 border border-gray-200"></td>
                            <td className="py-2 px-2 border border-gray-200"></td>
                            <td className="py-2 px-2 border border-gray-200"></td>
                        </tr>
                        {/* Slot 2 */}
                        <tr>
                            <td className="py-4 px-4 font-semibold text-gray-500 border border-gray-200">Slot 2</td>
                            <td className="py-2 px-2 border border-gray-200">
                                <div>
                                    <span className="pr-2"> Class: </span>
                                    <span className="text-blue-700 underline cursor-pointer">ABC123</span>
                                </div>
                                <div>
                                    <span className="text-sm font-semibold py-0.5 rounded mt-1 inline-block">9:10 - 10:40 at R-309</span>
                                </div>
                                <div>
                                    <span
                                        className="bg-green-600 text-white text-xs font-semibold px-2 py-0.5 rounded align-middle"
                                    >
                                        Online
                                    </span>
                                    <span className="text-sm text-blue-800 underline py-0.5 rounded ml-1 inline-block">
                                        <span className="text-sm text-blue-800 underline py-0.5 rounded ml-1 inline-block">
                                            <button
                                                type="button"
                                                className="p-0 m-0 bg-transparent border-none text-blue-800 underline cursor-pointer"
                                                onClick={() => alert('Joining meeting...')}
                                            >
                                                Click to join meeting
                                            </button>
                                        </span>
                                    </span>
                                </div>
                                <div>
                                    <button
                                        className="bg-blue-600 text-white text-xs font-semibold px-2 py-0.5 rounded align-middle hover:bg-blue-700 transition"
                                        type="button"
                                        onClick={() => handleAttendanceClick('1')}
                                    >
                                        Take attendance
                                    </button>
                                </div>
                            </td>
                            <td className="py-2 px-2 border border-gray-200"></td>
                            <td className="py-2 px-2 border border-gray-200"></td>
                            <td className="py-2 px-2 border border-gray-200"></td>
                            <td className="py-2 px-2 border border-gray-200"></td>
                            <td className="py-2 px-2 border border-gray-200"></td>
                            <td className="py-2 px-2 border border-gray-200"></td>
                        </tr>
                        {/* Slot 3 */}
                        <tr>
                            <td className="py-4 px-4 font-semibold text-gray-500 border border-gray-200">Slot 3</td>
                            <td className="py-2 px-2 border border-gray-200">
                                <div>
                                    <span className="pr-2"> Class: </span>
                                    <span className="text-blue-700 underline cursor-pointer">ABC123</span>
                                </div>
                                <div>
                                    <span className="text-sm font-semibold py-0.5 rounded mt-1 inline-block">13:00 - 14:30 at R-309</span>
                                </div>

                                <div>
                                    <button
                                        className="bg-blue-600 text-white text-xs font-semibold px-2 py-0.5 rounded align-middle hover:bg-blue-700 transition"
                                        type="button"
                                    >
                                        Take attendance
                                    </button>
                                </div>
                            </td>
                            <td className="py-2 px-2 border border-gray-200"></td>
                            <td className="py-2 px-2 border border-gray-200"></td>
                            <td className="py-2 px-2 border border-gray-200"></td>
                            <td className="py-2 px-2 border border-gray-200"></td>
                            <td className="py-2 px-2 border border-gray-200"></td>
                            <td className="py-2 px-2 border border-gray-200"></td>
                        </tr>
                        {/* Slot 4 */}
                        <tr>
                            <td className="py-4 px-4 font-semibold text-gray-500 border border-gray-200">Slot 4</td>
                            <td className="py-2 px-2 border border-gray-200">
                                <div>
                                    <span className="pr-2"> Class: </span>
                                    <span className="text-blue-700 underline cursor-pointer">ABC123</span>
                                </div>
                                <div>
                                    <span className="text-sm font-semibold py-0.5 rounded mt-1 inline-block">14:40 - 16:10 at R-309</span>
                                </div>

                                <div>
                                    <button
                                        className="bg-blue-600 text-white text-xs font-semibold px-2 py-0.5 rounded align-middle hover:bg-blue-700 transition"
                                        type="button"
                                    >
                                        Take attendance
                                    </button>
                                </div>
                            </td>
                            <td className="py-2 px-2 border border-gray-200"></td>
                            <td className="py-2 px-2 border border-gray-200"></td>
                            <td className="py-2 px-2 border border-gray-200"></td>
                            <td className="py-2 px-2 border border-gray-200"></td>
                            <td className="py-2 px-2 border border-gray-200"></td>
                            <td className="py-2 px-2 border border-gray-200"></td>
                        </tr>
                        {/* Slot 5 */}
                        <tr>
                            <td className="py-4 px-4 font-semibold text-gray-500 border border-gray-200">Slot 5</td>
                            <td className="py-2 px-2 border border-gray-200">
                                <div>
                                    <span className="pr-2"> Class: </span>
                                    <span className="text-blue-700 underline cursor-pointer">ABC123</span>
                                </div>
                                <div>
                                    <span className="text-sm font-semibold py-0.5 rounded mt-1 inline-block">18:00 - 19:30 at R-309</span>
                                </div>

                                <div>
                                    <button
                                        className="bg-blue-600 text-white text-xs font-semibold px-2 py-0.5 rounded align-middle hover:bg-blue-700 transition"
                                        type="button"
                                    >
                                        Take attendance
                                    </button>
                                </div>
                            </td>
                            <td className="py-2 px-2 border border-gray-200"></td>
                            <td className="py-2 px-2 border border-gray-200"></td>
                            <td className="py-2 px-2 border border-gray-200"></td>
                            <td className="py-2 px-2 border border-gray-200"></td>
                            <td className="py-2 px-2 border border-gray-200"></td>
                            <td className="py-2 px-2 border border-gray-200"></td>
                        </tr>
                        {/* Slot 6 */}
                        <tr>
                            <td className="py-4 px-4 font-semibold text-gray-500 border border-gray-200">Slot 6</td>
                            <td className="py-2 px-2 border border-gray-200">
                                <div>
                                    <span className="pr-2"> Class: </span>
                                    <span className="text-blue-700 underline cursor-pointer">ABC123</span>
                                </div>
                                <div>
                                    <span className="text-sm font-semibold py-0.5 rounded mt-1 inline-block">19:40 - 21:10 at R-309</span>
                                </div>

                                <div>
                                    <button
                                        className="bg-blue-600 text-white text-xs font-semibold px-2 py-0.5 rounded align-middle hover:bg-blue-700 transition"
                                        type="button"
                                    >
                                        Take attendance
                                    </button>
                                </div>
                            </td>
                            <td className="py-2 px-2 border border-gray-200"></td>
                            <td className="py-2 px-2 border border-gray-200"></td>
                            <td className="py-2 px-2 border border-gray-200"></td>
                            <td className="py-2 px-2 border border-gray-200"></td>
                            <td className="py-2 px-2 border border-gray-200"></td>
                            <td className="py-2 px-2 border border-gray-200"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </TeacherLayout>
    );
}