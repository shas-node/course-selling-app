const { Router } = require("express");
const jwt = require("jsonwebtoken");
const {userModel} = require("../db");
const jwt_user_password = "encrypt";
const userRouter = Router();


userRouter.post("/signup",async function(req,res){
    const { email,password,firstName,lastName } = req.body;
//    zod validation, encrypt password
    try{ await userModel.create({
        email,
        password,
        firstName,
        lastName
    })
}
catch(e){
    res.status(500).json({
        message: "Signup failed"
    })
}
    res.json({
        message: "signup endpoint"
    })
})
userRouter.post("/signin",async function(req,res){
    const { email,password } = req.body;

    const user = await userModel.findOne({
        email,
        password
    });

    if(user) {
        const token  = jwt.sign({
            id: user._id
        }, jwt_user_password);
    
    res.json({
        Token: token
    })}
    else {
        res.status(403).json({
            message: "incorrect credentials"
        })
    }
})
userRouter.get("/purchases",function(req,res){
    res.json({
        message: "signup endpoint"
    })
})


module.exports ={
    userRouter : userRouter
}