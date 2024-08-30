const nodemailer = require('nodemailer');
require('dotenv').config();



const candidateSelectionEmailTemplate = (candidateName, jobTitle,adminName) => `
  Hi ${candidateName},

  Congratulations! You have been selected for the position of ${jobTitle}.

  Best regards,
  ${adminName}
`;

const hrSelectionEmailTemplate = (adminName, candidateName, jobTitle) => `
  Hi ${adminName},

  The candidate ${candidateName} has been selected for the position of ${jobTitle}.

  Best regards,
  ABC
`;

const candidateRejectionEmailTemplate = (candidateName, reason, title,adminName) => `
  Hi ${candidateName},

  We regret to inform you that your application for the position of ${title} has been unsuccessful.

  Reason for rejection: ${reason}

  We appreciate your interest in our company and encourage you to apply for future opportunities.

  Best regards,
  ${adminName}
`;

const hrRejectionEmailTemplate = (adminName, candidateName, reason, title) => 
  `
  Hi ${adminName},

  The candidate ${candidateName} has been rejected for ${title}.
  Reason: ${reason}

  Best regards,
  ABC
`;


const sendMail = ((body) => {
  const {adminName,admin_mail,status,candidateName,candidatEmail,reason,jobTitle}=body
  let subject =`Selection of ${candidateName} for ${jobTitle}`
  let subject2
if(status !== 'select')
{
  subject= `Rejection of ${candidateName} for ${jobTitle}`
}
console.log(subject);

  const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      port: 465,
      auth: {
          user: "umanagare10@gmail.com",
          pass: "tcrz lycp unmj ufgn"
      }
  });

  const mailOptions1 = {
      from: process.env.EMAIL_ID,
      to: candidatEmail,
      subject:subject ,
      text:status === 'select'? candidateSelectionEmailTemplate(candidateName,jobTitle,adminName):candidateRejectionEmailTemplate(candidateName,reason,jobTitle,adminName)
  };
  // 

  transporter.sendMail(mailOptions1, (error, info) => {
      if (error) {
          console.error("Error sending email:", error);
          return;
      }
      console.log("Email sent successfully 1:", info.response);
      return info.response;
  });

  const mailOptions2 = {
    from: process.env.EMAIL_ID,
    to: admin_mail,
    subject:subject ,
    text:status === 'select'? hrSelectionEmailTemplate(adminName,candidateName,jobTitle):hrRejectionEmailTemplate(adminName, candidateName, reason, jobTitle)
};

transporter.sendMail(mailOptions2, (error, info) => {
    if (error) {
        console.error("Error sending email:", error);
        return;
    }
    console.log("Email sent successfully:", info.response);
    return info.response;
});
});


module.exports={sendMail}
