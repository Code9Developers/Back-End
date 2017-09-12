/**
 * Created by Seonin David on 2017/08/30.
 */
const express = require('express');
const router = express.Router();

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

module.exports = router;