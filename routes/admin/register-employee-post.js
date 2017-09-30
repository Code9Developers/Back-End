const express = require('express');
const router = express.Router();
const dbs = require('../../database/dbs');
const generator = require('generate-password');
const email_functions = require('../email_functions');


router.post('/register_employee', function (req, res, next) {
    let rand_password = generator.generate({
        length: 8,
        numbers: true,
        symbols: true,
        uppercase: true
    });

    let today = new Date();


    var _json = req.body.skills;
    _json = _json.split(",");

    var result;
    result = "[";
    for (let i = 0; i < _json.length; i++) {
        if (i == _json.length - 1) {
            result += '{"name":"' + _json[i] + '","rating":' + 0 + ',"counter":' + 0 + '}';
        }
        else {
            result += '{"name":"' + _json[i] + '","rating":' + 0 + ',"counter":' + 0 + '},';
        }
    }

    result += "]";

    let out = JSON.parse(JSON.stringify(result));
    let formatted_skills = JSON.parse(out);
    let employee_id= (req.body.empid).replace(/\s/g, '');
    dbs.encrypt(rand_password, function (enc_pass) {
        var emp = {
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
            skill: formatted_skills,
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
 * Author: Seonin David
 * Note: The past projects that are being displayed are test projects, eventually actual past projects
 * will need to be displayed
 */

router.get('/get_past_projects', function (req, res, next) {
    var past_projects = dbs.findProjects("status", "completed", function (past_projects) {
        res.send(past_projects);
    })
});

module.exports = router;