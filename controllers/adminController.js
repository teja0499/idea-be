const express = require('express');
const router = express.Router();
const adminService=require('../service/adminService')

router.get('/',(req,res)=>{
    console.log("api working");
    res.send("work")
})

router.post('/register',async(req,res)=>{
    try {
        const adminData=req.body
        console.log("Ragister",adminData);
        
        const result=await adminService.registerAdmin(adminData)
        res.json(result)
    } catch (error) {
        // console.log(error);
        res.status(401).json({ message: error.message });
        
    }
})

router.post('/login',async(req,res)=>{
    try {
        const { email, password } = req.body;
        const result=await adminService.login(email, password)
        res.json(result)
    } catch (error) {
    //  console.log(error);
     res.status(401).json({ message: error.message });
        
    }
})



module.exports=router