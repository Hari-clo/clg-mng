const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema({
  invoiceId: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  amount: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true,
    default: 'success'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Invoice', InvoiceSchema);
