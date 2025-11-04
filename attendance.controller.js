const {attendance, user} = require('../models');
const {Op} = require('sequelize');

exports.recordAttendance = async (req, res) => {
    try{
        const { userID, date, time, status } = req.body;
        if (!userID || !date || !time || !status) {
            return res.status(400).json({ status: 'fail', message: 'Data harus ada.'});
        }

        const attend = await attendance.create({ userID, date, time, status });
        res.status(201).json ({
            status: 'success',
            message: 'presensi berhasil dicatat!',
            data: attend
        })
    } catch (err) {
        res.status(500).json({status: 'err', message: err.message})
    }
};

exports.getAttendanceHistory = async (req, res) => {
    try {
        const userID = req.params.userID;
        const history = await attendance.findAll({
            where: {userID},
            order: [['date', 'desc']]
        });

        const result = history.map(entry => ({
            attendanceID: entry.attendanceID,
            userID: entry.userID,
            date: entry.date,
            time: entry.time,
            status: entry.status
        }));

        res.status(200).json({
            status: 'success',
            data: result
        });
    } catch (err) {
        res.status(500).json({status: 'err', message: err.message});
    }
};

exports.getAttendanceSummary = async (req, res) => {
    try {
        const userID = req.params.userID;
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const {Op} = require('sequelize');

        const startDate = `${year}-${month}-01`;
        const lastDay = new Date(year, parseInt(month), 0).getDate();
        const endDate = `${year}-${month}-${lastDay}`;
        
        // const userID = req.params.userID;
        // const monthNow = new Date().toISOString().slice(0,7);

        // const {Op} = require('sequelize');
        // const startDate = `${monthNow}-01 00:00:00`;
        // const endDate = `${monthNow}-31 23:59:59`;

        const daftarPresensi = await attendance.findAll({
            where: {
                userID,
                date: {[Op.between]: [startDate, endDate]}
            }
        });

        let attendance_summary = {hadir: 0, izin: 0, sakit: 0, alpa: 0};
        daftarPresensi.forEach(item => {
            const status = (item.status || '').toLowerCase();
            if (status in attendance_summary) attendance_summary[status]++;
        });

        res.status(200).json({
            status: 'success',
            data: {
                user_id: parseInt(userID),
                month: `${month}-${year}`,
                attendance_summary
            }
        });
    } catch (err) {
        res.status(500).json({status: 'error', message: err.message});
    }
};

exports.attendanceAnalysis = async (req, res) => {
    try {
        const { start_date, end_date, group_by } = req.body;
        if (!start_date || !end_date || !group_by) {
            return res.status(400).json({ status: 'fail', message: 'start_date, end_date, group_by wajib diisi.' });
        }

        const daftarPresensi = await attendance.findAll({
            where: {
                date: { [Op.between]: [start_date, end_date] }
            },
            include: [{ model: user, as: 'user' }]
        });

        const groupMap = {};

        daftarPresensi.forEach(item => {
            const groupValue = item.user[group_by] || 'unknown';

            if (!groupMap[groupValue]) {
                groupMap[groupValue] = {
                    group: groupValue,
                    total_users: 0,
                    attendance_summary: { hadir: 0, izin: 0, sakit: 0, alpa: 0 },
                    userIDs: new Set()
                };
            }

            const status = (item.status || '').toLowerCase();
            if (groupMap[groupValue].attendance_summary[status] !== undefined) {
                groupMap[groupValue].attendance_summary[status]++;
            }
            groupMap[groupValue].userIDs.add(item.userID);
        });

        const grouped_analysis = Object.values(groupMap).map(g => {
            const total = Object.values(g.attendance_summary).reduce((a, b) => a + b, 0) || 1;
            return {
                group: g.group,
                total_users: g.userIDs.size,
                hadir_percentage: Number(((g.attendance_summary.hadir / total) * 100).toFixed(2)),
                izin_percentage: Number(((g.attendance_summary.izin / total) * 100).toFixed(2)),
                sakit_percentage: Number(((g.attendance_summary.sakit / total) * 100).toFixed(2)),
                alpa_percentage: Number(((g.attendance_summary.alpa / total) * 100).toFixed(2)),
                total_attendance: g.attendance_summary
            };
        });

        res.status(200).json({
            status: 'success',
            data: {
                analysis_period: { start_date, end_date },
                grouped_analysis
            }
        });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

// exports.attendanceAnalysis = async (req, res) => {
//     try {
//         const { startDate, endDate, groupBy } = req.body;
//         if (!startDate || !endDate || !groupBy) {
//             return res.status(400).json({ status: 'fail', message: 'startDate, endDate, groupBy wajib diisi.'})
//         }

//         const daftarPresensi = await attendance.findAll({
//             where: {
//                 date: {[Op.between]: [startDate, endDate]}
//             },
//             include: [{
//                 model: user,
//                 as: 'user'
//             }]
//         });

//         const groupMap = {};

//         daftarPresensi.forEach(item =>{
//             const groupValue = item.user[groupBy];

//             if (!groupMap[groupValue]) {
//                 groupMap[groupValue] = {
//                 group: groupValue,
//                 total_users: 0,
//                 attendance_summary: {hadir: 0, izin: 0, sakit: 0, alpa: 0},
//                 userIDs: new Set()
//                 };
//             }

//             groupMap[groupValue].attendance_summary[item.status.toLowerCase()]++;
//             groupMap[groupValue].userIDs.add(item.userID);
//         })

//         const groupedAnalysis = Object.values(groupMap).map(g => {
//             const total_present =
//             Object.values(g.attendance_summary).reduce((a,b) => a+b,0);
//             return {
//                 group: g.group,
//                 total_users: g.userIDs.size,
//                 attendanceRate: {
//                     hadir_percentage: g.attendance_summary.hadir / total_present || 0,
//                     izin_percentage: g.attendance_summary.izin / total_present || 0,
//                     sakit_percentage: g.attendance_summary.sakit / total_present || 0,
//                     alpa_percentage: g.attendance_summary.alpa / total_present || 0
//                 },
//                 total_attendance: g.attendance_summary
//             };
//         });

//         res.status(200).json({
//             status: 'success',
//             data: {
//                 analysis_period: {
//                     startDate,
//                     endDate
//                 },
//                 groupedAnalysis
//             }
//         })
//     } catch (err){
//         res.status(500).json({status: 'error', message: err.message});
//     }
// }