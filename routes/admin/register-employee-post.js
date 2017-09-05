/**
 * Created by Seonin David on 2017/08/30.
 */
/**
 -----------------------------------------------------------------------------------------------------------------------
 *  Name: SMTP
 *  Author: Joshua Moodley
 *  Date: 21 Aug 2017 R1
 -----------------------------------------------------------------------------------------------------------------------
 */
const express = require('express');
const router = express.Router();
const dbs = require('../../database/dbs') ;
const generator = require('generate-password');
const nodemailer = require('nodemailer');


router.post('/register_employee',function (req,res,next) {
    var rand_password = generator.generate({
        length: 8,
        numbers: true,
        symbols: true,
        uppercase: true
    });

    var today = new Date();
    dbs.encrypt(rand_password, function (enc_pass) {
        var emp = {
            _id: req.body.empid,
            name: req.body.firstname,
            surname: req.body.lastname,
            password:enc_pass ,
            password_date: today,
            contact:req.body.contact,
            email: req.body.email,
            role: req.body.role,
            position:req.body.positionlist,
            employment_length: req.body.emplength,
            skill: [req.body.skills],
            past_projects:[req.body.pastprojects]};

        dbs.insertUser(emp);

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, // secure:true for port 465, secure:false for port 587
            auth: {
                user: 'code9devs@gmail.com',
                pass: process.env.SMTP_PASSWORD
            }
        });

        // setup email data with unicode symbols
        let mailOptions  =
            {
                from: '"Code 9 👻👻👻 BOO!!" < code9devs@gmail.com >', // sender address
                to: 'code9devs@gmail.com,' + emp.email, // list of receivers
                subject: 'KPMG Employee Registration Details - NO REPLY', // Subject line
                // plain text body
                // text: 'Welcome ' + emp.name + ' ' + emp.surname + '\nYour password is: ' + rand_password
                // html body
                html: 'Welcome ' + emp.name + ' ' + emp.surname + '<br/>User name is: '+ emp._id +'<br/>Your password is: ' + '<b>' +rand_password + '</b>'
            };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error)
            {
                return console.log(error);
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
        });

        res.redirect('employees');
    });
});

/**
 * Page: admin.ejs
 * Functionality: Display past projects on admin page
 * Author: Seonin David
 * Note: The past projects that are being displayed are test projects, eventually actual past projects
 * will need to be displayed
 */

router.get('/get_past_projects', function(req, res, next)
{
    var past_projects=dbs.findProjects("status","completed",function (past_projects) {
        res.send(past_projects);
    })
});

module.exports = router;