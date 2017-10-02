const express = require('express');
const router = express.Router();
const dbs = require('../../database/dbs');

/**
 * Page:
 * Functionality: Project Edit Routes
 * Note:
 * Bug(s): N/A
 *
 * Author(s): author
 * Date Revised: DD/MM/2017 by author
 * Date Revised: 02/10/2017 by Joshua Moodley
 */

//Project Creation Page
router.get("/project_creation", function (req, res, next) {
    res.render('project_creation');
});

//Project Edit Page
router.get("/project_edit", function (req, res, next) {
    res.render('project_edit');
});

//Project Detail Page
router.get("/project_detail", function (req, res, next) {
    res.render('project_view');
});

//Project Milestones Page
router.get("/project_milestone", function (req, res, next) {
    res.render('project_milestones');
});

//Projects page
router.get("/projects", function (req, res, next) {
    res.render('projects');
});

router.get("/project_review", function (req, res, next) {
    res.render('project_review');
});

router.get("/remove_project", function (req, res, next) {
    let today = new Date();
    let rand_id = Math.floor((Math.random() * 10) + 1).toString();
    dbs.editProjects("_id",req.query.project_id,"status","completed");
    dbs.findProjects("_id",req.query.project_id,function (project_data) {
        dbs.insertNotification({
            _id: "noti_"+rand_id+project_data[0]._id+req.session.username,
            user_id: req.session.username,
            message: project_data[0].name+" has been completed, please review how the project went.",
            date_created: today,
            isRead: false
        });
        res.redirect("project_review")
    });
});

module.exports = router;