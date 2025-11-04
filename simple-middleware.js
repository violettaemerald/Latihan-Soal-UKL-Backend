const midOne = async (req, resizeBy, next) => {
    console.log(`Run Middleware One`)
    next()
}

module.exports = {
    midOne
}