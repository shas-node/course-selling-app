const jwt = require("jsonwebtoken");
const { admin_jwt_password } = require("../config");

function adminMiddleware (req,res,next){
    const token = req.header.token;
    const decoded  = jwt.verify(token,admin_jwt_password);

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
    adminMiddleware
}
