const express = require('express');
const router = express.Router();
const dbs = require('../../database/dbs');
const algorithm = require('../../database/employee-evaluations');

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

router.get('/get_rep_data', function (req, res, next) {
    let all_skills=(req.query.skills).split(",");
    let arr_skills=[];
    for(let x in all_skills){
        arr_skills[x]=all_skills[x]
    }

    algorithm.get_unallocated_users(arr_skills,req.query.start_date,req.query.end_date, function (data) {
        let rep_data = JSON.stringify(data[1]);
        let _obj = JSON.parse(rep_data);
        let emp_data=[];
        let c=0;
        for(let j in _obj){
            let single_obj=_obj[j];
            for(let i in single_obj){
                emp_data[c]=single_obj[i];
                c++
            }
        }
        let _json = {data:emp_data};
        res.send(_json);
    });
    res.contentType('application/json');

});

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
    let  id = req.query.id;
    dbs.findUsers("current_projects", id, function (docs) {
        let result = JSON.stringify(docs);
        let _obj = JSON.parse(result);
        let emp_data=[];
        let count=0;
        for(let j in _obj){
            if(_obj[j].role!="Manager"){
                emp_data[count]=_obj[j];
                count++;
            }
        }
        let _json = {data:emp_data};
        res.send(_json);
    });
    res.contentType('application/json');
});

/**
 * Request type: GET
 * Functionality: Sends the request to change the project date to the new project date
 */
router.get('/change_project_date', function (req, res, next) {
    let  p_id = req.query.id;;
    let  oldDate = "";
    let p_name="";
    dbs.findProjects("_id", p_id, function (current_project) {
        oldDate = current_project[0].project_end_date;
        p_name=current_project[0].name;

        let  tempDate = req.query.new_date;
        let  tempDateArray = tempDate.split("/");
        let  newDate = new Date((tempDateArray[2] + "-" + tempDateArray[1] + "-" + tempDateArray[0]).toString());
        dbs.editProjects("_id", p_id, "project_end_date", newDate);
    });
    res.send("Done");
});

router.get('/edit_replacement_store', function (req, res, next) {
    let rand_id = Math.floor((Math.random() * 1000) + 1).toString();
    let director_id=req.query.director;

    let ap_id = director_id + rand_id;
    let remove_emps = req.query.emp_removed;
    let replace = req.query.emp_replace;
    let reason_for_removal = req.query.reason;
    let project_name = req.query.project_name;
    let project_id = req.query.project_id;


    let _approval_json = {
        _id:ap_id,
        reason: reason_for_removal,
        project_id:project_id,
        director_id: director_id,
        employees_removed: remove_emps,
        employees_replaced: replace
    };

    dbs.insert_approval(_approval_json);

    let today = new Date();
    dbs.insertNotification({
        _id: "noti_"+ap_id+director_id,
        user_id: director_id,
        message: "You have been requested to approve employee changes for a project",
        date_created: today,
        isRead: false
    });

});


module.exports = router;