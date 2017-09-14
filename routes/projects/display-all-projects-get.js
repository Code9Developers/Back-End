/**
 * Created by Seonin David on 2017/08/30.
 */
const express = require('express');
const router = express.Router();
const dbs = require('../../database/dbs');

router.get("/all_projects", function (req, res, next) {

    var all_projects = dbs.findProjects("status", "active", function (all_projects) {
        res.send(all_projects);

    });
});

router.get('/active_projects', function (req, res, next) {
    var projects = dbs.findProjects("status", "active", function (projects) {
        res.send(JSON.stringify(projects));
    });

});

module.exports = router;

