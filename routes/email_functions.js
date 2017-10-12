const nodemailer = require('nodemailer');
const dotenv = require('dotenv/config');

/**
 * Page: N/A
 * Functionality: Email set-up: Create reusable transporter object using the default SMTP transport
 * Note:
 * Bug(s): N/A
 *
 * Author(s): Joshua Moodley
 * Date Revised: 12/09/2017 by Joshua Moodley
 * Date Revised: 02/10/2017 by Joshua Moodley
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
 * Page: N/A
 * Functionality: Send email to new employee
 * Note:
 * Bug(s): N/A
 *
 * Author(s): Joshua Moodley
 * Date Revised: 12/09/2017 by Joshua Moodley
 * Date Revised: 02/10/2017 by Joshua Moodley
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
 * Page: N/A
 * Functionality: Send email to employee assigned to a project
 * Note:
 * Bug(s): N/A
 *
 * Author(s): Joshua Moodley
 * Date Revised: 12/09/2017 by Joshua Moodley
 * Date Revised: 24/09/2017 by Joshua Moodley
 * Date Revised: 02/10/2017 by Joshua Moodley
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
 * Page: N/A
 * Functionality: Send email to director for employee replacement approval
 * Note:
 * Bug(s): Possible formatting bug - need the db filled with vaild data to test
 *
 * Author(s): Joshua Moodley
 * Date Revised: 25/09/2017 by Joshua Moodley
 * Date Revised: 02/10/2017 by Joshua Moodley
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

/**
 * Page: N/A
 * Functionality: Send email to employees that they have training
 * Note:
 * Bug(s): Possible formatting bug - need the db filled with vaild data to test
 *
 * Author(s): Joshua Moodley
 * Date Revised: 25/09/2017 by Joshua Moodley
 * Date Revised: 02/10/2017 by Joshua Moodley
 * Date Revised: 07/10/2017 by Joshua Moodley
 */
exports.TraningNotification = function (toEmail, empName, empSurname, startDate, endDate, trainer, trainerEmail, trainerNumber)
{
// setup email data with unicode symbols
    let NewEmployeeMail  =
        {
            from: '"Code 9 ☁️" < code9devs@gmail.com >', // sender address
            to: 'code9devs@gmail.com,' + toEmail, // list of receivers
            subject: 'NO REPLY - KPMG Employee Training', // Subject line
            // text:
            // html body
            html: 'Dear <b>' + empName + ' '  + empSurname +  '</b> please note you have training from the <b>' + startDate + '</b> to the <b>' + endDate + '</b>. ' +
                  'If you have any questions please contact <b>' + trainer + '</b>: ' + trainerEmail + ' or ' +trainerNumber
        };

    // send mail with defined transport object
    transporter.sendMail(NewEmployeeMail, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });

};