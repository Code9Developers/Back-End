const express = require('express');
const router = express.Router();
const mongoose = require('mongoose') ;
const schemas = require('.././database/schemas.js') ;
const dbs = require('.././database/dbs.js') ;
const test_data = require('.././database/test_data.js') ;
const algorithm = require('.././database/Resource-Alocation-Algorithm.js');
const generator = require('generate-password');
const nodemailer = require('nodemailer');


router.get("/create_test_data", function (req,res, next){
    res.render('login');
    test_data.create_test_employees();
    //test_data.create_test_projects();
});






//FUNCTIONS CREATED FOR TESTING OR TO BYPASS SESSION MANAGEMENT

router.get('/create_test_notifications', function(req, res, next)
{
    test_data.create_test_notifications();
    res.redirect('/');
});

//Easy access to project creation page
router.get('/test_project_creation', function(req, res, next)
{
    res.render('project_creation');
});

//Creates 5 test emplyees into the database
router.get('/create_test_employees', function(req, res, next)
{
    test_data.create_test_employees();
    //test_data.create_All_test_employees(1, 30);
    res.render('login');
});

router.get('/get_test_employees', function(req, res, next)
{
    dbs.findUsers("_id", "emp1", function(res) {
		console.log(res[0]) ;
	});
	
    res.render('login');
});

router.get('/display_image', function(req, res, next)
{
    dbs.findUsers("_id", "emp1", function(doc) {
		//console.log(doc[0]) ;
		res.contentType(doc[0].image.contentType);
        res.send(doc[0].image.data);
	});
});

router.get('/store_image', function(req, res, next)
{
	console.log("user: " + req.session.username) ;
	console.log("pic: " + req.query.pic) ;
	dbs.editProfileImage(req.session.username, req.query.pic) ;
    res.render('profile');
});

router.get('/edit_test_employees', function(req, res, next)
{
	dbs.editUserObject("_id", "emp2", "skill", "rating", "10", "rating", 1) ;
	
    res.render('login');
});

//Removes the 5 test employees from the database
 router.get('/remove_test_employees', function(req, res, next)
 {
     test_data.remove_users();
     res.render('login');
 });
//
//
// router.get('/remove_test_projects', function(req, res, next)
// {
//     test_data.remove_projects();
//     res.render('login');
// });

// router.get('/remove_test_notifications', function(req, res, next)
// {
//     test_data.remove_notifications();
//     res.render('login');
// });
//
// router.get('/remove_test_tasks', function(req, res, next)
// {
//     test_data.remove_tasks();
//     res.render('login');
// });

// router.get('/view_test_employees', function(req, res, next)
// {
//     test_data.view_users();
//     res.render('login');
// });

router.get('/view_test_projects', function(req, res, next)
{
    dbs.findMilestones("__v", 0, function(res) {
		console.log(res) ;
	});
	res.render('login') ;
});

router.get('/refresh_project_status', function(req, res, next)
{
    dbs.refreshProjectStatus();
    res.render('login');
});

router.get("/create_past_projects",function (req,res,next) {
    //Because of the Math.floor() we get a less managers than planned
    //And and less years for projects than we give
    test_data.create_past_Projects(1);
    res.redirect('login');
});




module.exports = router;
