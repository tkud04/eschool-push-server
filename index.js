'use strict';

const config = require('./config');
const Helpers = require('./Helpers');
const { spawn } = require('child_process');
const express = require('express');
const path = require('path');
const request = require('request');
const PORT = process.env.PORT || 5000;
const mysqlURL = "https://powerful-tundra-70186.herokuapp.com/";

let result = '';  

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => {
  /**let dt = {receivers: "safebets.disenado@gmail.com, aquarius4tkud@yahoo.com",
                 subject: "Designer", 
                 text_body: "NodeMailer says HI\nWelcome to MailNinja, our first bulk SMTP mailer built with NodeJS and of course Laravel 5 :)",
                 html_body: "<h3>NodeMailer says HI</h3><p>Welcome to MailNinja, our first bulk SMTP mailer built with NodeJS and of course Laravel 5 :)</p>"
                };
	**/
              
  let result = {"ug": req.query.ug,"status": "error","message": "Unknown"};
  
    if(Helpers.isEmpty(req.query)){
	
	 result.message = "Object missing (request body is empty)";
	 res.json(result);
    }
    else{
		dt = {receivers: Helpers.cleanEmail(req.query.receivers),
                    subject: req.query.subject,
                    message: decodeURI(req.query.message),
                    sn: req.query.sn,
                    sa: req.query.sa,
                    ug: req.query.ug,
                    smtp: {
                    	  host: req.query.host,
                          port: req.query.port,
                          user: req.query.user,
                          pass: req.query.pass                         
                          //enc: req.query.enc,
                          //auth: req.query.auth
                      }
                   };
		
      Helpers.sendMail(dt).then((ret) => {console.log(ret); res.json(ret)}).catch((err) => {console.log(err); result.message = err; res.json(result)});
      //res.render('index',{result: result});  
    }
  })
  .get('/push-token', (req, res) => {     
     let result = {"status": "error","message": "Unknown"};  
    if(Helpers.isEmpty(req.query)){
	
	 result.message = "Object missing (request body is empty)";
	 res.json(result);
    }
	else{
		 au = req.query.au;
		 tk = req.query.tk;
		console.log("au: " + au + "\ntk: " + tk);
		let uu = mysqlURL + "push-token?student_id=" + au + "&token=" + tk;
		//save to mysqlURL
		request(uu, function (error, response, body) {
        console.error('error:', error); // Print the error if one occurred
		
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.
		res.send(body);
     });
		
	}
  })
  .get('/db-test', (req, res) => {     
     //Helpers.testDB();
	 request(mysqlURL, function (error, response, body) {
        console.error('error:', error); // Print the error if one occurred
		
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.
		res.send(body);
     });
		
  })
  
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));
  
  