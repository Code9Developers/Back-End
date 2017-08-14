var express = require('express');
var router = express.Router();
var mongoose = require('mongoose') ;
var schemas = require('.././database/schemas.js') ;
var dbs = require('.././database/dbs.js') ;
var test_data = require('.././database/test_data.js') ;
var algorithm = require('.././database/Resource-Alocation-Algorithm.js');
var generator = require('generate-password');

var employees;
function login_check(req, res, next) {
    var result=dbs.authenticate(req.body.username,req.body.password,function (result) {
        console.log("result found");
        if(result)
        {
            return next();
        }
        else
        {
            res.redirect('/');
            console.log("Redirecting to login page");
        }
    });
}

function isAuntenticated(req,res,next) {
    dbs.authenticate(req.session.username,req.body.session,function (result) {
        if(result)
        {
            return next();
        }
        else
        {
            res.redirect('/');
        }
    });
}


router.get('/', function(req, res, next) {
    res.render('login');
});

router.post('/dashboard',function (req,res,next) {
    req.session.username=req.body.username;
    req.session.password=req.body.password;

    var user=dbs.get_user(req.session.username, function(user) {
        if(user.role=="Manager"){
            req.session.name=user.name;
            req.session.surname=user.surname;
            req.session.role=user.role;
            res.render('project_creation',{role:user.role,name:user.name,surname:user.surname});
        }
        else if(user.role=="Admin"){
            res.render('admin',{role:user.role,name:user.name,surname:user.surname});
        }
    });
});

router.get("/project_creation",function (req,res,next) {
    res.render('project_creation',{role:req.session.role,name:req.session.name,surname:req.session.surname});
});

router.post("/project_creation",function (req,res,next) {
    var rand_id=Math.floor((Math.random() * 100) + 1).toString();
    var project_id="kpmg_"+req.body.projectname+rand_id;
    var assigned_emp=[];
    var duration=req.body.start_date+"-"+req.body.end_date;
    var project={
        _id: project_id,
        name: req.body.projectname,
        description: req.body.projectdescription,
        project_duration: duration,
        owner_name: req.body.projectowner,
        owner_contact: req.body.projectownercontact,
        owner_email: req.body.projectowneremail,
        manager_name: req.body.projectmanager,
        manager_contact: req.body.projectmanagercontact,
        manager_email: req.body.projectmanageremail,
        employees_assigned:[employees],
        project_budget:req.body.budget
    };


    dbs.insertProject(project);
    var user=dbs.get_user(req.session.username, function(user) {
        res.render('project_view',{name:user.name,surname:user.surname,owner_name:req.body.projectowner,manager_name:req.body.projectmanager,project_name:req.body.projectname,end_date:req.body.end_date,start_date:req.body.start_date,project_description:req.body.projectdescription,budget:req.body.budget});
    });

});


router.get('/admin',function (req,res,next) {
    res.render("admin");
});

router.post('/register_employee',function (req,res,next) {
    var rand_password = generator.generate({
        length: 10,
        numbers: true,
        symbols: true,
        uppercase: true
    });

    var today = new Date();
    dbs.encrypt("test",function (enc_pass) {
        var emp = {
            _id: req.body.empid,
            name: req.body.firstname,
            surname: req.body.lastname,
            password:enc_pass ,
            password_date: today,
            email: req.body.email,
            role: req.body.role,
            position:req.body.position,
            employment_length: req.body.emp_length,
            skill: [req.body.skills],
            past_projects:[req.body.pastprojects]} ;

        dbs.insertUser(emp) ;
        res.render('index',{valu:JSON.stringify(emp)});
    });
});

router.get("/all_projects",function (req,res,next) {
    var val={
                projects:[
                    {project_name:"test1",num_emp:2,date_created:"23/06/2017",progress:50},
                    {project_name:"test2",num_emp:4,date_created:"23/05/2017",progress:30},
                    {project_name:"test3",num_emp:6,date_created:"23/06/2017",progress:40},
                    {project_name:"test4",num_emp:8,date_created:"23/07/2017",progress:50},
                    {project_name:"test5",num_emp:9,date_created:"24/06/2017",progress:80},
                    {project_name:"test6",num_emp:4,date_created:"13/06/2017",progress:59},
                    {project_name:"test7",num_emp:3,date_created:"15/09/2017",progress:95},
                    {project_name:"test8",num_emp:2,date_created:"20/08/2017",progress:55},
                    {project_name:"test9",num_emp:5,date_created:"28/07/2017",progress:59}

                ]
            };
    var result = JSON.stringify(val);
    employees=JSON.parse(result);
    res.send(result);
});

router.get("/projects",function (req,res,next) {
    res.render('projects');
});

router.get("/logout",function (req,res,next) {
    req.session.reset();
    res.redirect('/');
});


// TEST EMPLOYEE FIND
router.get('/test-find', function(req, res, next) {
    dbs.findEmployee('emp_id_123') ;
});


//FUNCTIONS CREATED FOR TESTING OR TO BYPASS SESSION MANAGEMENT

//Easy access to project creation page
router.get('/test_project_creation', function(req, res, next)
{
    res.render('project_creation');
});

//Creates 5 test emplyees into the database
router.get('/create_test_employees', function(req, res, next)
{
    //dbs.create_test_employees();
    test_data.create_All_test_employees(7, 43);
    res.render('login');
});

//Removes the 5 test employees from the database
router.get('/remove_test_employees', function(req, res, next)
{
    test_data.remove_users();
    res.render('login');
});

router.get('/view_test_employees', function(req, res, next)
{
    test_data.view_users();
    res.render('login');
});

router.get('/test_algorithm', function(req, res, next) {
    console.log("employee allocation requested");
    console.log("the request number of employees is "+req.param('num_empl'));
    console.log("the request skills of employees is "+req.param('skills'));
    console.log("the request duration of project is "+req.param('duration'));
    console.log("the request budget of project is "+req.param('budget'));

    //dbs.view_employees();
    algorithm.get_unallocated_users(req.param('num_empl'),req.param('skills'), req.param('duration'),  req.param('budget'), function(val) {
        var result = JSON.stringify(val);
        employees=JSON.parse(result);
        res.send(result);
    });
    res.contentType('application/json');
});



module.exports = router;
