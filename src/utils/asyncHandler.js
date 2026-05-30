const asyncHandler = (requestHandler) => {
    return async (req, res, next) => {
        return Promise
        .resolve(requestHandler(req,res,next))
        .catch((error) => next(error));
    }
}
    

export { asyncHandler }




// higher order function (try / catch)
/*
const asyncHandler = (fn) => {
    return async (req, res, next) => {
        try {
            await fn(req, res, next)
        } catch (error) {
            res.status(error.code || 500).json({
                success: false,
                message: error.message
            })
        }
    }
}
*/
