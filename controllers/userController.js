
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

router.post('/forget_password',async (req,res)=>{
    try {
        const { email } = req.body;
        console.log(email);
        await userService.get_otp(email);
        res.json({
            varified:true,
            message:"otp send to ragister email-id"
        })
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
})

router.post('/check_otp',async (req,res)=>{
    try {
        const { email,otp } = req.body;
        console.log(email,otp);
        await userService.check_otp(email,otp);
        res.json({
            varified:true,
            message:"otp send to ragister email-id"
        })
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
})

router.post('/reset_password',async(req,res)=>{
    try {
        const{email,password}=req.body;
        const result=await userService.reset_password(email,password)
               
        res.json({message:"Password Updated"});
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
})

module.exports=router
