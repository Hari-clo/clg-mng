const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const dashboardController = require('../controllers/dashboardController');
const formController = require('../controllers/formController');
const auth = require('../middleware/auth');

// Auth routes
router.post('/users/signup', userController.signup);
router.post('/users/login', userController.login);
router.post('/users/forgot-password', userController.forgotPassword);
router.get('/users/profile', auth, userController.getProfile);
router.put('/users/profile', auth, userController.updateProfile);

// Dashboard routes
router.get('/student/dashboard', auth, dashboardController.getStudentDashboard);
router.get('/faculty/dashboard', auth, dashboardController.getFacultyDashboard);
router.get('/faculty/records', auth, dashboardController.getFacultyRecords);
router.post('/faculty/records', auth, dashboardController.updateStudentMarks);
router.put('/faculty/records/:id', auth, dashboardController.updateAcademicRecord);
router.delete('/faculty/records/:id', auth, dashboardController.deleteAcademicRecord);
router.get('/admin/dashboard', auth, dashboardController.getAdminDashboard);
router.get('/admin/records', auth, dashboardController.getAdminRecords);
router.post('/admin/records', auth, dashboardController.addAdminRecord);
router.put('/admin/records/:userId', auth, dashboardController.updateAdminRecord);
router.delete('/admin/records/:userId', auth, dashboardController.deleteAdminRecord);

// Public form routes
router.post('/applications', formController.submitApplication);
router.post('/enquiries', formController.submitEnquiry);

module.exports = router;
