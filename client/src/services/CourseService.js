import data from "../example/data.json";

export default class CourseService {
    static getCourses() {
        return data.courses.map(course => ({
            "id": course.id,
            "name": course.name,
            "price": course.price,
            "status": course.status,
            "level": data.courseLevels.find(level => level.id === course.levelId)?.name || "Unknown Level"
        }));
    }

    static getLevels() {
        return data.courseLevels.map(level => ({
            "id": level.id,
            "name": level.name
        }));
    }

}