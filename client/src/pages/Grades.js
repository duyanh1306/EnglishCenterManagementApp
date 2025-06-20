import React from 'react';
import TeacherLayout from '../layouts/TeacherLayout';

export default function Grades() {
    return (
        <TeacherLayout>
            <div className="w-full p-8 bg-gray-50 min-h-screen">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Grades</h2>
                    </div>
                </div>
                <div className="bg-white rounded-xl shadow p-6 mb-6">
                    <p className="text-gray-600">This page is under construction.</p>
                </div>
            </div>
        </TeacherLayout>
    );
}
