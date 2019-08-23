const { Expo } = require('expo-server-sdk');
const nodemailer = require("nodemailer");


 async function sendMail(data)
  {  	
      //let ret = JSON.parse(data);
      console.log(data);
      //return ret;
      
        // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  //let testAccount = await nodemailer.createTestAccount();
  
  
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: data.smtp.host,
    //port: data.smtp.port,
    secure: () => {
    	                let s = false; 
                        if(data.smtp.port === '465') s = true; 
                        return s; 
                     }, // true for 465, false for other ports
    auth: {
      user: data.smtp.user, // generated ethereal user
      pass: data.smtp.pass // generated ethereal password
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: data.sn + ' <'+ data.sa + '>', // sender address
    to: data.receivers, // list of receivers
    subject: data.subject, // Subject line
    text: data.message, // plain text body
    html: data.message // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  return {"ug": data.ug,"status": "ok","message": "Message sent! ID: " + info.messageId};
  }
  
   function cleanEmail(em){
	  return em.replace(/[`~!#$%^&*()_|+\-=?;:'",<>\{\}\[\]\\\/]/gi, '');
  }
  
   function isEmpty(obj) {
    let ret = null;
	if(typeof(obj) === 'undefined' || obj === null) ret = false;
	else ret = true;
	return ret;
  }

exports.sendMail = sendMail;
exports.cleanEmail = cleanEmail;
exports.isEmpty = isEmpty;
