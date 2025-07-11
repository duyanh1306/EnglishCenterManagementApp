import { useEffect, useState } from 'react';

export default function Attendance() {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchStudents = [
            {
                "studentId": "u4",
                "name": "John Doe",
                "email": "john.doe@example.com",
                "phone": "123-456-7890",
                "birthdate": "2000-01-01",
                "attendance": "present"
            },
            {
                "studentId": "u5",
                "name": "Jane Smith",
                "email": "jane.smith@example.com",
                "phone": "987-654-3210",
                "birthdate": "2001-02-02",
                "attendance": "absent"
            },
            {
                "studentId": "u6",
                "name": "Alice Johnson",
                "email": "alice.johnson@example.com",
                "phone": "555-123-4567",
                "birthdate": "2002-03-03",
                "attendance": "present"
            },
            {
                "studentId": "u7",
                "name": "David Wilson",
                "email": "david.wilson@example.com",
                "phone": "444-555-6666",
                "birthdate": "2003-04-04",
                "attendance": "present"
            },
            {
                "studentId": "u8",
                "name": "Emily Davis",
                "email": "emily.davis@example.com",
                "phone": "333-444-5555",
                "birthdate": "2004-05-05",
                "attendance": "present"
            },
            {
                "studentId": "u9",
                "name": "Chris Evans",
                "email": "chris.evans@example.com",
                "phone": "222-333-4444",
                "birthdate": "2005-06-06",
                "attendance": "absent"
            },
            {
                "studentId": "u10",
                "name": "Daniel Lee",
                "email": "daniel.lee@example.com",
                "phone": "111-222-3333",
                "birthdate": "2006-07-07",
                "attendance": "present"
            }
        ]
        setStudents(fetchStudents);
    }, []);

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Attendance List</h1>
            <table className="w-full border">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border px-3 py-2 text-left">No</th>
                        <th className="border px-3 py-2 text-left">Name</th>
                        <th className="border px-3 py-2 text-left">Email</th>
                        <th className="border px-3 py-2 text-left">Phone</th>
                        <th className="border px-3 py-2 text-left">Birthdate</th>
                        <th className="border px-3 py-2 text-left">Attendance</th>
                    </tr>
                </thead>
                <tbody>
                    {students?.map((student, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                            <td className="border px-3 py-2 text-center">{index + 1}</td>
                            <td className="border px-3 py-2">{student?.name}</td>
                            <td className="border px-3 py-2">{student?.email}</td>
                            <td className="border px-3 py-2">{student?.phone}</td>
                            <td className="border px-3 py-2">{student?.birthdate}</td>
                            <td className="border px-3 py-2">
                                <input type="checkbox" className="form-checkbox" checked={student?.attendance === "present"} readOnly />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
