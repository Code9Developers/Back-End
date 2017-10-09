const express = require('express');
const router = express.Router();
const dbs = require('../../database/dbs');
const generator = require('generate-password');
const email_functions = require('../email_functions');

/**
 * Page:
 * Functionality: GET Request
 * Note:
 * Bug(s): N/A
 *
 * Author(s): Seonin David
 * Date Revised: DD/MM/2017 by author
 * Date Revised: 02/10/2017 by Joshua Moodley
 */
router.post('/register_employee', function (req, res, next) {
    let rand_password = generator.generate({
        length: 4,
        numbers: true,
        symbols: true,
        uppercase: true
    });

    let today = new Date();

    let result=[];
    let _json = req.body.skills;
    for(let i in _json){
        result[i]={name:_json[i],rating:0,counter:0}
    }


    let employee_id= (req.body.empid).replace(/\s/g, '');
    dbs.encrypt(rand_password, function (enc_pass) {
        let emp = {
            _id:employee_id,
            name: req.body.firstname,
            surname: req.body.lastname,
            password: enc_pass,
            password_date: today,
            contact: req.body.contact,
            email: req.body.email,
            role: req.body.role,
            position: req.body.positionlist,
            employment_length: req.body.emplength,
            skill: result,
            past_projects: req.body.pastprojects
        };

        // Insert User into DB
        dbs.insertUser(emp);

        // Send email
        email_functions.NewEmployeeMailer(emp.email, emp.name, emp.surname, emp._id, rand_password);

        res.redirect('employees');
    });
});

/**
 * Page: admin.ejs
 * Functionality: Display past projects on admin page
 * Note: The past projects that are being displayed are test projects, eventually actual past projects will need to be displayed
 * Bug(s): N/A
 *
 * Author(s): Seonin David
 * Date Revised: DD/MM/2017 by author
 * Date Revised: 02/10/2017 by Joshua Moodley
 */

router.get('/get_past_projects', function (req, res, next) {
    let  past_projects = dbs.findProjects("status", "completed", function (past_projects) {
        res.send(past_projects);
    })
});

module.exports = router;