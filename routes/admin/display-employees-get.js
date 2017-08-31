/**
 * Created by Seonin David on 2017/08/30.
 */
const express = require('express');
const router = express.Router();
const dbs = require('../../database/dbs') ;

router.get("/employees",function (req,res,next) {
    res.render("employees")
});

router.get("/all_employees",function (req,res,next) {

    var all_users=dbs.findUsers("role", "Employee",function (all_users) {
        res.send(all_users);
    });
});

module.exports = router;