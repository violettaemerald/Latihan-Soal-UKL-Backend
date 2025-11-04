const express = require('express');
const app = express()
const attendanceController = require('../controllers/attendance.controller');
const { authorize } = require('../controllers/auth.controller')

app.post('/', authorize, attendanceController.recordAttendance);
app.get('/history/:userID', authorize, attendanceController.getAttendanceHistory);
app.get('/summary/:userID', authorize, attendanceController.getAttendanceSummary);
app.get('/analysis', authorize, attendanceController.attendanceAnalysis);

module.exports = app;