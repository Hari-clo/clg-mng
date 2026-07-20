const mongoose = require('mongoose');

const LibraryLogSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  book: {
    type: String,
    required: true
  },
  borrowed: {
    type: String,
    required: true
  },
  due: {
    type: String,
    required: true
  },
  fine: {
    type: String,
    required: true,
    default: '₹0'
  },
  status: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('LibraryLog', LibraryLogSchema);
