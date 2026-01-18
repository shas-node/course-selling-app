const { Router } = require("express");
const { admin_jwt_password } = require ("../config"); 
const adminRouter = Router();
const { adminModel } = require("../db");
const jwt = require("jsonwebtoken");
adminRouter.post("/signup", async function(req,res){
     const { email,password,firstName,lastName } = req.body;
    //    zod validation, encrypt password
        try{ await adminModel.create({
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

adminRouter.post("/signin",async function(req,res){
    const { email,password } = req.body;

    const admin = await adminModel.findOne({
        email,
        password
    });

    if(admin) {
        const token  = jwt.sign({
            id: user._id
        }, admin_jwt_password);
    
    res.json({
        Token: token
    })}
    else {
        res.status(403).json({
            message: "incorrect credentials"
        })
    }
})
adminRouter.post("/course",function(req,res){
    res.json({
        message: "signin endpoint"
    })
})

adminRouter.put("/course",function(req,res){
    res.json({
        message: "signin endpoint"
    })
})

adminRouter.get("/course/bulk",function(req,res){
    res.json({
        message: "signin endpoint"
    })
})

module.exports = {
    adminRouter: adminRouter
}