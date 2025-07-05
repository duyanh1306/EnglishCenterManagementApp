import data from "../example/data.json";

export default class CourseService {
    static getCourses() {
        return data.courses.map(course => ({
            "id": course.id,
            "name": course.name,
            "price": course.price,
            "status": course.status,
            "level": course.level
        }));
    }   

    static getCourseById(id) {
        return data.courses.find(course => course.id === id);
    }

}