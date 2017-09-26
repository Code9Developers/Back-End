/**
 * Created by Seonin David on 2017/08/30.
 */
const express = require('express');
const router = express.Router();
const dbs = require('../../database/dbs');
const algorithm = require('../../database/Resource-Alocation-Algorithm');
const generator = require('generate-password');
const async = require("async");


var employees;
var employee_id_arrray;
let el;

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
    el = JSON.parse(req.param("emplArr"));

    var num_empl = parseInt(JSON.parse(req.param("num_empl")));

employee_id_arrray="";
    for (var key in el) {
        if (parseInt(key) == (num_empl - 1)) {
            employee_id_arrray += el[key]._id ;
        }
        else {
            employee_id_arrray += el[key]._id+"," ;
        }
    }

    var temp_employees = "[";
    for (var key in el) {
        if (parseInt(key) == (num_empl - 1)) {
            temp_employees += '{"_id":"' + el[key]._id + '","skill":' + JSON.stringify(el[key].skill[0]) + '}';
        }
        else {
            temp_employees += '{"_id":"' + el[key]._id + '","skill":' +  JSON.stringify(el[key].skill[0]) + '},';
        }
    }
    temp_employees += "]";
    // console.log(employee_id_arrray);
     var out = JSON.parse(JSON.stringify(temp_employees));
    // console.log("1");
    console.log("EMP: " + out);
     employees = JSON.parse(out);
    console.log("EMP: " + JSON.stringify(employees));

});
let status="active";
let isReplacement=false;
let ap_id;
router.get('/replacement_store', function (req, res, next) {
    status="pending";
    isReplacement=true;
    let rand_id = Math.floor((Math.random() * 100) + 1).toString();
    let director_id=req.query.director;
    ap_id=director_id+rand_id;
    var remove_emps=req.query.emp_removed;
    var replace=req.query.emp_replace;
    var reason_for_removal=req.query.reason;

    var _aprroval_json={
        _id:ap_id,
        director_id: director_id,
        reason: reason_for_removal,
        employees_removed: remove_emps,
        employees_replaced: replace
    }

    dbs.insert_approval(_aprroval_json);
    var today = new Date();
    dbs.insertNotification({
        _id: "noti_"+ap_id+director_id,
        user_id: director_id,
        message: "You have been requested to approve employee changes for a project",
        date_created: today,
        isRead: false
    });

});
router.post("/project_creation", function (req, res, next) {
    var rand_id = Math.floor((Math.random() * 10) + 1).toString();
    var project_id = ("kpmg_" + req.body.projectname + rand_id).replace(/\s/g, '');
    if(isReplacement===true){
        dbs.editApproval("_id",ap_id,"project_id",project_id);
    }


    //var start_date=(req.body.start_date).replace(/\//g,'-');
    var start_date = (req.body.start_date);
    var s = start_date.split("/");
    var newStartDate = new Date((s[2] + "-" + s[1] + "-" + s[0]).toString());

    var end_date = ((req.body.end_date));
    var temp_end_date = end_date.split("/");
    var new_end_date = new Date((temp_end_date[2] + "-" + temp_end_date[1] + "-" + temp_end_date[0]).toString());

    var today = new Date();
    var dis_emp=employee_id_arrray.split(",");
    //var tts=JSON.parse(JSON.stringify(e));
console.log(JSON.stringify(employees));
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
        status: status
    };
        dbs.insertProject(project);
       // var emp_obj=JSON.parse(employee_id_arrray);
    for (var x in employees) {
        console.log(employees[x]);
        console.log(x);
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

router.get('/get_replacement', function (req, res, next) {


    algorithm.get_unallocated_replacement_users( function (val) {
        var result = JSON.stringify(val);
        employees = JSON.parse(result);
        res.send(result);
    });
    res.contentType('application/json');
});



router.get('/get_directors', function (req, res, next) {
    var all_users = dbs.findUsers("role", "Director", function (all_users) {
        res.send(all_users);
    });

});
module.exports = router;