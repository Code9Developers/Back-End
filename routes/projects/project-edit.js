/**
 * Created by Seonin David on 2017/08/30.
 */
const express = require('express');
const router = express.Router();
const dbs = require('../../database/dbs');
const algorithm = require('../../database/Resource-Alocation-Algorithm');


/**
 *
 * Page: project_edit.ejs
 * Author(s): Seonin David
 * Functionality:   - Allows the project manager to edit the project deadline
 *                  - Remove employees
 *                  - Assign new employees (Done after remove)
 *
 * Bug:             - Need to calculate project duration using start and end date (If that is still being used in the algorithm)
 *                  - Send project budget through
 *                  - Possibly need to use delete employees skills to send to the algorithm
 *
 */
router.get('/project_edit_delete', function (req, res, next) {
    var ids = req.param("rem_ids");
    var project_id = req.param("id");


    algorithm.get_unallocated_users(ids.length, 'Aduiting', 5, 3000, function (val) {
        for (var c in val) {
            dbs.assignProject(val[c]._id, project_id)
        }
        var result = JSON.stringify(val);
        for (var y in ids) {
            dbs.dismissProject(ids[y], project_id);
        }

        res.send(result);
    });
    res.contentType('application/json');

});

/**
 * Request type: GET
 * Functionality: Finds the project information and sends it thorough to the from end
 */
router.get('/data_project_edit', function (req, res, next) {
    var id = req.param("id");
    var current_project = dbs.findProjects("_id", id, function (current_project) {
        res.send(current_project[0]);
    });
    // res.render("admin");
});

/**
 * Request type: GET
 * Functionality: This function finds all the users for the current project
 */
router.get('/find_project_users', function (req, res, next) {
    var id = req.param("id");
    var docs = dbs.findUsers("current_projects", id, function (docs) {
        res.send(JSON.parse(JSON.stringify(docs)));
    });
});

/**
 * Request type: GET
 * Functionality: Sends the request to change the project date to the new project date
 */
router.get('/change_project_date', function (req, res, next) {
    var id = req.param("id");
    var oldDate = "";
    var current_project = dbs.findProjects("_id", id, function (current_project) {
        oldDate = current_project[0].project_end_date;
    });

    var tempDate = req.param("new_date");
    var tempDateArray = tempDate.split("/");
    var newDate = new Date((tempDateArray[2] + "-" + tempDateArray[1] + "-" + tempDateArray[0]).toString());

    console.log(newDate);
    console.log(oldDate);
    dbs.editProjects("_id", id, "project_end_date", newDate);
    res.send("Done");
});


module.exports = router;