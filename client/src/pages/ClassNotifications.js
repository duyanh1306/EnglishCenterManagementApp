import TeacherLayout from '../layouts/TeacherLayout';
import { useState } from 'react';
import { Bell, User, Clock, AlertCircle, CalendarDays, Megaphone, Search } from 'lucide-react';

const classes = [
    { id: 1, name: 'A', room: 'A101' },
    { id: 2, name: 'B', room: 'B202' }
];

const notifications = [
    {
        id: 1,
        type: 'reminder',
        icon: <Clock className="text-blue-500 w-6 h-6" />,
        title: 'Upcoming Class Reminder',
        priority: 'high',
        unread: true,
        message: 'Business English Fundamentals class starts in 30 minutes (Room A101)',
        time: '15 minutes ago',
        classId: 1,
    },
    {
        id: 2,
        type: 'enrollment',
        icon: <User className="text-green-600 w-6 h-6" />,
        title: 'New Student Enrollment',
        priority: 'medium',
        unread: true,
        message: 'John Smith has enrolled in your Business English Fundamentals class',
        time: '2 hours ago',
        classId: 2,
    },
    {
        id: 3,
        type: 'materials',
        icon: <Bell className="text-purple-500 w-6 h-6" />,
        title: 'Course Materials Updated',
        priority: 'low',
        unread: false,
        message: 'New teaching materials have been added to the Business English course library',
        time: '1 day ago',
        classId: 1,
    },
    {
        id: 4,
        type: 'reminder',
        icon: <CalendarDays className="text-orange-500 w-6 h-6" />,
        title: 'Class Schedule Change',
        priority: 'high',
        unread: true,
        message: 'Your Wednesday Business English class has been moved to Room B202',
        time: '3 hours ago',
        classId: 2,
    },
    {
        id: 5,
        type: 'reminder',
        icon: <Clock className="text-blue-500 w-6 h-6" />,
        title: 'Class Preparation Reminder',
        priority: 'medium',
        unread: false,
        message: "Don't forget to prepare materials for tomorrow's Business English class",
        time: '18 hours ago',
        classId: 2,
    }
];

const priorityStyles = {
    high: "bg-red-200 text-red-700",
    medium: "bg-yellow-200 text-yellow-800",
    low: "bg-gray-200 text-gray-700",
};

export default function ClassNotifications() {
    const [filter, setFilter] = useState('all');
    const [notifs, setNotifs] = useState(notifications);
    const [search, setSearch] = useState('');

    const filtered = (
        filter === 'all'
            ? notifs
            : filter === 'unread'
                ? notifs.filter(n => n.unread)
                : notifs.filter(n => n.type === filter)
    ).filter(n => {
        const className = classes.find(cls => cls.id === n.classId)?.name || '';
        return className.toLowerCase().includes(search.toLowerCase());
    });

    const markAllRead = () => setNotifs(notifs.map(n => ({ ...n, unread: false })));
    const markRead = id => setNotifs(notifs.map(n => n.id === id ? { ...n, unread: false } : n));
    const removeNotif = id => setNotifs(notifs.filter(n => n.id !== id));

    return (
        <TeacherLayout>
            <div className="w-full p-8 bg-gray-50 min-h-screen">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Class Notifications</h2>
                        <p className="text-gray-500">Stay updated on your classes and students</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            className="flex items-center gap-2 border rounded px-4 py-2 bg-white text-gray-800 font-medium shadow-sm hover:bg-gray-100"
                            onClick={markAllRead}
                        >
                            <AlertCircle className="w-5 h-5" /> Mark All Read
                        </button>
                        <span className="text-xs text-gray-600 bg-gray-100 px-3 py-1 rounded">{notifs.filter(n => n.unread).length} Unread</span>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-4">
                    <div className="bg-white rounded-xl border p-6 flex items-center gap-4">
                        <span className="bg-blue-100 text-blue-600 p-3 rounded-lg">
                            <Megaphone className="w-7 h-7" />
                        </span>
                        <div>
                            <div className="text-2xl font-bold">Send Notification</div>
                        </div>
                    </div>

                </div>

                <div className="flex gap-2 mb-6">
                    <button
                        className={`px-4 py-2 rounded ${filter === 'all' ? 'bg-white shadow font-semibold' : 'bg-gray-100 text-gray-700'}`}
                        onClick={() => setFilter('all')}
                    >All</button>
                    <button
                        className={`px-4 py-2 rounded ${filter === 'unread' ? 'bg-white shadow font-semibold' : 'bg-gray-100 text-gray-700'}`}
                        onClick={() => setFilter('unread')}
                    >Unread</button>
                    <button
                        className={`px-4 py-2 rounded ${filter === 'reminder' ? 'bg-white shadow font-semibold' : 'bg-gray-100 text-gray-700'}`}
                        onClick={() => setFilter('reminder')}
                    >Class Reminders</button>
                    <button
                        className={`px-4 py-2 rounded ${filter === 'enrollment' ? 'bg-white shadow font-semibold' : 'bg-gray-100 text-gray-700'}`}
                        onClick={() => setFilter('enrollment')}
                    >Enrollments</button>
                    <div className="flex-1 flex justify-end">
                        <div className="relative w-full md:w-64">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                <Search className="w-5 h-5" />
                            </span>
                            <input
                                type="text"
                                placeholder="Search by class name..."
                                className="border border-gray-300 rounded pl-10 pr-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-200"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    {filtered.map(n => (
                        <div
                            key={n.id}
                            className={`relative flex gap-4 items-start bg-blue-50 border border-blue-200 rounded-xl p-4 ${n.unread ? 'shadow' : ''}`}
                        >
                            <div className="pt-1">{n.icon}</div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 font-semibold text-gray-900">
                                    {n.title}
                                    <span className={`text-xs px-2 py-0.5 rounded ${priorityStyles[n.priority]}`}>{n.priority}</span>
                                    {n.unread && <span className="w-2 h-2 bg-blue-500 rounded-full inline-block ml-1"></span>}
                                </div>
                                <div className="text-gray-700">{n.message}</div>
                                <div className="flex gap-4 mt-2 text-xs text-gray-500">
                                    <span>{n.time}</span>
                                    <span>
                                        Class: {
                                            (classes.find(cls => cls.id === n.classId)?.name) || `Unknown Class`
                                        }
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                {n.unread && (
                                    <button
                                        className="text-blue-600 font-medium hover:underline"
                                        onClick={() => markRead(n.id)}
                                    >
                                        Mark as read
                                    </button>
                                )}
                                <button
                                    className="text-gray-400 hover:text-red-500 text-xl"
                                    onClick={() => removeNotif(n.id)}
                                    title="Remove"
                                >
                                    ×
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </TeacherLayout>
    );
}