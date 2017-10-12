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

    dbs.findUsers("role", "Employee", function (all_users) {
        res.send(all_users);
    });
});

router.get("/remove_emp", function (req, res, next) {

    dbs.findUsers("_id",req.query.user_id, function (user_data) {
        let user_schema = {
            _id: user_data[0]._id,
            name: user_data[0].name,
            surname: user_data[0].surname,
            password: user_data[0].password,
            password_date: user_data[0].password_date,
            image: user_data[0].image,
            contact: user_data[0].contact,
            email: user_data[0].email,
            role: user_data[0].role,
            position: user_data[0].position,
            employment_length: user_data[0].employment_length,
            rate: user_data[0].rate,
            skill: user_data[0].skill,
            current_projects: user_data[0].current_projects,
            past_projects: user_data[0].past_projects,
            events: user_data[0].events
        };

        dbs.insertGhost(user_schema,function () {
            dbs.deleteUser(req.query.user_id);
        });
    });
});
module.exports = router;