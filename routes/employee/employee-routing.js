/**
 * Created by Seonin David on 2017/08/30.
 */

const express = require('express');
const router = express.Router();

// Calendar Page
router.get("/calendar", function (req,res, next) {
    res.render('calendar');
});

// Profile
router.get("/profile", function (req,res, next) {
    res.render('profile');
});

//Employees Dashboard
router.get("/user_dashboard", function (req,res, next){
    res.render('index_dashboard');
});

module.exports = router;