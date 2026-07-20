require('dotenv').config();
const bcrypt = require('bcryptjs');
const mongoose = require('./models');
const User = require('./models/User');
const AcademicRecord = require('./models/AcademicRecord');
const Invoice = require('./models/Invoice');
const LibraryLog = require('./models/LibraryLog');
const Mentorship = require('./models/Mentorship');
const fs = require('fs');
const path = require('path');

async function seed() {
  try {
    const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/dcet_portal';
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB.');

    await mongoose.connection.dropDatabase();
    console.log('Database cleared and reset.');

    const hashedPassword = await bcrypt.hash('admin123', 10);
    const studentPassword = await bcrypt.hash('student123', 10);
    const facultyPassword = await bcrypt.hash('faculty123', 10);

    const admin = await User.create({
      userId: 'ADM1001',
      name: 'Central Administrator',
      email: 'admin@dcet.edu',
      mobile: '9999999990',
      role: 'Admin',
      department: 'Admin',
      password: hashedPassword
    });
    console.log('Created Admin User:', admin.userId);

    const faculty1 = await User.create({
      userId: 'FAC1001',
      name: 'Dr. S. Ramanathan',
      email: 'ramanathan@dcet.edu',
      mobile: '9999999991',
      role: 'Faculty',
      department: 'CSE',
      password: facultyPassword
    });

    const faculty2 = await User.create({
      userId: 'FAC1002',
      name: 'Dr. Meena Nair',
      email: 'meena@dcet.edu',
      mobile: '9999999992',
      role: 'Faculty',
      department: 'ECE',
      password: facultyPassword
    });

    const faculty3 = await User.create({
      userId: 'FAC1003',
      name: 'Dr. Rajesh Kumar',
      email: 'rajesh@dcet.edu',
      mobile: '9999999998',
      role: 'Faculty',
      department: 'IT',
      password: facultyPassword
    });
    console.log('Created Faculty Users:', faculty1.userId, faculty2.userId, faculty3.userId);

    const student1 = await User.create({
      userId: 'STU1001',
      name: 'Arun Kumar',
      email: 'arun@dcet.edu',
      mobile: '9999999993',
      role: 'Student',
      department: 'CSE',
      password: studentPassword,
      phone: '21CS01'
    });

    const student2 = await User.create({
      userId: 'STU1002',
      name: 'Priya Raj',
      email: 'priya@dcet.edu',
      mobile: '9999999994',
      role: 'Student',
      department: 'IT',
      password: studentPassword,
      phone: '21IT02'
    });

    const student3 = await User.create({
      userId: 'STU1003',
      name: 'Karthik Subramanian',
      email: 'karthik@dcet.edu',
      mobile: '9999999995',
      role: 'Student',
      department: 'ECE',
      password: studentPassword,
      phone: '21EC03'
    });

    const student4 = await User.create({
      userId: 'STU1004',
      name: 'Divya Bharathi',
      email: 'divya@dcet.edu',
      mobile: '9999999997',
      role: 'Student',
      department: 'CSE',
      password: studentPassword,
      phone: '21CS04'
    });
    console.log('Created Student Users:', student1.userId, student2.userId, student3.userId, student4.userId);

    await AcademicRecord.insertMany([
      { roll: '21CS01', name: 'Arun Kumar', subject: 'Data Structures', marks: 88, attendance: 92 },
      { roll: '21CS01', name: 'Arun Kumar', subject: 'Database Systems', marks: 85, attendance: 89 },
      { roll: '21CS01', name: 'Arun Kumar', subject: 'Operating Systems', marks: 90, attendance: 94 },
      
      { roll: '21IT02', name: 'Priya Raj', subject: 'Data Structures', marks: 91, attendance: 96 },
      { roll: '21IT02', name: 'Priya Raj', subject: 'Database Systems', marks: 89, attendance: 90 },
      
      { roll: '21EC03', name: 'Karthik Subramanian', subject: 'Data Structures', marks: 79, attendance: 84 },
      { roll: '21CS04', name: 'Divya Bharathi', subject: 'Data Structures', marks: 85, attendance: 91 }
    ]);
    console.log('Academic Records seeded.');

    await Invoice.insertMany([
      { invoiceId: 'INV-9021', userId: 'STU1001', type: 'Term Tuition Fee', amount: '₹45,000', date: '15 June 2026', status: 'Paid', color: 'success' },
      { invoiceId: 'INV-9045', userId: 'STU1001', type: 'Transport Bus Pass', amount: '₹12,000', date: '22 June 2026', status: 'Paid', color: 'success' },
      { invoiceId: 'INV-9110', userId: 'STU1001', type: 'Semester Exam Fee', amount: '₹2,400', date: '10 July 2026', status: 'Pending', color: 'warning' },

      { invoiceId: 'INV-9022', userId: 'STU1002', type: 'Term Tuition Fee', amount: '₹45,000', date: '15 June 2026', status: 'Paid', color: 'success' }
    ]);
    console.log('Invoices seeded.');

    await LibraryLog.insertMany([
      { userId: 'STU1001', book: 'Introduction to Algorithms (Cormen)', borrowed: '05 July 2026', due: '19 July 2026', fine: '₹0', status: 'Checked Out' },
      { userId: 'STU1001', book: 'Database System Concepts (Silberschatz)', borrowed: '20 June 2026', due: '04 July 2026', fine: '₹20', status: 'Overdue' },
      { userId: 'STU1001', book: 'Operating System Principles (Galvin)', borrowed: '01 June 2026', due: '15 June 2026', fine: '₹0', status: 'Returned' }
    ]);
    console.log('Library Logs seeded.');

    await Mentorship.insertMany([
      { facultyUserId: 'FAC1001', roll: '21CS01', name: 'Arun Kumar', cgpa: '8.52', status: 'Review Scheduled (20 July)' },
      { facultyUserId: 'FAC1001', roll: '21CS02', name: 'Priya Raj', cgpa: '9.15', status: 'Completed (10 July)' },
      { facultyUserId: 'FAC1001', roll: '21CS03', name: 'Karthik Subramanian', cgpa: '7.80', status: 'Pending Action' }
    ]);
    console.log('Mentorship logs seeded.');

    const credentialsPath = path.join(__dirname, '../credentials.txt');
    const credContent = `==================================================
DCET PORTAL SYSTEM CREDENTIALS LEDGER
==================================================

ADMIN ACCOUNT:
User ID: ADM1001
Password: admin123

FACULTY ACCOUNTS:
1. User ID: FAC1001 | Name: Dr. S. Ramanathan | Password: faculty123
2. User ID: FAC1002 | Name: Dr. Meena Nair | Password: faculty123
3. User ID: FAC1003 | Name: Dr. Rajesh Kumar | Password: faculty123

STUDENT ACCOUNTS:
1. User ID: STU1001 | Name: Arun Kumar | Password: student123 | Roll No: 21CS01
2. User ID: STU1002 | Name: Priya Raj | Password: student123 | Roll No: 21IT02
3. User ID: STU1003 | Name: Karthik Subramanian | Password: student123 | Roll No: 21EC03
4. User ID: STU1004 | Name: Divya Bharathi | Password: student123 | Roll No: 21CS04
==================================================
`;
    fs.writeFileSync(credentialsPath, credContent, 'utf8');
    console.log('Credentials written to:', credentialsPath);

    console.log('Database Seeding finished successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
}

seed();
