import data from "../example/data.json";

export default class NotificationService {

    static getNotifications() {
        return data.notifications.map(notification => {
            const cls = data.classes.find(c => c.id === notification.classId);
            return {
                time: notification.time,
                title: notification.title,
                content: notification.content,
                level: notification.level,
                category: notification.category,
                read: notification.read,
                className: cls ? cls.name : "None"
            };
        });
    }

    static getNotificationById(notificationId) {
        return data.notifications.find(notification => notification.id === notificationId);
    }

    static markAsRead(notificationId) {
        const notification = this.getNotificationById(notificationId);
        if (notification) {
            notification.read = true;
        }
    }

    static deleteNotification(notificationId) {
        const index = data.notifications.findIndex(notification => notification.id === notificationId);
        if (index !== -1) {
            data.notifications.splice(index, 1);
        }
    }
}