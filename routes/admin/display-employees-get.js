const express = require('express');
const router = express.Router();
const dbs = require('../../database/dbs');

/**
 * Page:
 * Functionality: GET
 * Note:
 * Bug(s): N/A
 *
 * Author(s): author
 * Date Revised: DD/MM/2017 by author
 * Date Revised: 02/10/2017 by Joshua Moodley
 */

router.get("/employees", function (req, res, next) {
    res.render("employees")
});

router.get("/all_employees", function (req, res, next) {

    let all_users = dbs.findUsers("role", "Employee", function (all_users) {
        res.send(all_users);
    });
});

module.exports = router;