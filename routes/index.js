const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const schemas = require('.././database/schemas.js');
const dbs = require('.././database/dbs.js');
const test_data = require('.././database/test_data.js');
const algorithm = require('../database/employee-evaluations.js');
const generator = require('generate-password');
const nodemailer = require('nodemailer');


/**
 * Page: N/A
 * Functionality:
 * Note:
 * Bug(s): N/A
 *
 * Author(s): Joshua Moodley
 * Date Revised: 02/10/2017 by Joshua Moodley
 */
router.get("/create_test_data", function (req, res, next) {
    res.render('login');
    test_data.create_test_employees();
    test_data.create_test_projects();
});


//FUNCTIONS CREATED FOR TESTING OR TO BYPASS SESSION MANAGEMENT

router.get('/create_test_notifications', function (req, res, next) {
    test_data.create_test_notifications();
    res.redirect('/');
});

//Easy access to project creation page
router.get('/test_project_creation', function (req, res, next) {
    res.render('project_creation');
});

//Creates 5 test employees into the database
router.get('/create_test_employees', function (req, res, next) {
    test_data.create_test_employees();
    //test_data.create_All_test_employees(1, 30);
    res.render('login');
});

router.get('/create_all_test_employees', function (req, res, next) {
    test_data.create_All_test_employees(30, 300);
    res.render('login');
});

router.get('/remove_all_test_employees', function (req, res, next) {
    test_data.remove_users();
    res.render('login');
});

router.get("/view_all_test_employees", function (req, res, next) {

    var all_users = dbs.findUsers("role", "Employee", function (all_users) {
        res.send(all_users);
    });
});

/* TODO: create a duration variable for testing */
/* TODO: create a skills list for testing */
router.get("/view_all_assigned_test_employees", function (req, res, next) {

    var start_date = new Date();
    start_date.setYear(2017);
    start_date.setMonth(0);
    start_date.setDate(1);

    var end_date = new Date();
    end_date.setYear(2017);
    end_date.setMonth(0);
    end_date.setDate(28);
    algorithm.get_unallocated_users(["Penetration Testing & Vulnerability", "Scanning (Nesus & Qualys)", "Windows / Linux Security"], start_date, end_date, function (all_users) {
        res.send(JSON.stringify(all_users, 0, 2));
    });
});

router.get('/view_test_employees', function(req, res, next)
{
    test_data.view_users();
    res.render('login');
});

router.get('/get_test_employees', function (req, res, next) {
    dbs.findUsers("_id", "emp1", function (res) {
        console.log(res[0]);
    });

    res.render('login');
});

router.get('/display_image', function (req, res, next) {
    dbs.findUsers("_id", "emp1", function (doc) {
        //console.log(doc[0]) ;
        res.contentType(doc[0].image.contentType);
        res.send(doc[0].image.data);
    });
});

router.get('/store_image', function (req, res, next) {
    console.log("user: " + req.session.username);
    console.log("pic: " + req.query.pic);
    dbs.editProfileImage(req.session.username, req.query.pic);
    res.render('profile');
});

router.get('/edit_test_employees', function (req, res, next) {
    dbs.editUserObject("_id", "emp2", "skill", "rating", "10", "rating", 1);

    res.render('login');
});

//Removes the 5 test employees from the database
router.get('/remove_test_employees', function (req, res, next) {
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

router.get('/view_test_projects', function (req, res, next) {
    dbs.findMilestones("__v", 0, function (res) {
        console.log(res);
    });
    res.render('login');
});

router.get('/refresh_project_status', function (req, res, next) {
    dbs.refreshProjectStatus();
    res.render('login');
});

router.get("/create_past_projects", function (req, res, next) {
    //Because of the Math.floor() we get a less managers than planned
    //And and less years for projects than we give
    // test_data.create_past_Projects(1); changed for now

    test_data.create_test_projects();
    res.render('login');
});


// TEST ROUTES

//


router.get("/training", function (req, res, next) {
    res.render('training');
});

module.exports = router;
