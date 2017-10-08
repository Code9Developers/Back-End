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

router.get("/get_all_event_data", function (req, res, next) {
    dbs.findEvents("user_id",req.session.username,function (event_data) {
        res.send(event_data);
    })
});


router.get("/store_event", function (req, res, next) {
    let rand_id = Math.floor((Math.random() * 1000) + 1).toString();
    let rand_id_1 = Math.floor((Math.random() * 2000) + 1).toString();
    let event_id=rand_id+req.session.username+rand_id_1;
    let start_date=req.query.start_date;
    let end_date=req.query.end_date;
    let _obj ={
        _id: event_id,
        user_id: req.session.username,
        description: req.query.description,
        // event_start_date:                        Need to see how date is sent before I see how to store it
        // event_end_date: Date
    };
});

router.get("/delete_event", function (req, res, next) {
    dbs.deleteEvent(req.query.event_id);
});

module.exports = router;

