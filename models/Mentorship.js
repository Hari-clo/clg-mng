const mongoose = require('mongoose');

const MentorshipSchema = new mongoose.Schema({
  facultyUserId: {
    type: String,
    required: true
  },
  roll: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  cgpa: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Mentorship', MentorshipSchema);
