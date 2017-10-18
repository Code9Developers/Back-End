const express = require('express');
const router = express.Router();
const dbs = require('../../database/dbs');

/**
 * Page:
 * Functionality: Projects
 * Note:
 * Bug(s): N/A
 *
 * Author(s): author
 * Date Revised: DD/MM/2017 by author
 * Date Revised: 02/10/2017 by Joshua Moodley
 */

router.get("/all_projects", function (req, res, next) {

    dbs.findProjects("status", "active", function (all_projects) {
        res.send(all_projects);

    });
});

router.get('/active_projects', function (req, res, next) {
    let projects = dbs.findProjects("status", "active", function (projects) {
        res.send(JSON.stringify(projects));
    });

});

router.get('/get_finished_tasks', function (req, res, next) {
    dbs.get_finished_tasks(req.query.ids, function (task_data) {
        res.send(task_data);
    });

});



module.exports = router;

