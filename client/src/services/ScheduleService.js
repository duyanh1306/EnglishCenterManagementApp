import data from "../example/data.json";
import ClassService from "./ClassService";
import RoomService from "./RoomService";

export default class ScheduleService {
    static getSlots() {
        return data.slots;
    }

    static getCourses() {
        return data.courses.map((item) => {
            return {
                id: item.id,
                name: item.name,
                price: item.price,
                status: item.status,
                level: item.level
            };
        });
    }

    static getSchedule() {
        return data.schedule.map((item) => {
            const classData = ClassService.getClasses().find(c => c.id === item.classId);
            const roomData = RoomService.getRooms().find(r => r.id === item.roomId);
            const courseData = classData ? this.getCourses().find(c => c.id === classData.courseId) : null;
            return {
                id: item.id,
                slotId: item.slotId,
                class: classData ? {
                    id: classData.id,
                    name: classData.name,
                    teacher: classData.teacher ? classData.teacher.name : "Unknown Teacher"
                } : "Unknown Class",
                room: roomData ? {
                    id: roomData.id,
                    name: roomData.name,
                    location: roomData.location
                } : "Unknown Room",
                date: item.date || "Unknown Date",
                meeting: item.meeting || null,
                course: courseData ? courseData.name : "Unknown Course"
            };
        });
    }
}