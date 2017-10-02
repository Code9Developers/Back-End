const express = require('express');
const router = express.Router();
const dbs = require('../../database/dbs');
const algorithm = require('../../database/Resource-Alocation-Algorithm');

/**
 * Page: project_edit.ejs
 * Functionality:   - Allows the project manager to edit the project deadline
 *                  - Remove employees
 *                  - Assign new employees (Done after remove)
 * Note:
 * Bug(s): - Need to calculate project duration using start and end date (If that is still being used in the algorithm)
 *         - Send project budget through
 *         - Possibly need to use delete employees skills to send to the algorithm
 *
 * Author(s): author
 * Date Revised: DD/MM/2017 by Seonin David
 * Date Revised: 02/10/2017 by Joshua Moodley
 */

// router.get('/project_edit_delete', function (req, res, next) {
//     let  ids = req.param("rem_ids");
//     let  project_id = req.param("id");
//
//
//     algorithm.get_unallocated_users(ids.length, 'Aduiting', 5, 3000, function (val) {
//         for (let  c in val) {
//             dbs.assignProject(val[c]._id, project_id)
//         }
//         let  result = JSON.stringify(val);
//         for (let  y in ids) {
//             dbs.dismissProject(ids[y], project_id);
//         }
//
//         res.send(result);
//     });
//     res.contentType('application/json');
//
// });

/**
 * Request type: GET
 * Functionality: Finds the project information and sends it thorough to the from end
 */
router.get('/data_project_edit', function (req, res, next) {
    let  id = req.param("id");
    let  current_project = dbs.findProjects("_id", id, function (current_project) {
        res.send(current_project[0]);
    });
    // res.render("admin");
});

/**
 * Request type: GET
 * Functionality: This function finds all the users for the current project
 */
router.get('/find_project_users', function (req, res, next) {
    let  id = req.param("id");
    let  docs = dbs.findUsers("current_projects", id, function (docs) {
        res.send(JSON.parse(JSON.stringify(docs)));
    });
});

/**
 * Request type: GET
 * Functionality: Sends the request to change the project date to the new project date
 */
router.get('/change_project_date', function (req, res, next) {
    let  p_id = req.query.id;
    let director_id=req.query.director;
    let rand_id = Math.floor((Math.random() * 10) + 1).toString();
    let  oldDate = "";
    let p_name="";
    dbs.findProjects("_id", p_id, function (current_project) {
        oldDate = current_project[0].project_end_date;
        p_name=current_project[0].name;

        let  tempDate = req.param("new_date");
        let  tempDateArray = tempDate.split("/");
        let  newDate = new Date((tempDateArray[2] + "-" + tempDateArray[1] + "-" + tempDateArray[0]).toString());
        let  today = new Date();

        dbs.insertNotification({
            _id: "noti_"+rand_id+p_id+director_id,
            user_id: director_id,
            message: "You have been requested to approve date change for project "+p_name+" from "+oldDate.toDateString()+" to "+newDate.toDateString(),
            date_created: today,
            isRead: false
        });
    });


    //dbs.editProjects("_id", id, "project_end_date", newDate);
    res.send("Done");
});


module.exports = router;