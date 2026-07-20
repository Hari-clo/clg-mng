const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  userId: {
    type: String,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  mobile: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    default: 'Student'
  },
  department: {
    type: String
  },
  password: {
    type: String,
    required: true
  },
  address: {
    type: String
  },
  phone: {
    type: String
  }
}, {
  timestamps: true
});

UserSchema.pre('save', async function() {
  const user = this;
  if (user.isNew && !user.userId) {
    let prefix = 'STU';
    if (user.role === 'Faculty') prefix = 'FAC';
    if (user.role === 'Admin') prefix = 'ADM';

    const count = await mongoose.model('User').countDocuments({ role: user.role });
    user.userId = `${prefix}${1000 + count + 1}`;
  }
});

module.exports = mongoose.model('User', UserSchema);
