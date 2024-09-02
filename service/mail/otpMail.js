
const nodemailer = require('nodemailer');
require('dotenv').config();



const otpTemplate=(candidateName,otp)=>`
Dear ${candidateName},

Your One Time Password (OTP) is:
${otp}

Your OTP will expire in 15 minutes.

Warm Regards,
ABCD

Visit us at www.ABCD.com`


const sendOtp = ((body) => {
    const {name,email,otp}=body
    let subject =`One Time Password (OTP)`
    console.log(name,email,otp);
    
   
  console.log(subject);
  
    const transporter = nodemailer.createTransport({
        service: "gmail",
        secure: true,
        port: 465,
        auth: {
            user: process.env.EMAIL_ID,
            pass: process.env.EMAIL_PASS
        }
    });
  
    const mailOptions = {
        from: process.env.EMAIL_ID,
        to: email,
        subject:subject ,
        text:otpTemplate(name,otp)
    }

  
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email:", error);
            return;
        }
        console.log("Email sent successfully 1:", info.response);
        return info.response;
    });
  
   
  });
  
  
  module.exports={sendOtp}