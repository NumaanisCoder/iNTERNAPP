module.exports.SuccesHandler = (res,statusCode, message, token = "") => {
    res.json({
        success: true,
        statusCode: statusCode,
        message: message,
        token: token
    })
}