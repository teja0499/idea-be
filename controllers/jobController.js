
const express = require('express');
const router = express.Router();
const jobService=require('../service/jobService');
const JobCategorieService = require('../service/jobCategoriesService');

router.get('/',(req,res)=>{
    // console.log("Job api working");
    res.send("job api work")
})

router.post('/admin/create_job',async(req,res)=>{
    try {
        const jobData=req.body
        // console.log("Ragister",jobData);
        
        const result=await jobService.createJob(jobData)
        res.json(result)
    } catch (error) {
        console.log(error);
        
        res.status(401).json({ message: error.message });
    }
})

router.post('/admin/add_category',async(req,res)=>{
    try {
        const category=req.body
        console.log("category",category);
        
        const result=await JobCategorieService.add_Category(category)
        res.json(result)
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
})

router.get('/admin/get_Job_Categorie',async(req,res)=>{
    try {
        const all_catg=await JobCategorieService.getJobCategorie();
        res.json(all_catg);
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: error.message });
    }
})

router.delete('/admin/delete_Categorie/:id',async(req,res)=>{
    try {
        const id=req.params.id;

        console.log(id);
        
        await JobCategorieService.removeJobCategorie(id);
        res.json("Deleted successfully");
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: error.message });
    }
})

router.get('/get_Job',async(req,res)=>{
    try {
       
        // console.log("get job");
        
        const result=await jobService.getJob()
        res.json(result)
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
})


router.post('/job-application',async(req,res)=>{
    try {
        console.log("job appliaction",req.body);
        
        const body=req.body
        const data=await jobService.job_application(body);
        res.json(data) 
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
})

router.put('/admin/update-user-application/:id',async(req,res)=>{
    try {
        const id=req.params.id;
        const body=req.body;
        console.log(id,body);
       const data= jobService.update_user_applicatin(id,body)
       res.json(data) 
    } catch (error) {
        console.log(error);
        
    }
})


router.post('/user/job-applications/:id',async(req,res)=>{
    try {
        // console.log("job appliaction",req.params.id);
        
        const id=req.params.id
        const data=await jobService.user_Job_Application(id);
        res.json(data) 
        
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
})

router.post('/user/job/:id',async(req,res)=>{
    try {
        // console.log("job appliaction",req.params.id);
        
        const id=req.params.id
        const data=await jobService.findJobById(id);
        // console.log(data);
        res.json(data) 
        
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
})

router.get('/admin/new_job_application',async(req,res)=>{
    try {
       
        // console.log("get job");
        const result=await jobService.new_job_application();
        res.json(result)
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
})

router.post('/admin/get-application-info',async (req,res)=>{
    try {
        const data=req.body
        // console.log(data);
        const result=await jobService.getInfoApplication(data)
        // console.log(result);
        
        res.json(result)
    } catch (error) {
        console.log(error);
       res.status(401).json({ message: error.message });
        
    }
})

router.post('/admin/upateStatus',async(req,res)=>{
    try {
        // console.log("update status",req.body);
        const body=req.body;
        
        const data=await jobService.updateApplicationStatus(body)
        res.json(data)
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: error.message });
    }
})

router.get('/admin/get_all_application',async(req,res)=>{
    try {
       
        const result=await jobService.get_all_past_application()
        // console.log(result);
        
        res.json(result)
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
})




module.exports=router