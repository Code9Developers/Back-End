const express = require('express');
const router = express.Router();
const dbs = require('../../database/dbs');
const algorithm = require('../../database/employee-evaluations');
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

let rep_data;
let budget;
router.get('/get_json_data', function (req, res, next) {
    let position_array=req.query.position_arr;
    let amount_array=req.query.amount_arr;
    console.log(position_array);
    console.log(amount_array);
    let all_skills=(req.query.skills).split(",");
    let arr_skills=[];
    for(let x in all_skills){
        arr_skills[x]=all_skills[x];
    }

    algorithm.get_unallocated_users(arr_skills,req.query.start_date,req.query.end_date, function (data) {
        let result = JSON.stringify(data[0]);
         rep_data = JSON.stringify(data[1]);
        let _obj = JSON.parse(result);
        let emp_data=[];
        for(let j in _obj){
            emp_data[j]=_obj[j];
        }
        let _json = {data:emp_data};
        res.send(_json);
    });
    res.contentType('application/json');
});

router.get('/get_replacement', function (req, res, next) {

    // console.log(rep_data);
    // let result = JSON.stringify(rep_data);
    let _obj = JSON.parse(rep_data);
    let emp_data=[];
    let c=0;
    for(let j in _obj){
        let single_obj=_obj[j];
        for(let i in single_obj){
            emp_data[c]=single_obj[i];
            c++
        }
    }
    let _json = {data:emp_data};
    console.log(_json);
    res.send(_json);
    //res.contentType('application/json');
});


router.get('/store_emp', function (req, res, next)
{
    employee_info_array = JSON.parse(req.query.emplArr);
    employee_id_array=[];
    for (let key in employee_info_array) {
        employee_id_array[key]=employee_info_array[key]._id;
    }
    let temp_emp=[];
        dbs.get_all_users_skill(employee_id_array,function (skills) {
            for(let x in skills){
                for(let y in skills)
                {
                    let user_id=skills[y]._id._id;
                    let user_skill=skills[y]._id.skill;
                    if(user_id==employee_info_array[x]._id){
                        for(let i in user_skill){
                            if(user_skill[i].name==employee_info_array[x].skill[0]){
                                temp_emp[x]={_id:user_id,skill:JSON.stringify(user_skill[i])};
                            }
                        }
                    }
                }
            }
            console.log(temp_emp);
            employees=temp_emp;
            res.send(JSON.stringify(employees));
        });

});

let status="active";
let ap_id="";
let needs_approval=false;
router.get('/replacement_store', function (req, res, next) {
    status="pending";
    needs_approval=true;
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
    if(needs_approval==true){
        dbs.editApproval("_id",ap_id,"project_id",project_id);
    }
    let start_date = (req.body.start_date);
    let s = start_date.split("/");
    let newStartDate = new Date((s[2] + "-" + s[1] + "-" + s[0]).toString());

    let end_date = ((req.body.end_date));
    let temp_end_date = end_date.split("/");
    let new_end_date = new Date((temp_end_date[2] + "-" + temp_end_date[1] + "-" + temp_end_date[0]).toString());

    let today = new Date();
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
        project_budget: 0,
        status: status,
        project_rating:0,
        reviewed:"No"
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

    res.send('projects');

});

router.get('/get_directors', function (req, res, next) {
    let all_users = dbs.findUsers("role", "Director", function (all_users) {
        res.send(all_users);
    });

});


module.exports = router;