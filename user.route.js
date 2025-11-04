const express = require('express')

const app = express()

const { midOne } = require("../middleware/simple-middleware")
const { validateUser } = require("../middleware/user-validation")

const { authorize } = require('../controllers/auth.controller')
const { isSiswa, isAdmin } = require('../middleware/role-validation')

const userController = require('../controllers/user.controller')

app.get('/', authorize, isAdmin, userController.getAllUser)

app.get("/:id", authorize, isAdmin, userController.findUser)
app.delete("/:id", authorize, isAdmin, userController.deleteUser)
// app.post("/", userController.addUser)
app.post("/", authorize, isAdmin, validateUser, userController.addUser)
// app.put("/:id", userController.updateuser)
app.put("/:id", authorize, isSiswa, validateUser, userController.updateuser)

module.exports = app