const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const AcademicRecord = require('../models/AcademicRecord');
const Invoice = require('../models/Invoice');
const LibraryLog = require('../models/LibraryLog');
const Mentorship = require('../models/Mentorship');

exports.signup = async (req, res) => {
  try {
    const { name, email, mobile, role, department, password } = req.body;

    if (!name || !email || !mobile || !role || !department || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      mobile,
      role,
      department,
      password: hashedPassword
    });

    // Seed mock data for the dashboard based on the user's role
    if (role === 'Student') {
      const rollNumber = `21${department.slice(0, 2).toUpperCase()}0${newUser.userId.slice(-2)}`;
      newUser.phone = rollNumber;
      await newUser.save();

      // Seed academic records
      await AcademicRecord.insertMany([
        { roll: rollNumber, name, subject: 'Data Structures', marks: 88, attendance: 92 },
        { roll: rollNumber, name, subject: 'Database Systems', marks: 85, attendance: 89 },
        { roll: rollNumber, name, subject: 'Operating Systems', marks: 90, attendance: 94 }
      ]);

      // Seed invoices
      await Invoice.insertMany([
        { invoiceId: 'INV-9021', userId: newUser.userId, type: 'Term Tuition Fee', amount: '₹45,000', date: '15 June 2026', status: 'Paid', color: 'success' },
        { invoiceId: 'INV-9045', userId: newUser.userId, type: 'Transport Bus Pass', amount: '₹12,000', date: '22 June 2026', status: 'Paid', color: 'success' },
        { invoiceId: 'INV-9110', userId: newUser.userId, type: 'Semester Exam Fee', amount: '₹2,400', date: '10 July 2026', status: 'Pending', color: 'warning' }
      ]);

      // Seed library logs
      await LibraryLog.insertMany([
        { userId: newUser.userId, book: 'Introduction to Algorithms (Cormen)', borrowed: '05 July 2026', due: '19 July 2026', fine: '₹0', status: 'Checked Out' },
        { userId: newUser.userId, book: 'Database System Concepts (Silberschatz)', borrowed: '20 June 2026', due: '04 July 2026', fine: '₹20', status: 'Overdue' },
        { userId: newUser.userId, book: 'Operating System Principles (Galvin)', borrowed: '01 June 2026', due: '15 June 2026', fine: '₹0', status: 'Returned' }
      ]);
    } else if (role === 'Faculty') {
      // Seed mentorship
      await Mentorship.insertMany([
        { facultyUserId: newUser.userId, roll: '21CS01', name: 'Arun Kumar', cgpa: '8.52', status: 'Review Scheduled (20 July)' },
        { facultyUserId: newUser.userId, roll: '21CS02', name: 'Priya Raj', cgpa: '9.15', status: 'Completed (10 July)' }
      ]);
    }

    return res.status(201).json({
      message: `Sign Up Successful! Keep note of your User ID: ${newUser.userId}`,
      userId: newUser.userId,
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
    console.error('Signup error:', error);
    return res.status(500).json({ message: 'Internal server error during registration.' });
  }
};

exports.login = async (req, res) => {
  try {
    const { utype, uid, password } = req.body;

    if (!utype || !uid || !password) {
      return res.status(400).json({ message: 'Role, User ID/Email and Password are required.' });
    }

    // Try finding by email or userId
    const user = await User.findOne({
      role: utype,
      $or: [
        { email: uid },
        { userId: uid }
      ]
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials or role mismatch.' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const token = jwt.sign(
      {
        id: user._id.toString(),
        userId: user.userId,
        email: user.email,
        role: user.role,
        name: user.name
      },
      process.env.JWT_SECRET || 'dcet_super_secret_jwt_key_2026',
      { expiresIn: '24h' }
    );

    return res.status(200).json({
      message: 'Login successful!',
      token,
      user: {
        id: user._id.toString(),
        userId: user.userId,
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department,
        mobile: user.mobile,
        address: user.address,
        phone: user.phone || ''
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Internal server error during login.' });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userData.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { phone, address } = req.body;
    const user = await User.findById(req.userData.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    if (phone !== undefined) user.phone = phone;
    if (address !== undefined) user.address = address;
    await user.save();

    return res.status(200).json({
      message: 'Profile updated successfully!',
      user: {
        id: user._id.toString(),
        userId: user.userId,
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department,
        mobile: user.mobile,
        address: user.address,
        phone: user.phone || ''
      }
    });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error updating profile.' });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email, uid } = req.body;

    if (!email || !uid) {
      return res.status(400).json({ message: 'Email and User ID are required.' });
    }

    const user = await User.findOne({
      email,
      userId: uid
    });

    if (!user) {
      return res.status(404).json({ message: 'Matching User not found.' });
    }

    const newHashedPassword = await bcrypt.hash('DCET123', 10);
    user.password = newHashedPassword;
    await user.save();

    return res.status(200).json({
      message: 'Password reset successful! Your temporary password is DCET123. Please log in and change it.'
    });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error.' });
  }
};
