import data from "../example/data.json";
import UserService from "./UserService";

export default class ClassService {

    static getClasses() {
        return data.classes;
    }

    static getClassById(classId) {
        return data.classes.find(c => c.id === classId) || null;
    }

    static getStudentsInClass(classId) {
        const classData = this.getClassById(classId);

        // Ensure classData exists
        if (!classData || !classData.students) {
            console.warn(`No students found for classId: ${classId}`);
            return [];
        }
        // Fetch students using UserService
        const allStudents = UserService.getStudents();

        return classData.students.map(studentEntry => {
            const student = allStudents.find(user => user.id === studentEntry.studentId);
            return {
                ...student,
                note: this.getAttendanceForClass(classId).find(att => att.studentId === student?.id)?.note || "",
            };
        });
    }

    static getAttendanceForClass(classId) {
        // Find the schedule associated with the classId
        const schedule = data.schedule.find(s => s.classId === classId);

        // If no schedule is found, return an empty array
        if (!schedule) {
            console.warn(`No schedule found for classId: ${classId}`);
            return [];
        }

        // Find the attendance associated with the scheduleId
        const classAttendance = data.attendance.find(att => att.scheduleId === schedule.id);

        // If no attendance is found, return an empty array
        if (!classAttendance) {
            console.warn(`No attendance found for scheduleId: ${schedule.id}`);
            return [];
        }

        // Map attendance data to include student details
        return classAttendance.attendance.map(att => {
            const student = data.users.find(user => user.id === att.studentId);
            return {
                studentId: student?.id || "Unknown ID",
                fullName: student?.fullName || "Unknown Name",
                email: student?.email || "Unknown Email",
                note: att.note || "",
                attendance: att.attendance || false,
            };
        });
    }

}