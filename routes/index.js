var express = require('express');
var router = express.Router();
var mongoose = require('mongoose') ;
var schemas = require('.././database/schemas.js') ;
var dbs = require('.././database/dbs.js') ;
var algorithm = require('.././database/Resource-Alocation-Algorithm.js');
var generator = require('generate-password');


function login_check(req, res, next) {
    console.log("checking authenticate");
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

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('login');
});

router.post('/dashboard',function (req,res,next) {
    req.session.username=req.body.username;
    req.session.password=req.body.password;

    var user=dbs.get_user(req.session.username, function(user) {
        if(user.role=="Manager"){
            res.render('project_creation',{role:user.role,name:user.name,surname:user.surname});
        }
        else if(user.role=="Admin"){
            res.render('admin',{role:user.role,name:user.name,surname:user.surname});
        }
    });
});

router.get("/project_creation",function (req,res,next) {
    res.render('project_creation');
});

router.post("/project_creation",function (req,res,next) {
    var rand_id=Math.floor((Math.random() * 100) + 1).toString();
    var project_id="kpmg_"+req.body.projectname+rand_id;
    var datediff=require("datediff");
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
        employees_assigned:[]
    };

    var project_length=datediff
    dbs.insertProject(project);
    res.render('project_view',{owner_name:owner_name,manager_name:manager_name,project_name:name});



});

/* NOTE: Add authenticate*/
router.post("/new_project",function (req,res,next) {
    console.log("Attempting to create a new project");
    console.log(req.body);

    /*now i need to add it to the db*/
    dbs.insertProject(req.body);
});

/* A function to get all current projects for a user
 NOTE: still add authenticate*/
router.post("/view_projects",function (req,res,next) {
    console.log("Attempting to view all projects for the current session user");
    console.log("current user session is :"+req.session.username);

    //get all the current projects for the user from the user db
    //now search the projects db for the projects duration and description
});

router.get('/test-find', function(req, res, next) {
    dbs.findEmployee('emp_id_123') ;
});


router.get('/admin',function (req,res,next) {
    res.render("admin");
});

/* NOTE: Add authenticate for teh current admin*/
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
            employment_length: req.body.emp_length,
            skill: [req.body.skills],
            past_projects:[req.body.pastprojects]} ;

        dbs.insertUser(emp) ;
        res.render('index',{valu:JSON.stringify(emp)});
    });
});

router.get("/logout",function (req,res,next) {
    req.session.reset();
    res.redirect('/');
});

/* NOTE: Add authenticate*/
router.get("/calendar",function (req,res,next) {
    res.render('calendar');
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
    dbs.create_test_employees();
    res.render('login');
});

//Removes the 5 test employees from the database
router.get('/remove_test_employees', function(req, res, next)
{
    dbs.remove_test_employees();
    res.render('login');
});

//Displays all users currently in the db to the console
router.get('/view_test_employees', function(req, res, next)
{
    dbs.view_employees();
    res.render('login');
});

/* NOTE: Add authenticate*/
router.get('/test_algorithm', function(req, res, next) {
    console.log("employee allocation requested");
    console.log("the request url is "+req.url);

    dbs.view_employees();
    algorithm.get_unallocated_users(2, function(val) {
        var result = JSON.stringify(val);
        res.send(result);
    });
    res.contentType('application/json');
});

/* NOTE: Add authenticate*/
router.post('/test_algorithm', function(req, res, next) {
    console.log("employee allocation requested");
    console.log("the request url is "+req.url);

    dbs.view_employees();
    algorithm.get_unallocated_users(2, function(val) {
        var result = JSON.stringify(val);
        res.send(result);
    });
    res.contentType('application/json');
});

module.exports = router;
