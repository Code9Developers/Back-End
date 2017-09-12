/**
 * Created by Seonin David on 2017/08/30.
 */
const express = require('express');
const router = express.Router();
const dbs = require('../../database/dbs');

router.get("/calendar_events", function (req, res, next) {
    var project_id;
    dbs.findUsers("_id", req.session.username, function (user) {
        project_id = user[0].current_projects[0];
        var project = dbs.findProjects("_id", project_id, function (project) {
            res.send(project);
        });
    })
});

//Add code to store new calendar events

module.exports = router;

