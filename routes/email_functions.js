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
            // plain text body
            // text: 'Welcome ' + emp.name + ' ' + emp.surname + '\nYour password is: ' + rand_password
            // html body
            html: 'Welcome ' + empName + ' ' + empSurname + '<br/>User name is: '+ '<b>' + empId + '</b>' + '<br/>Your password is: ' + '<b>' + randPass + '</b>'
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
 * SEND EMAIL TO EMPLOYEE ASSIGNED TO A PROJECT
 */

exports.NewProjectAllocation = function (toEmails, empName, empSurname, projectName)
{
    // setup email data with unicode symbols
    // TODO Email Structure
    let NewEmployeeMail  =
        {
            from: '"Code 9 ☁️" < code9devs@gmail.com >', // sender address
            to: 'code9devs@gmail.com,' + toEmail, // list of receivers
            subject: 'NO REPLY - KPMG Project Allocation', // Subject line
            // plain text body
            // text: 'Welcome ' + emp.name + ' ' + emp.surname + '\nYour password is: ' + rand_password
            // html body
            html: 'Welcome ' + empName + ' ' + empSurname + '<br/>User name is: '+ '<b>' + empId + '</b>' + '<br/>Your password is: ' + '<b>' + randPass + '</b>'
        };

    // send mail with defined transport object
    transporter.sendMail(NewEmployeeMail, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
};
