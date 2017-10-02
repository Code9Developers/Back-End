const express = require('express');
const router = express.Router();
const dbs = require('../../database/dbs');
const algorithm = require('../../database/Resource-Alocation-Algorithm');
const generator = require('generate-password');
const async = require("async");
const email_functions = require('../email_functions');


let employees;
let employee_id_array;
let employee_info_array;

/**
 * Page: project_creation.ejs
 * Functionality:   - Gets all the data for the specific project
 *                  - Creates the project (Calling @insertProject)
 *                  - Assigns employees to projects and projects to employees
 *                  - Sends each employee that has been assigned a notification
 *
 * Note:
 * Bug(s): Make the date changer a function
 *
 * Author(s): author
 * Date Revised: DD/MM/2017 by Seonin David
 * Date Revised: 02/10/2017 by Joshua Moodley
 */
router.get('/store_emp', function (req, res, next)
{
    employee_info_array = JSON.parse(req.param("emplArr"));

    let num_empl = parseInt(JSON.parse(req.param("num_empl")));

    employee_id_array="";
    for (let key in employee_info_array) {
        if (parseInt(key) == (num_empl - 1)) {
            employee_id_array += employee_info_array[key]._id ;
        }
        else {
            employee_id_array += employee_info_array[key]._id+"," ;
        }
    }

    let temp_employees = "[";
    for (let key in employee_info_array) {
        if (parseInt(key) == (num_empl - 1)) {
            temp_employees += '{"_id":"' + employee_info_array[key]._id + '","skill":' + JSON.stringify(employee_info_array[key].skill[0]) + '}';
        }
        else {
            temp_employees += '{"_id":"' + employee_info_array[key]._id + '","skill":' +  JSON.stringify(employee_info_array[key].skill[0]) + '},';
        }
    }
    temp_employees += "]";
    // console.log(employee_id_array);
    let out = JSON.parse(JSON.stringify(temp_employees));
    // console.log("1");
    //console.log("EMP: " + out);
     employees =  JSON.parse(out);
     console.log("EMP: " + JSON.stringify(employees));

});

let status="active";
let ap_id="";
router.get('/replacement_store', function (req, res, next) {
    status="pending";
    let rand_id = Math.floor((Math.random() * 1000) + 1).toString();
    let director_id=req.query.director;

    ap_id = director_id + rand_id;

    let remove_emps = req.query.emp_removed;
    let replace = req.query.emp_replace;
    let reason_for_removal = req.query.reason;
    let project_name = req.query.project_name;

    let _approval_json = {
        _id:ap_id,
        director_id: director_id,
        reason: reason_for_removal,
        employees_removed: remove_emps,
        employees_replaced: replace
    };

    dbs.insert_approval(_approval_json);
    dbs.findUsers("_id",director_id,function (director_details) {
       let dirEmail = director_details[0].email;
       let manName = req.session.name;
       let manSur = req.session.surname;
       let proj = project_name;
       //send email in here

    email_functions.EmployeeReplacement(dirEmail, manName, manSur, proj);

    });

    let today = new Date();
    dbs.insertNotification({
        _id: "noti_"+ap_id+director_id,
        user_id: director_id,
        message: "You have been requested to approve employee changes for a project",
        date_created: today,
        isRead: false
    });

});
router.post("/project_creation", function (req, res, next) {


    let rand_id = Math.floor((Math.random() * 100) + 1).toString();
    let project_id = ("kpmg_" + req.body.projectname + rand_id).replace(/\s/g, '');
    dbs.editApproval("_id",ap_id,"project_id",project_id);

    //var start_date=(req.body.start_date).replace(/\//g,'-');
    let start_date = (req.body.start_date);
    let s = start_date.split("/");
    let newStartDate = new Date((s[2] + "-" + s[1] + "-" + s[0]).toString());

    let end_date = ((req.body.end_date));
    let temp_end_date = end_date.split("/");
    let new_end_date = new Date((temp_end_date[2] + "-" + temp_end_date[1] + "-" + temp_end_date[0]).toString());

    let today = new Date();
    let dis_emp=employee_id_array.split(",");
    //var tts=JSON.parse(JSON.stringify(e));
console.log(JSON.stringify(employees));
    let project = {
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
        status: status
    };
        dbs.insertProject(project);
       // var emp_obj=JSON.parse(employee_id_array);
    for (let x in employees) {
        dbs.assignProject(employees[x], project_id);

        dbs.insertNotification({
            _id: employees[x]._id + project_id,
            user_id: employees[x]._id,
            message: "You have been assigned to a new project.\nProject name:" + req.body.projectname + "\n Project owner: " + req.body.projectowner,
            date_created: today,
            isRead: false
        });

        //You can use the following function to send emails, it gets all the users names
        dbs.findUsers("_id",employees[x]._id,function (user_info)
        {
            email_functions.NewProjectAllocation(user_info[0].email, user_info[0].name, user_info[0].surname, project.name);
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
        let result = JSON.stringify(val);
        employees = JSON.parse(result);
        res.send(result);
    });
    res.contentType('application/json');
});

router.get('/get_replacement', function (req, res, next) {


    algorithm.get_unallocated_replacement_users( function (val) {
        console.log("sgsdgffds");
        console.log(val);
        let result = JSON.stringify(val);
        employees = JSON.parse(result);
        res.send(result);
    });
    res.contentType('application/json');
});



router.get('/get_directors', function (req, res, next) {
    let all_users = dbs.findUsers("role", "Director", function (all_users) {
        res.send(all_users);
    });

});

module.exports = router;