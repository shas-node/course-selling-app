const jwt = require("jsonwebtoken");

const { jwt_user_password } = require("../config");


function userMiddleware (req,res,next){
    const token = req.header.token;
    const decoded  = jwt.verify(token,jwt_user_password);

    if(decoded){
        req.userId = decoded.id;
        next()
    }

    else {
        res.status(403).json({
            message: "you are not signed in"
        })
    }
}

module.exports = {
    userMiddleware
}