const express = require('express');
const router = express.Router();


/**
 * Page:
 * Functionality: Employee Routing: Calendar Page, Profile Page, Employee Dashboard
 * Note:
 * Bug(s): N/A
 *
 * Author(s): author
 * Date Revised: DD/MM/2017 by author
 * Date Revised: 02/10/2017 by Joshua Moodley
 */

// Calendar Page
router.get("/calendar", function (req, res, next) {
    res.render('calendar');
});

// Profile
router.get("/profile", function (req, res, next) {
    res.render('profile');
});

//Employees Dashboard
router.get("/user_dashboard", function (req, res, next) {
    res.render('index_dashboard');
});

router.get("/manager_calendar", function (req, res, next) {
       res.render('manage_calendar');
});

module.exports = router;