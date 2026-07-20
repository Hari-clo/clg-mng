const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  dob: {
    type: String,
    required: true
  },
  course: {
    type: String,
    required: true
  },
  marks: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    default: 'Pending'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Application', ApplicationSchema);
