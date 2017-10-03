/**
 * Created by Seonin David on 2017/08/30.
 */
const express = require('express');
const router = express.Router();
const dbs = require('../../database/dbs');
const algorithm = require('../../database/employee-evaluations');
const generator = require('generate-password');
const async = require("async");


var employees;

/**
 *
 * Page: project_creation.ejs
 * Author(s): Seonin David
 * Functionality:   - Gets all the data for the specific project
 *                  - Creates the project (Calling @insertProject)
 *                  - Assigns employees to projects and projects to employees
 *                  - Sends each employee that has been assigned a notification
 *
 * Bug:             -Make the date changer a function
 *
 */

router.get('/store_emp', function (req, res, next) {
    console.log("hello");
    var el = JSON.parse(req.param("emplArr"));
    var num_empl = parseInt(JSON.parse(req.param("num_empl")));

    console.log(el);
    console.log(num_empl);
    var temp_skill;
    employees = "[";
    for (var key in el) {
        temp_skill = el[key].skill.split(",");
        if (parseInt(key) == (num_empl - 1)) {
            employees += '{"_id":' + el[key]._id + ',"skill":' + temp_skill[0] + '}';
        }
        else {
            employees += '{"_id":' + el[key]._id + ',"skill":' + temp_skill[0] + '},';
        }
    }
    employees += "]";
    var out = JSON.parse(JSON.stringify(employees));
    var employees = JSON.parse(out);
    console.log("EMP: " + employees);
    console.log("EMP: " + out);
});

router.post("/project_creation", function (req, res, next) {


    var rand_id = Math.floor((Math.random() * 100) + 1).toString();
    var project_id = ("kpmg_" + req.body.projectname + rand_id).replace(/\s/g, '');


    //var start_date=(req.body.start_date).replace(/\//g,'-');
    var start_date = (req.body.start_date);
    var s = start_date.split("/");
    var newStartDate = new Date((s[2] + "-" + s[1] + "-" + s[0]).toString());

    var end_date = ((req.body.end_date));
    var temp_end_date = end_date.split("/");
    var new_end_date = new Date((temp_end_date[2] + "-" + temp_end_date[1] + "-" + temp_end_date[0]).toString());

    var today = new Date();
//    var e=employees.split(",");
    // var tts=JSON.parse(JSON.stringify(e));

    var project = {
        _id: project_id,
        name: req.body.projectname,
        description: req.body.projectdescription,
        project_start_date: newStartDate,
        project_end_date: new_end_date,
        owner_name: req.body.projectowner,
        owner_contact: req.body.projectownercontact,
        owner_email: req.body.projectowneremail,
        manager_id: req.session.username,
        employees_assigned: employees,
        project_budget: req.body.budget,
        status: "active"
    };
        dbs.insertProject(project);
    for (var x in employees) {
        //  console.log(employees[x]);
        dbs.assignProject(employees[x], project_id);

        dbs.insertNotification({
            _id: employees[x]._id + project_id,
            user_id: employees[x]._id,
            message: "You have been assigned to a new project.\nProject name:" + req.body.projectname + "\n Project owner: " + req.body.projectowner,
            date_created: today,
            isRead: false
        });
    }
    res.redirect('projects');

});

router.get('/test_algorithm', function (req, res, next) {
    console.log("employee allocation requested");
    console.log("the request number of employees is " + req.param('num_empl'));
    console.log("the request skills of employees is " + req.param('skills'));
    console.log("the request duration of project is " + req.param('duration'));
    console.log("the request budget of project is " + req.param('budget'));

    //dbs.view_employees();
    algorithm.get_unallocated_users(req.param('num_empl'), req.param('skills'), req.param('duration'), req.param('budget'), function (val) {
        var result = JSON.stringify(val);
        employees = JSON.parse(result);
        res.send(result);
    });
    res.contentType('application/json');
});

module.exports = router;