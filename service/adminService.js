const Admin = require('../models/Admin');

const registerAdmin = async (adminData) => {
    // const existingAdminByMobile = await Admin.findOne({ mobileNumber: adminData.mobileNumber });
    // if (existingAdminByMobile) {
    //     throw new Error('Mobile Number Already exists');
    // }

    const existingAdminByEmail = await Admin.findOne({ email: adminData.email });
    if (existingAdminByEmail) {
        throw new Error('Email Already exists');
    }
    return await Admin.create(adminData)
};

const login = async (email, password) => {

    console.log("login" ,email,password);
    const admin = await Admin.findOne({ email, password });
    if (!admin) {
      throw new Error('Credential mismatch');
    }
    console.log(admin);
    
    return admin;
};

module.exports = { registerAdmin, login };
