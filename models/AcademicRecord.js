const mongoose = require('mongoose');

const AcademicRecordSchema = new mongoose.Schema({
  roll: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  marks: {
    type: Number,
    required: true,
    default: 0
  },
  attendance: {
    type: Number,
    required: true,
    default: 100
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('AcademicRecord', AcademicRecordSchema);
