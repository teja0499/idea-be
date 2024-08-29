
const express = require('express');
const router = express.Router();
const userService=require('../service/userService')

router.get('/',(req,res)=>{
    console.log("user api working");
    res.send("user api work")
})

router.post('/register',async(req,res)=>{
    try {
        const userData=req.body
        console.log("Ragister",userData);
        
        const result=await userService.registerUser(userData)
        res.json(result)
    } catch (error) {
        // console.log(error);
        res.status(401).json({ message: error.message });
        
    }
})

router.post('/login',async(req,res)=>{
    try {
        const { email, password } = req.body;
        const result=await userService.login(email, password)
        res.json(result)
    } catch (error) {
    //  console.log(error);
     res.status(401).json({ message: error.message });
        
    }
})

module.exports=router



module.exports=router