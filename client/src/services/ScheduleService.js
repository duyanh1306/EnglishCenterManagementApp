import data from "../example/data.json";

export default class ScheduleService {
    static getSlots() {
        return data.slots;
    }

    static getClasses() {
        return data.classes;
    }

    static getClassNameById(classId) {
        const cls = data.classes.find(cls => cls.id === classId);
        return cls ? cls.name : null;
    }
}
