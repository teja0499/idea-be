const User=require('../models/User');
const { sendOtp } = require('./mail/otpMail');

const registerUser=async (userData)=>{
    const existingUserByMobile = await User.findOne({ mobileNumber: userData.mobileNumber });
    if (existingUserByMobile) {
        throw new Error('Mobile Number Already exists');
    }

    const existingUserByEmail = await User.findOne({ email: userData.email });
    if (existingUserByEmail) {
        throw new Error('Email Already exists');
    }
    const user=await User.create(userData)
    return user;
}

const login=async (email,password)=>{
    const loginData=await User.findOne({
        email:email,
        password:password
    })
    if(!loginData)
    {
        throw new Error('Invalid Credential');
    }
    return loginData;
}

const userFindById=async (id)=>{
   const data=await User.findById(id);
   return data;
}

const get_otp=async(email)=>{
    const user=await User.findOne({email:email});
    if(!user)
    {
        throw new Error('User Not Found');
    }
    const otp=Math.floor(100000 + Math.random() * 900000)
    const user1=await User.findByIdAndUpdate(user._id,{otp:otp},{ new: true })
    console.log(user1);
    
    sendOtp(user1)
    setTimeout(async ()=>{
        await User.findByIdAndUpdate(user._id, {
            $unset: { otp: ""} 
          });
          console.log("otp remove",otp);
          
    },9000000)
    console.log("otp send",otp);
}

const check_otp=async (email,otp)=>{
    const  user=await User.findOne({email:email})
    if(!user.otp)
    {
        throw new Error('OTP Expired');
    }
    if(otp!=user.otp)
    {
        throw new Error('Invalid OTP');
    }    
}

const reset_password=async(email,password)=>{
    // await User.findOneAndUpdate(id,{password:password});
    await User.findOneAndUpdate(
        { email: email }, 
        { password: password }, 
        { new: true }
    )
}


module.exports={login,registerUser,userFindById,get_otp,check_otp,reset_password}