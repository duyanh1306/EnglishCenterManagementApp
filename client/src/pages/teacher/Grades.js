export default function Grades({ grades }) {
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
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}