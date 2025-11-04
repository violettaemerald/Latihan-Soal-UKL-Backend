exports.isSiswa = async (req, res, next) => {
    console.log(req.user.role)

    if (req.user.role == "siswa") {
        next();
    } else {
        return res.status(401).json({
            success: false,
            auth: false,
            message: 'access forbidden, you are not a user.'
        })
    }
}

exports.isAdmin = async (req, res, next) => {
    console.log(req, res, next)

    if (req.user.role == "admin") {
        next();
    } else {
        return res.status(401).json({
            success: false,
            auth: false,
            message: 'access forbidden, you are not an admin.'
        })
    }
}