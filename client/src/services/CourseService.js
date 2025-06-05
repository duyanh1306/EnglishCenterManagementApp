import data from "../example/data.json";

export default class CourseService {
    static getCourses() {
        return data.courses.map(course => ({
            "id": course.id,
            "name": course.name,
            "numberOfSlots": course.numberOfSlots,
            "price": course.price,
            "maxStudents": course.maxStudents,
            "status": course.status
        }));
    }
    
}