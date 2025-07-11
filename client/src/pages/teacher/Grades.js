
import { useNavigate } from 'react-router-dom';

export default function Grades({ grades }) {
    const navigate = useNavigate();

    const handleEdit = (classId, studentId) => {
        navigate(`/teacher/grades/class/${classId}/student/${studentId}`);
    };

    return (
        <div>
            <table className="w-full border">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border px-3 py-2 text-left">Name</th>
                        <th className="border px-3 py-2 text-left">Reading</th>
                        <th className="border px-3 py-2 text-left">Writing</th>
                        <th className="border px-3 py-2 text-left">Speaking</th>
                        <th className="border px-3 py-2 text-left">Listening</th>
                        <th className="border px-3 py-2 text-left">Average</th>
                        <th className="border px-3 py-2 text-left">Total</th>
                        <th className="border px-3 py-2 text-left">Comment</th>
                        <th className="border px-3 py-2 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {grades?.map((student, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                            <td className="border px-3 py-2">{student?.name}</td>
                            <td className="border px-3 py-2">{student?.score?.reading}</td>
                            <td className="border px-3 py-2">{student?.score?.writing}</td>
                            <td className="border px-3 py-2">{student?.score?.speaking}</td>
                            <td className="border px-3 py-2">{student?.score?.listening}</td>
                            <td className="border px-3 py-2">
                                {(
                                    (student?.score?.reading +
                                        student?.score?.writing +
                                        student?.score?.speaking +
                                        student?.score?.listening) /
                                    4
                                ).toFixed(2)}
                            </td>
                            <td className="border px-3 py-2">
                                {(
                                    student?.score?.reading +
                                    student?.score?.writing +
                                    student?.score?.speaking +
                                    student?.score?.listening
                                ).toFixed(2)}
                            </td>
                            <td className="border px-3 py-2">{student?.comment}</td>
                            <td className="border px-3 py-2">
                                <button className="text-blue-500 hover:underline"
                                onClick={() => handleEdit(student?.classId, student?.id)}
                                >Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}