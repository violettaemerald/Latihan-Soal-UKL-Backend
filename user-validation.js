const {validationResult, body} = require(`express-validator`);

const validateUser = [
    body('username').notEmpty().withMessage('Username is required'),
    body('password').notEmpty().withMessage('Password is required'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            let errMessage = errors.array().map(it=>it.msg).join(",")

            return res.status(422).json({
                success: false,
                message: errMessage
            })
        }
        next();
    }
];

module.exports = {validateUser}