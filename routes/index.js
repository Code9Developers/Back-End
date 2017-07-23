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

router.post('/dashboard',login_check,function (req,res,next) {
    req.session.username=req.body.username;
    console.log("Session username is : "+req.session.username);
    req.session.password=req.body.password;
    console.log("Session password is : "+req.session.password);
    res.render('admin');
});

router.get("/project_creation",function (req,res,next) {
    res.render('project_creation');
});

router.post("/project_creation",function (req,res,next) {
    var rand_id=Math.floor((Math.random() * 100) + 1).toString();
    var project_id="kpmg_"+req.body.projectname+rand_id;

    var project={
        _id: project_id,
        name: req.body.projectname,
        description: req.body.projectdescription,
        project_duration: req.body.duration,
        owner_name: req.body.projectowner,
        owner_contact: req.body.projectownercontact,
        owner_email: req.body.projectowneremail,
        manager_name: req.body.projectmanager,
        manager_contact: req.body.projectmanagercontact,
        manager_email: req.body.projectmanageremail,
        employees_assigned:[]
    };


    dbs.insertProject(project);
    res.render('index',{p:JSON.stringify(project),skills:req.body.skills});

});

router.get('/test-find', function(req, res, next) {
    dbs.findEmployee('emp_id_123') ;
});


router.get('/admin',isAuntenticated,function (req,res,next) {
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

    dbs.encrypt(rand_password,function (enc_pass) {
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
        res.render('index',{valu:JSON.stringify(emp),rand:rand_password});
    });


   //Pass: :-_fBNet/R
    //u: S_D
});

router.get("/logout",function (req,res,next) {
    req.session.reset();
    res.redirect('/');
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

router.get('/view_test_employees', function(req, res, next)
{
    dbs.view_employees();
    res.render('login');
});

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

module.exports = router;
