const { Router } = require("express");
const courseRouter = Router();

    courseRouter.post("/purchases",function(req,res){
    // you would expect the user to pay the money in here
    res.json({
        message: "signup endpoint"
    })
})
courseRouter.get("/preview",function(req,res){
   
    res.json({
        message: "signup endpoint"
    })
})


module.exports = {
    courseRouter: courseRouter
    
}