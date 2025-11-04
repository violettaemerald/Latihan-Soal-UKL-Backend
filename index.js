const express = require('express')

const app = express()

const PORT = 8000

const cors = require('cors')

app.use(cors())
app.use(express.json())
const auth = require(`./routes/auth.route`)


app.use('/api/auth', auth)

const userRoute = require('./routes/user.route')
app.use('/api/user', userRoute)

const attendanceRoutes = require('./routes/attendance.route');
app.use('/api/attendance', attendanceRoutes);


// app.use(express.static(__dirname))

app.listen(PORT, () => {
    console.log(`server of attendance runs on port ${PORT}`)
})

