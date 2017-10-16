/**
 * Created by Seonin David on 2017/10/13.
 */
const express = require('express');
const router = express.Router();
const dbs = require('../../database/dbs');

/**
 * Page:
 * Functionality: Employee profile
 * Note:
 * Bug(s): N/A
 *
 * Author(s): author
 * Date Revised: DD/MM/2017 by author
 * Date Revised: 02/10/2017 by Joshua Moodley
 */
router.get('/admin_display_image', function (req, res, next) {
    dbs.findUsers("_id", req.query.id, function (doc) {
        //res.contentType(doc[0].image.contentType);
        let result = [] ;
        result[0] = doc[0].image.contentType ;
        result[1] = doc[0].image.data ;
        res.send(result);
    });
});
router.get("/admin_get_emp", function (req, res, next) {
    dbs.findUsers("_id", req.query.id, function (user) {
        res.send(user);
    });
});

router.get("/profile_view", function (req, res, next) {
  res.render("profile_view")
});
router.get("/admin_get_user_past_projects", function (req, res, next) {
    dbs.findUsers("_id",req.query.id,function (user_data) {
        let past_project_ids=user_data[0].past_projects;
        dbs.get_past_projects(past_project_ids,function (past_projects) {
            res.send(past_projects);
        })
    });
});

router.get("/admin_get_emp_task", function (req, res, next) {
    dbs.findTasks("employees_assigned", req.query.id, function (tasks) {
        res.send(tasks);
    });
});

router.get("/admin_get_emp_milestone", function (req, res, next) {
    dbs.findUsers("_id", req.query.id, function (user_id) {
        dbs.findMilestones("project_id", user_id[0].current_projects[0], function (milestones) {
            res.send(milestones);
        });
    });
});

module.exports = router;