const Class = require('../models/Class');
const Schedule = require('../models/Schedule');
const Slot = require('../models/Slot');
const Room = require('../models/Room');

// Get teaching schedule for a specific teacher
const getTeacherSchedule = async (req, res) => {
  try {
    const { teacherId } = req.params;

    // Find all classes where the teacher is assigned
    const teacherClasses = await Class.find({
      'teacherId.teacherId': teacherId
    });

    if (!teacherClasses || teacherClasses.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No classes found for this teacher'
      });
    }

    // Get class IDs
    const classIds = teacherClasses.map(cls => cls.id);

    // Find schedules for these classes
    const schedules = await Schedule.find({
      classId: { $in: classIds }
    });

    // Get all slot IDs and room IDs from schedules
    const slotIds = [...new Set(schedules.map(schedule => schedule.slotId))];
    const roomIds = [...new Set(schedules.map(schedule => schedule.roomId))];

    // Fetch slots and rooms data
    const slots = await Slot.find({ id: { $in: slotIds } });
    const rooms = await Room.find({ id: { $in: roomIds } });

    // Create lookup maps
    const slotMap = slots.reduce((map, slot) => {
      map[slot.id] = slot;
      return map;
    }, {});

    const roomMap = rooms.reduce((map, room) => {
      map[room.id] = room;
      return map;
    }, {});

    // Group schedules by class and format the response
    const classScheduleDetails = teacherClasses.map(classInfo => {
      const classSchedules = schedules.filter(schedule => schedule.classId === classInfo.id);
      
      const formattedSchedules = classSchedules.map(schedule => {
        const slotInfo = slotMap[schedule.slotId];
        const roomInfo = roomMap[schedule.roomId];

        return {
          scheduleId: schedule.id,
          date: schedule.date,
          timeSlot: {
            slotId: schedule.slotId,
            from: slotInfo ? slotInfo.from : '',
            to: slotInfo ? slotInfo.to : ''
          },
          room: {
            roomId: schedule.roomId,
            name: roomInfo ? roomInfo.name : '',
            location: roomInfo ? roomInfo.location : '',
            capacity: roomInfo ? roomInfo.capacity : 0
          },
          meeting: schedule.meeting || ''
        };
      });

      // Sort schedules by date and time
      formattedSchedules.sort((a, b) => {
        const dateComparison = new Date(a.date) - new Date(b.date);
        if (dateComparison !== 0) return dateComparison;
        return a.timeSlot.from.localeCompare(b.timeSlot.from);
      });

      return {
        classId: classInfo.id,
        className: classInfo.name,
        classDescription: classInfo.description,
        courseId: classInfo.courseId,
        startDate: classInfo.startDate,
        status: classInfo.status,
        totalSchedules: formattedSchedules.length,
        schedules: formattedSchedules
      };
    });

    res.status(200).json({
      success: true,
      message: 'Teacher schedule retrieved successfully',
      data: {
        teacherId: teacherId,
        totalClasses: teacherClasses.length,
        classes: classScheduleDetails
      }
    });

  } catch (error) {
    console.error('Error getting teacher schedule:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

module.exports = {
  getTeacherSchedule
}; 