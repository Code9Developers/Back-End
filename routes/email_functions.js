var exports = module.exports = {};
const nodemailer = require('nodemailer');
const dotenv = require('dotenv/config');


/**
 * Email set-up
 * create reusable transporter object using the default SMTP transport
 */

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // secure:true for port 465, secure:false for port 587
    auth: {
        user: 'code9devs@gmail.com',
        pass: process.env.SMTP_PASSWORD
    }
});

/**
 * SEND EMAIL TO NEW EMPLOYEE
 */

exports.NewEmployeeMailer = function (toEmail, empName, empSurname, empId, randPass)
{
    // setup email data with unicode symbols
    let NewEmployeeMail  =
        {
            from: '"Code 9 ☁️" < code9devs@gmail.com >', // sender address
            to: 'code9devs@gmail.com,' + toEmail, // list of receivers
            subject: 'NO REPLY - KPMG Employee Registration Details', // Subject line
            // text:
            html: 'Welcome ' + empName + ' ' + empSurname + '<br/>User name is: '+ '<b>' + empId + '</b>' + '<br/>Your password is: ' + '<b>' + randPass + '</b>'
        };

    // send mail with defined transport object
    transporter.sendMail(NewEmployeeMail, (error, info) =>
    {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
};

/**
 * SEND EMAIL TO EMPLOYEE ASSIGNED TO A PROJECT
 */

exports.NewProjectAllocation = function (toEmail, empName, empSurname, projectName)
{
    // setup email data with unicode symbols
    let NewEmployeeMail  =
        {
            from: '"Code 9 ☁️" < code9devs@gmail.com >', // sender address
            to: 'code9devs@gmail.com,' + toEmail, // list of receivers
            subject: 'NO REPLY - KPMG Project Allocation', // Subject line
            // text:
            // html body
            html: '<b>' + empName + ' '  + empSurname +  '</b> you have been assigned to the <b>"' + projectName + '"</b> project.'
        };

    // send mail with defined transport object
    transporter.sendMail(NewEmployeeMail, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
};

/**
 * SEND EMAIL TO DIRECTOR FOR EMPLOYEE REPLACEMENT
 */

exports.EmployeeReplacement = function (toEmail, managerName, managerSurname, projectName)
{
    // setup email data with unicode symbols
    let NewEmployeeMail  =
        {
            from: '"Code 9 ☁️" < code9devs@gmail.com >', // sender address
            to: 'code9devs@gmail.com,' + toEmail, // list of receivers
            subject: 'NO REPLY - KPMG Employee Replacement', // Subject line
            // text:
            // html body
            html: '<b>' + managerName + ' '  + managerSurname +  '</b> requests a change of employee for the <b>"' + projectName + '"</b> project.'
        };

    // send mail with defined transport object
    transporter.sendMail(NewEmployeeMail, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
};