const errorHandler = (err,req,res,next) =>{
    const statusCode = res.statusCode || 401;

    res.status(statusCode).json({
        message:err.message,
    });
}

module.exports = errorHandler