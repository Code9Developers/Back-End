var express = require('express');
var router = express.Router();
var mongoose = require('mongoose') ;
var schemas = require('.././database/schemas.js') ;
var dbs = require('.././database/dbs.js') ;

function isAuthenticated(req, res, next) {


    if (dbs.authenticate(req.body.username,req.body.password))
    {
        return next();
    }
    res.redirect('/');
}
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('login');
});

router.post('/dashboard',isAuthenticated,function (req,res,next) {
    res.render('index');
});

router.get("/project_creation",function (req,res,next) {
    res.render('project_creation');
});

router.post("/project_creation",function (req,res,next) {
    res.render('index',{projectname:req.body.projectname,projectdescription:req.body.projectdescription,skills:req.body.skills});

});
//example for using mongodb to insert
router.get('/test-insert', function(req, res, next) {
    var value = {_id: 'emp_id_123', name: 'John', surname: 'Doe', password: 'BushDid911', password_date: '21-07-2017', email: 'johndoe@kpmg.com', role: 'employee', employment_length: '3', skill: ['MS Office', 'Python']} ;

    dbs.insertEmployee(value) ;
});

router.get('/test-find', function(req, res, next) {
    dbs.findEmployee('emp_id_123') ;
});

router.get('/admin',function (req,res,next) {
    res.render("admin");
});

router.post('/register_employee',function (req,res,next) {
    var today = new Date();
    //var enc_pass=dbs.encrypt(req.body.password);
    var emp = {_id: req.body.empid, name: req.body.firstname, surname: req.body.lastname, password:req.body.password , password_date: today, email: req.body.email, role: req.body.role, employment_length: req.body.emp_length, skill: [req.body.skills],past_projects:[req.body.pastprojects]} ;

   // dbs.insertEmployee(emp) ;
    res.render('index',{valu:JSON.stringify(value)});
});
module.exports = router;
