const Job = require('../models/Job')
const Job_Application = require('../models/Job_Applications');
const User = require('../models/User');
const { sendSelectionEmails, sendRejectionEmails } = require('./mail/mailService');
const { userFindById } = require('./userService');
// const JobCategorie=require('../models/JobCategory')

const createJob = async (jobData) => {
    const job = await Job.findOne(jobData);
    if (job) {
        throw new Error('Job already exists');
    }

    const newJob = await Job.create(jobData);
    return newJob;
}

const getJob = async () => {
    return await Job.find();
}

const job_application = async (data) => {
    console.log("job_application", data);
    const id= data.job

    const existingApplication = await Job_Application.findOne({
        job:id,
        candidate: data.candidate
    });
    // console.log(existingApplication);
    console.log(data.job);
    

    if (existingApplication) {
        throw new Error('Candidate has already applied for this job.');
    }
    const AtsScore= await ATS(data,id);
    const finalData={
        ...data,
        AtsScore
    }


    console.log(finalData);
    
    return Job_Application.create(finalData);
    // return data
};

const user_Job_Application = async (id) => {
    const data = await Job_Application.find({ candidate: id })
    return data;
}

const findJobById = async (_id) => {
    console.log(_id);

    const jobDetaile = await Job.findById(_id);
    console.log(jobDetaile);

    if (jobDetaile) {
        return jobDetaile
    }
    else {
        throw new Error('Job is not exist');
    }
}

const new_job_application = async () => {
    const data = await Job_Application.find({ status: "pending" })
    return data;
}

const getInfoApplication = async (data) => {
    console.log(data);
    
    const uid = data.uid;
    const jid = data.jid;
    const job = await Job.findById(jid);
    const user = await userFindById(uid);
    console.log(user,job);
    
    return { job, user }
}

const updateApplicationStatus=async(id,status,reason,candidate,title)=>{
    // // const hrEmail= 'tejasnagare9999@gmail.com'
    // // const hrName= 'Tejas Nagare'
    // const user=await User.findById(candidate)
    // // if(status==='select')
    // // {
    // //  console.log("select");
     
    // //     sendSelectionEmails(user.email, user.name, title, hrEmail, hrName);
    // // }else if(status ==='reject')
    // // {
    // //     console.log("reject");
        
    // //     sendRejectionEmails(user.email,  user.name, hrEmail, hrName, title, reason);
    // // }
    const data = await Job_Application.findByIdAndUpdate(id, { status: status,reason:reason }, { new: true });
    console.log(data);
    
    return data;
}


const get_all_past_application=async()=>{
    return await Job_Application.find({ status: { $ne: "pending" } })
}
const update_user_applicatin=async(id,body)=>{
    const result = await Job_Application.findByIdAndUpdate(id, body, { new: true });
    return result;
}

const ATS=async (data,id)=>{
const job=await findJobById(id)

console.log("Job ---->   " ,job);
console.log("data------>",data);
const req_skill=job.skills;
let skillCount=0
for(let i=0;i<job.skills.length;i++)
{
    if (data?.candidate_Skills?.includes(job.skills[i])) {
        skillCount++;
    }
}
const skillScore= (skillCount * 100)/job.skills.length
let expScore;
if(job.experience< data.candidate_Experience)
{
    expScore=( data.candidate_Experience*100)/job.experience
}
else{ expScore=100;}

let salScore=0;
if(job.salary<data.candidate_salary)
{
    salScore=-1;
}
else {
    salScore=1;
}
const finalScore=(skillScore+expScore+salScore)*100/201
console.log(finalScore);
return Math.floor(finalScore)
}
module.exports = {
    createJob, getJob,
    job_application,
    user_Job_Application,
    findJobById,
    new_job_application,
    getInfoApplication,
    updateApplicationStatus,
    get_all_past_application,
    update_user_applicatin
}