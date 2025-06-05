import data from "../example/data.json";

export default class FeedbackService {
    static getFeedback() {
        const classes = data.classes;
        const courses = data.courses;
        const users = data.users;

        return data.feedbacks.map(f => ({
            "date": f.date,
            "content": f.content,
            "user": users.find(user => user.id === f.userId )?.fullName || "Unknown User",
            "class": classes.find(cls => cls.id === f.classId)?.name || "Unknown Class",
            "course": courses.find(course => course.id === f.courseId)?.name || "Unknown Course",
            "rating": f.rating,
        }));
    }

    // Other feedback-related methods...
}
