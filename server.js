require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('./models');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api', apiRoutes);

// Root test endpoint
app.get('/', (req, res) => {
  res.send('DCET College Portal Backend is running.');
});

// Database Sync & Start Server
mongoose.connect(process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/dcet_portal')
  .then(async () => {
    console.log('MongoDB connected successfully.');
    
    // Seed default admin if not exists
    try {
      const User = require('./models/User');
      const bcrypt = require('bcryptjs');
      const adminExists = await User.findOne({ role: 'Admin' });
      if (!adminExists) {
        const hashedPassword = await bcrypt.hash('admin123', 10);
        await User.create({
          userId: 'ADM1001',
          name: 'Central Administrator',
          email: 'admin@dcet.edu',
          mobile: '9999999990',
          role: 'Admin',
          department: 'Admin',
          password: hashedPassword
        });
        console.log('Default Admin Account Seeded (ID: ADM1001 / Pass: admin123)');
      }
    } catch (e) {
      console.error('Error seeding default admin:', e);
    }

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Unable to connect to MongoDB database:', err);
  });
