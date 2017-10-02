const express = require('express');
const router = express.Router();
const dbs = require('../../database/dbs');

/**
 * Page:
 * Functionality: Calendar
 * Note:
 * Bug(s): N/A
 *
 * Author(s): author
 * Date Revised: DD/MM/2017 by Nicaedin Suklal
 * Date Revised: 02/10/2017 by Joshua Moodley
 */
router.get("/calendar_events", function (req, res, next) {
    let project_id;
    dbs.findUsers("_id", req.session.username, function (user) {
        project_id = user[0].current_projects[0];
        let project = dbs.findProjects("_id", project_id, function (project) {
            res.send(project);
        });
    })
});

router.get("/user_project_detail", function (req, res, next) {
    res.render("user_project_detail");
});
//Add code to store new calendar events

module.exports = router;

