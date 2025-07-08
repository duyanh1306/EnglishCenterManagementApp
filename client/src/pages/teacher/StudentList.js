export default function StudentList({ students }) {
    return (
        <div>
            <table className="w-full border">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border px-3 py-2 text-left">Name</th>
                        <th className="border px-3 py-2 text-left">Email</th>
                        <th className="border px-3 py-2 text-left">Phone</th>
                        <th className="border px-3 py-2 text-left">Birthdate</th>
                    </tr>
                </thead>
                <tbody>
                    {students?.map((student, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                            <td className="border px-3 py-2">{student?.name}</td>
                            <td className="border px-3 py-2">{student?.email}</td>
                            <td className="border px-3 py-2">{student?.phone}</td>
                            <td className="border px-3 py-2">{student?.birthdate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}