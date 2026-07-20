const Application = require('../models/Application');
const Enquiry = require('../models/Enquiry');

exports.submitApplication = async (req, res) => {
  try {
    const { name, dob, course, marks, email, phone } = req.body;

    if (!name || !dob || !course || !marks || !email || !phone) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const application = await Application.create({
      name,
      dob,
      course,
      marks: parseInt(marks, 10),
      email,
      phone
    });

    return res.status(201).json({
      message: 'Application Submitted successfully!',
      application
    });
  } catch (error) {
    console.error('submitApplication error:', error);
    return res.status(500).json({ message: 'Failed to submit application.' });
  }
};

exports.submitEnquiry = async (req, res) => {
  try {
    const { name, email, phone, course, query } = req.body;

    if (!name || !email || !phone || !course || !query) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const enquiry = await Enquiry.create({
      name,
      email,
      phone,
      course,
      query
    });

    return res.status(201).json({
      message: 'Enquiry Submitted successfully!',
      enquiry
    });
  } catch (error) {
    console.error('submitEnquiry error:', error);
    return res.status(500).json({ message: 'Failed to submit enquiry.' });
  }
};
