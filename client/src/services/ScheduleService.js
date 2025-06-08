import data from "../example/data.json";

export default class ScheduleService {
    static getSlots() {
        return data.slots;
    }

    static getClasses() {
        return data.classes.map((item) => {
            return {
                "id": item.id,
                "name": item.name                
            };
        });
    }

    static getRooms() {
        return data.rooms.map((item) => {
            return {
                "id": item.id,
                "name": item.name,
                "location": item.location
            };
        });
    }

    static getCourse() {
        return data.courses.map((item) => {
            return {
                "id": item.id,
                "name": item.name,
                "code": item.code,
                "credits": item.credits
            };
        });
    }

    static getCourseClasses() {
        return data.courseClasses;
    }

    static getSchedule() {
        return data.schedule.map((item) => {
            return {
                "slotId": item.slotId,
                "class": this.getClasses().find(c => c.id === item.classId),
                "room": this.getRooms().find(r => r.id === item.roomId),
                "date": item.date,
                "meeting": item.meeting,
                "course": this.getCourse().find(c => c.id === this.getCourseClasses().find(cc => cc.classId === item.classId)?.courseId),
            };
        });
    }
}
