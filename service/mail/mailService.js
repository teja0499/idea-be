// const nodemailer = require('nodemailer');
require('dotenv').config();



const candidateSelectionEmailTemplate = (candidateName, jobTitle) => `
  Hi ${candidateName},

  Congratulations! You have been selected for the position of ${jobTitle}.

  Best regards,
  ABC
`;

const hrSelectionEmailTemplate = (hrName, candidateName, jobTitle) => `
  Hi ${hrName},

  The candidate ${candidateName} has been selected for the position of ${jobTitle}.

  Best regards,
  ABC
`;

const candidateRejectionEmailTemplate = (candidateName, reason, title) => `
  Hi ${candidateName},

  We regret to inform you that your application for the position of ${title} has been unsuccessful.

  Reason for rejection: ${reason}

  We appreciate your interest in our company and encourage you to apply for future opportunities.

  Best regards,
  ABC
`;

const hrRejectionEmailTemplate = (hrName, candidateName, reason, title) => `
  Hi ${hrName},

  The candidate ${candidateName} has been rejected for ${title}.
  Reason: ${reason}

  Best regards,
  ABC
`;

// const nodemailer = require('nodemailer');


// // Define the sendmail function properly
// const sendmail = (req, res) => {
//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     secure: true,
//     port: 465,
//     auth: {
//       user: 'umanagare10@gmail.com',
//       pass: 'tcrz lycp unmj ufgn' // Replace this with your actual password or an app-specific password
//     }
//   });

//   const mailOptions = {
//     from: 'umanagare10@gmail.com',
//     to: 'tejasnagare99@gmail.com',
//     subject: 'Node.js Mail Testing!',
//     text: 'Hello, this is a test email!'
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.error('Error sending email:', error);
//       res.status(500).send('Error sending email');
//     } else {
//       console.log('Email sent:', info.response);
//       res.send('Email sent successfully!');
//     }
//   });
// };

// module.exports = { sendmail };

// const sendSelectionEmails = async (candidateEmail, candidateName, jobTitle, hrEmail, hrName) => {

// }

// const sendRejectionEmails = async (candidateEmail, candidateName, hrEmail, hrName, title, reason) =>
// {

// }

// module.exports = { sendSelectionEmails, sendRejectionEmails };


const http = require("http");
const nodemailer = require("nodemailer");

const sendmail =((email,  name, title, reason) => {
    const auth = nodemailer.createTransport({
        service: "gmail",
        secure : true,
        port : 465,
        auth: {
            user: "umanagare10@gmail.com",
            pass: "tcrz lycp unmj ufgn"

        }
    });

    let candidate_rec;
    let hr_rec;
    if(reason.length!==0)
    {
      candidate_rec = {
        from : "umanagare10@gmail.com",
        to : email,
        subject : "Node Js Mail Testing!",
        text : candidateSelectionEmailTemplate(name,title)
    };

    hr_rec = {
      from : "umanagare10@gmail.com",
      to : email,
      subject : "Node Js Mail Testing!",
      text : candidateSelectionEmailTemplate(name,title)
  };
  
  
  }

    auth.sendMail(receiver, (error, emailResponse) => {
        if(error)
        throw error;
        console.log("success!");
        response.end();
    });
    
});

module.exports={sendmail}
