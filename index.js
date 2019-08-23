'use strict';

import {config} from './config';
import Helpers from './Helpers';
import { spawn } from 'child_process';
import {express} from 'express';
import {path} from 'path';
const PORT = process.env.PORT || 5000;
let result = '';  

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => {
  let dt = {receivers: "safebets.disenado@gmail.com, aquarius4tkud@yahoo.com",
                 subject: "Designer", 
                 text_body: "NodeMailer says HI\nWelcome to MailNinja, our first bulk SMTP mailer built with NodeJS and of course Laravel 5 :)",
                 html_body: "<h3>NodeMailer says HI</h3><p>Welcome to MailNinja, our first bulk SMTP mailer built with NodeJS and of course Laravel 5 :)</p>"
                };
              
        let dt = {receivers: Helpers.cleanEmail(req.query.receivers),
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
  let result = {"ug": req.query.ug,"status": "error","message": "Unknown"};
  
  Helpers.sendMail(dt).then((ret) => {console.log(ret); res.json(ret)}).catch((err) => {console.log(err); result.message = err; res.json(result)});
   //res.render('index',{result: result});  
  })
  
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));
  
  