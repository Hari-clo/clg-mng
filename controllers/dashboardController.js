const User = require('../models/User');
const AcademicRecord = require('../models/AcademicRecord');
const Invoice = require('../models/Invoice');
const LibraryLog = require('../models/LibraryLog');
const Mentorship = require('../models/Mentorship');
const Application = require('../models/Application');

// Student Dashboard & Portal Data
exports.getStudentDashboard = async (req, res) => {
  try {
    const student = await User.findById(req.userData.id);
    if (!student) {
      return res.status(404).json({ message: 'Student profile not found.' });
    }

    const rollNumber = student.phone || student.userId;
    
    const academicSummary = await AcademicRecord.find({ roll: rollNumber });
    const libraryLogs = await LibraryLog.find({ userId: student.userId });
    const invoices = await Invoice.find({ userId: student.userId });

    return res.status(200).json({
      rollNumber,
      academicSummary,
      libraryLogs,
      invoices
    });
  } catch (error) {
    console.error('getStudentDashboard error:', error);
    return res.status(500).json({ message: 'Failed to retrieve student dashboard data.' });
  }
};

// Faculty Dashboard Data
exports.getFacultyDashboard = async (req, res) => {
  try {
    const faculty = await User.findById(req.userData.id);
    if (!faculty) {
      return res.status(404).json({ message: 'Faculty profile not found.' });
    }

    const mentees = await Mentorship.find({ facultyUserId: faculty.userId });

    return res.status(200).json({
      mentees,
      stats: {
        lectures: '3 Lectures',
        students: '180 Students',
        pendingMarks: '1 Subject'
      }
    });
  } catch (error) {
    console.error('getFacultyDashboard error:', error);
    return res.status(500).json({ message: 'Failed to retrieve faculty dashboard data.' });
  }
};

// Faculty Student Records List
exports.getFacultyRecords = async (req, res) => {
  try {
    const records = await AcademicRecord.find();
    return res.status(200).json({
      records: records.map(r => ({
        id: r._id.toString(),
        roll: r.roll,
        name: r.name,
        subject: r.subject,
        marks: r.marks,
        attendance: r.attendance
      }))
    });
  } catch (error) {
    console.error('getFacultyRecords error:', error);
    return res.status(500).json({ message: 'Failed to retrieve academic records.' });
  }
};

// Faculty Updates Student Marks/Attendance
exports.updateStudentMarks = async (req, res) => {
  try {
    const { roll, subject, marks, attendance } = req.body;

    if (!roll || !subject || !marks || !attendance) {
      return res.status(400).json({ message: 'All fields (roll, subject, marks, attendance) are required.' });
    }

    const student = await User.findOne({
      role: 'Student',
      $or: [{ phone: roll }, { userId: roll }]
    });

    const studentName = student ? student.name : 'Unknown Student';

    let record = await AcademicRecord.findOne({ roll, subject });
    if (!record) {
      record = new AcademicRecord({
        roll,
        subject,
        name: studentName,
        marks: parseInt(marks, 10),
        attendance: parseInt(attendance, 10)
      });
      await record.save();
    } else {
      record.marks = parseInt(marks, 10);
      record.attendance = parseInt(attendance, 10);
      if (studentName !== 'Unknown Student') {
        record.name = studentName;
      }
      await record.save();
    }

    return res.status(200).json({
      message: 'Marks & Attendance uploaded/updated successfully!',
      record: {
        id: record._id.toString(),
        roll: record.roll,
        name: record.name,
        subject: record.subject,
        marks: record.marks,
        attendance: record.attendance
      }
    });
  } catch (error) {
    console.error('updateStudentMarks error:', error);
    return res.status(500).json({ message: 'Failed to update academic records.' });
  }
};

// Admin Dashboard Summary
exports.getAdminDashboard = async (req, res) => {
  try {
    const totalStudents = await User.countDocuments({ role: 'Student' });
    const totalFaculty = await User.countDocuments({ role: 'Faculty' });
    const pendingApps = await Application.countDocuments({ status: 'Pending' });

    const activityLogs = [
      { text: `New student registration record updated.`, time: '10 mins ago' },
      { text: `Faculty marks upload sync operational.`, time: '45 mins ago' },
      { text: 'System database backup successfully completed.', time: '2 hours ago' }
    ];

    return res.status(200).json({
      stats: {
        students: totalStudents,
        faculty: totalFaculty,
        departments: 8,
        pendingApplications: pendingApps
      },
      activityLogs,
      feeCollection: {
        tuition: { collected: '₹2.15 Cr', percentage: 88 },
        transport: { collected: '₹42 Lakhs', percentage: 92 },
        exam: { collected: '₹11 Lakhs', percentage: 65 }
      }
    });
  } catch (error) {
    console.error('getAdminDashboard error:', error);
    return res.status(500).json({ message: 'Failed to retrieve admin dashboard data.' });
  }
};

// Admin Records Directories
exports.getAdminRecords = async (req, res) => {
  try {
    const students = await User.find({ role: 'Student' });
    const faculty = await User.find({ role: 'Faculty' });

    return res.status(200).json({
      students: students.map(s => ({
        id: s.userId,
        name: s.name,
        department: s.department,
        status: 'Active'
      })),
      faculty: faculty.map(f => ({
        id: f.userId,
        name: f.name,
        department: f.department,
        designation: 'Assistant Professor',
        experience: '5 yrs'
      }))
    });
  } catch (error) {
    console.error('getAdminRecords error:', error);
    return res.status(500).json({ message: 'Failed to retrieve directory records.' });
  }
};

// Admin Adds Student/Faculty Registry Record
exports.addAdminRecord = async (req, res) => {
  try {
    const { rrole, rid, rname, rdepartment } = req.body;

    if (!rrole || !rid || !rname || !rdepartment) {
      return res.status(400).json({ message: 'Role, ID/Roll Number, Full Name and Department are required.' });
    }

    const email = `${rname.toLowerCase().replace(/\s+/g, '')}@dcet.edu`;
    const mobile = '9999999999';
    const bcrypt = require('bcryptjs');
    const defaultPassword = await bcrypt.hash(`${rname.split(' ')[0]}123`, 10);

    const newUser = await User.create({
      userId: rid,
      name: rname,
      email,
      mobile,
      role: rrole,
      department: rdepartment,
      password: defaultPassword,
      phone: rrole === 'Student' ? rid : ''
    });

    // Seed defaults for students
    if (rrole === 'Student') {
      await AcademicRecord.insertMany([
        { roll: rid, name: rname, subject: 'Data Structures', marks: 80, attendance: 85 },
        { roll: rid, name: rname, subject: 'Database Systems', marks: 75, attendance: 90 }
      ]);
    }

    // Append newly created credentials to credentials.txt
    try {
      const fs = require('fs');
      const path = require('path');
      const credentialsPath = path.join(__dirname, '../credentials.txt');
      const plainPassword = `${rname.split(' ')[0]}123`;
      const newCredLine = `ADMIN CREATED - Role: ${rrole} | User ID: ${rid} | Name: ${rname} | Password: ${plainPassword} | Dept: ${rdepartment}\n`;
      fs.appendFileSync(credentialsPath, newCredLine, 'utf8');
    } catch (e) {
      console.error('Failed to append credentials to credentials.txt:', e);
    }

    return res.status(201).json({
      message: 'Record stored successfully!',
      user: {
        id: newUser._id.toString(),
        userId: newUser.userId,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        department: newUser.department
      }
    });
  } catch (error) {
    console.error('addAdminRecord error:', error);
    return res.status(500).json({ message: 'Failed to create directory record.' });
  }
};

// Admin Updates User Record
exports.updateAdminRecord = async (req, res) => {
  try {
    const { userId } = req.params;
    const { rname, rdepartment } = req.body;

    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(404).json({ message: 'Record not found.' });
    }

    user.name = rname;
    user.department = rdepartment;
    await user.save();

    // If student, sync name in AcademicRecord
    if (user.role === 'Student') {
      const rollNumber = user.phone || user.userId;
      await AcademicRecord.updateMany(
        { roll: rollNumber },
        { name: rname }
      );
    }

    return res.status(200).json({ message: 'Record updated successfully!', user });
  } catch (error) {
    console.error('updateAdminRecord error:', error);
    return res.status(500).json({ message: 'Failed to update record.' });
  }
};

// Admin Deletes User Record
exports.deleteAdminRecord = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(404).json({ message: 'Record not found.' });
    }

    // Delete associated academic records if student
    if (user.role === 'Student') {
      const rollNumber = user.phone || user.userId;
      await AcademicRecord.deleteMany({ roll: rollNumber });
    }

    await User.deleteOne({ _id: user._id });
    return res.status(200).json({ message: 'Record deleted successfully!' });
  } catch (error) {
    console.error('deleteAdminRecord error:', error);
    return res.status(500).json({ message: 'Failed to delete record.' });
  }
};

// Faculty Updates Academic/Attendance Record by ID
exports.updateAcademicRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const { roll, subject, marks, attendance } = req.body;

    const record = await AcademicRecord.findById(id);
    if (!record) {
      return res.status(404).json({ message: 'Academic record not found.' });
    }

    const student = await User.findOne({
      role: 'Student',
      $or: [{ phone: roll }, { userId: roll }]
    });
    const studentName = student ? student.name : 'Unknown Student';

    record.roll = roll;
    record.subject = subject;
    record.marks = parseInt(marks, 10);
    record.attendance = parseInt(attendance, 10);
    record.name = studentName;
    await record.save();

    return res.status(200).json({
      message: 'Academic record updated successfully!',
      record: {
        id: record._id.toString(),
        roll: record.roll,
        name: record.name,
        subject: record.subject,
        marks: record.marks,
        attendance: record.attendance
      }
    });
  } catch (error) {
    console.error('updateAcademicRecord error:', error);
    return res.status(500).json({ message: 'Failed to update academic record.' });
  }
};

// Faculty Deletes Academic/Attendance Record by ID
exports.deleteAcademicRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const record = await AcademicRecord.findById(id);
    if (!record) {
      return res.status(404).json({ message: 'Academic record not found.' });
    }

    await AcademicRecord.deleteOne({ _id: record._id });
    return res.status(200).json({ message: 'Academic record deleted successfully!' });
  } catch (error) {
    console.error('deleteAcademicRecord error:', error);
    return res.status(500).json({ message: 'Failed to delete academic record.' });
  }
};

