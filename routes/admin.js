const { Router } = require("express");
const { admin_jwt_password } = require ("../config"); 
const adminRouter = Router();
const { adminModel, courseModel } = require("../db");
const { adminMiddleware } = require("../middleware/admin.middleware");
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
adminRouter.post("/course",adminMiddleware, async function(req,res){

    const creatorId = req.userId;

    const {title,description,price,imageUrl} = req.body;

    const course = await courseModel.create ({
        title,
        description,
        price,
        imageUrl,
        creatorId
    })
    res.json({
        message: "course created",
        courseId: course._id
    })
})

adminRouter.put("/course",adminMiddleware,async function(req,res){
    const creatorId = req.userId;
     const {title,description,price,imageUrl,courseId} = req.body;

     await courseModel.updateOne ({
        _id: courseId,
        creatorId
     },{
        title,
        description,
        price,
        imageUrl,
        
     })
    res.json({
        message: "course updated",
        courseId:course._id
    })
})

adminRouter.get("/course/bulk",adminMiddleware,async function(req,res){

    const creatorId = req.userId;
   
     const {title,description,price,imageUrl,courseId} = req.body;

     const courses = await courseModel.find ({
        
        creatorId
     })
    res.json({
        message:"Courses:",
        courses
        
    })
    
})

module.exports = {
    adminRouter: adminRouter
}