const db = require('../models');
const userModel = db.user;

const md5 = require('md5')
const { sequelize } = require('../models/index')

const Op = require('sequelize').Op

console.log("🔥 Connected DB:", sequelize.config.database);

exports.getAllUser = async (req, res) => {
  try {
    const users = await userModel.findAll();
    return res.json({
      success: true,
      data: users,
      message: 'All users have been loaded',
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.findUser = async (req, res) => {
    const keyword = req.params.id

    const users = await userModel.findAll({
        where: {
            [Op.or]: [
                { userID: { [Op.substring]: keyword } },
                { name: { [Op.substring]: keyword } },
                { username: { [Op.substring]: keyword } },
                { kelas: { [Op.substring]: keyword } },
                { role: { [Op.substring]: keyword } }
            ]
        }
    })

    return res.json({
        success: true,
        data: users,
        message: 'All users have been loaded'
    })
}

exports.addUser = (req, res) => {
    let newUser = {
        name: req.body.name,
        username: req.body.username,
        password: md5(req.body.password),
        kelas: req.body.kelas,
        role: req.body.role
    }

    userModel.create(newUser)
        .then(result => {
            return res.json({
                success: true,
                data: result,
                message: 'New user has been inserted!',
                data: {
                    userID: result.userID,
                    name: result.name,
                    username: result.username,
                    kelas: result.kelas,
                    role: result.role
                }
            });
        })

        .catch(err => {
            return res.json({
                success: false,
                status: "error",
                message: err.message
            });
        });
};

exports.updateuser = (req, res) => {
    let dataUser = {
        name: req.body.name,
        username: req.body.username,
        kelas: req.body.kelas,
        role: req.body.role
    }

    if (req.body.password) {
        dataUser.password = md5(req.body.password)
    }

    let userID = req.params.id

    userModel.update(dataUser, { where: { userID: userID } })
        .then(() => {
            return userModel.findOne({ where: { userID: userID } })
        })

        .then(updatedUser => {
            return res.json({
                success: true,
                message: 'Data user has been updated',
                data: updatedUser
            })
        })

        .catch(err => {
            return res.json({
                success: false,
                message: err.message
            })
        })
}

exports.deleteUser = (req, res) => {
    let userID = req.params.id

    userModel.destroy({ where: { userID: userID } })
        .then(result => {
            return res.json({
                success: true,
                message: 'User data has been deleted'
            })
        })

        .catch(err => {
            return res.json({
                success: false,
                message: err.message
            })
        })
}