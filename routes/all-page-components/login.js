/**
 * Created by Seonin David on 2017/08/30.
 */
const express = require('express');
const router = express.Router();
const dbs = require('../../database/dbs');

//Home page
router.get('/', function (req, res, next) {
    res.render('login');
});

/**
 *
 * Page: Login.ejs
 * Author: Seonin David
 * Functionality: Authenticates the user when signing in
 * Bug:     If user not found need to route back and display appropriate message
 *
 */
function login_check(req, res, next) {
    var result = dbs.authenticate(req.body.username, req.body.password, function (result) {
        console.log("result found");
        if (result) {
            return next();
        }
        else {
            res.redirect('/');
            console.log("Redirecting to login page");
        }
    });
}

function isAuntenticated(req, res, next) {
    dbs.authenticate(req.session.username, req.body.session, function (result) {
        if (result) {
            return next();
        }
        else {
            res.redirect('/');
        }
    });
}

router.post('/login', function (req, res, next) {
    req.session.username = req.body.username;
    req.session.password = req.body.password;
    console.log(req.session.username);
    var user = dbs.findUsers("_id", req.session.username, function (user) {
        console.log(user[0]);
        console.log(user[0].role);
        if (user[0].role === "Manager") {
            req.session.name = user[0].name;
            req.session.surname = user[0].surname;
            req.session.role = user[0].role;
            res.redirect('project_creation');
        }
        else if (user[0].role === "Admin") {
            res.redirect('employees');
        }
        else if(user[0].role === "Employee"){
            res.redirect('user_dashboard');
        }
        else{
            res.redirect('director_dashboard');
        }
    });
});

module.exports = router;