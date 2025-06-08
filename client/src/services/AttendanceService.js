import data from "../example/data.json";

export default class DataService {

    static getStudentsOfClass(classId) {
        const studentClass = data.studentClasses;

        // Get all student IDs for the given classId
        const studentIds = studentClass.filter(sc => sc.classId === classId).map(sc => sc.studentId);

        // Filter users based on the retrieved student IDs
        return data.users.filter(student => studentIds.includes(student.id))
            .map(student => ({
                id: student.id,
                fullName: student.fullName,
                email: student.email
            }));
    }

    static getAttendanceOfClass(classId) {
        return data.attendance.filter(att => att.classId === classId)
            .map(att => {
                return {
                    ...this.getStudentsOfClass(classId).find(student => student.id === att.studentId),
                    attendance: att.attendance,
                    note: att.note
                }
            });
    }

}