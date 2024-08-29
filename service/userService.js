const User=require('../models/User')

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


module.exports={login,registerUser,userFindById}