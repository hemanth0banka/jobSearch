const errorHandler = (err, req, res, next) => {
    const error = err.message || 'Internal Server Error'
    const statusCode = err.statusCode || 500
    return res.status(statusCode).json({
        success : false,
        message : error
    })
}
module.exports = errorHandler