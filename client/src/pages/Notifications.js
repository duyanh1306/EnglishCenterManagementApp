import TeacherLayout from '../layouts/TeacherLayout';
import { useState } from 'react';
import { Bell, AlertCircle, Search, Megaphone } from 'lucide-react';
import NotificationService from '../services/NotificationService';


const priorityStyles = {
    high: "bg-red-200 text-red-700",
    medium: "bg-yellow-200 text-yellow-800",
    low: "bg-gray-200 text-gray-700",
};

export default function ClassNotifications() {
    // Load notifications from the service
    const [notifs, setNotifs] = useState(NotificationService.getNotifications());
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');

    // Filter notifications based on filter state and search text (matching class name)
    const filtered = (
        filter === 'all'
            ? notifs
            : filter === 'unread'
                ? notifs.filter(n => !n.read)
                : notifs.filter(n => n.level === filter)
    ).filter(n => {
        const className = n.className || '';
        const title = n.title || '';
        return className.toLowerCase().includes(search.toLowerCase()) ||
            title.toLowerCase().includes(search.toLowerCase());
    });

    const markAllRead = () => {
        setNotifs(notifs.map(n => ({ ...n, read: true })));
    };
    const markRead = id => {
        setNotifs(notifs.map(n => n.id === id ? { ...n, read: true } : n));
    };
    const removeNotif = id => {
        setNotifs(notifs.filter(n => n.id !== id));
    };

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
                        <span className="text-xs text-gray-600 bg-gray-100 px-3 py-1 rounded">
                            {notifs.filter(n => !n.read).length} Unread
                        </span>
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
                        className={`px-4 py-2 rounded ${filter === 'high' ? 'bg-white shadow font-semibold' : 'bg-gray-100 text-gray-700'}`}
                        onClick={() => setFilter('high')}
                    >High Priority</button>
                    <button
                        className={`px-4 py-2 rounded ${filter === 'medium' ? 'bg-white shadow font-semibold' : 'bg-gray-100 text-gray-700'}`}
                        onClick={() => setFilter('medium')}
                    >Medium Priority</button>
                    <button
                        className={`px-4 py-2 rounded ${filter === 'low' ? 'bg-white shadow font-semibold' : 'bg-gray-100 text-gray-700'}`}
                        onClick={() => setFilter('low')}
                    >Low Priority</button>
                    <div className="flex-1 flex justify-end">
                        <div className="relative w-full md:w-64">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                <Search className="w-5 h-5" />
                            </span>
                            <input
                                type="text"
                                placeholder="Search by title or class name"
                                className="border border-gray-300 rounded pl-10 pr-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-200"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    {filtered.map((n, index) => {
                        // Extract repeated conditional classes into variables.
                        const containerClasses = `relative flex gap-4 items-start border border-blue-200 rounded-xl p-4 ${!n.read ? "bg-blue-50 shadow" : ""
                            }`;
                        const iconBg = !n.read ? "bg-blue-100" : "bg-gray-200";
                        const iconColor = !n.read ? "text-blue-600" : "text-gray-600";

                        return (
                            <div key={index} className={containerClasses}>
                                <div className={`rounded-lg flex items-center justify-center w-8 h-8 ${iconBg}`}>
                                    <Bell className={`w-6 h-6 ${iconColor}`} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 font-semibold text-gray-900">
                                        {n.title}
                                        <span className={`text-xs px-2 py-0.5 rounded ${priorityStyles[n.level]}`}>
                                            {n.level}
                                        </span>
                                        {!n.read && (
                                            <span className="w-2 h-2 bg-blue-500 rounded-full inline-block ml-1"></span>
                                        )}
                                    </div>
                                    <div className="text-gray-700">{n.content}</div>
                                    <div className="flex gap-4 mt-2 text-xs text-gray-500">
                                        <span>{new Date(n.time).toLocaleString()}</span>
                                        <span>Class: {n.className || "Unknown"}</span>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                    {!n.read && (
                                        <button
                                            className="text-blue-600 font-medium hover:underline"
                                            onClick={() => markRead(index)}
                                        >
                                            Mark as read
                                        </button>
                                    )}
                                    <button
                                        className="text-gray-400 hover:text-red-500 text-xl"
                                        onClick={() => removeNotif(index)}
                                        title="Remove"
                                    >
                                        ×
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </TeacherLayout>
    );
}