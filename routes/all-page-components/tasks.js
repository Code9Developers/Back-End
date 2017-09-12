/**
 * Created by Seonin David on 2017/08/30.
 */
const express = require('express');
const router = express.Router();
const dbs = require('../../database/dbs');
const generator = require('generate-password');
/**
 -----------------------------------------------------------------------------------------------------------------------
 *Name: Task Functionality
 *Author: Seonin David
 *
 -----------------------------------------------------------------------------------------------------------------------
 * */
router.get('/create_task', function (req, res, next) {
    var project_id = req.param('project_id');
    var milestone_id = req.param('milestone_id');
    var task = req.param('task');
    var emp_assigned = req.param('emp_assigned');
    var rand_password = generator.generate({
        length: 10,
        numbers: true,
        symbols: true,
        uppercase: true
    });

    var _id = milestone_id.substr(0, 5) + project_id + rand_password;
    var emp_json = {
        _id: _id,
        description: task,
        project_id: project_id,
        milestone_id: milestone_id,
        employees_assigned: emp_assigned
    };

    dbs.insertTask(emp_json);
    var rand = generator.generate({
        length: 10,
        numbers: true,
        symbols: true,
        uppercase: true
    });
    var emp = req.param('emp_assigned');
    dbs.findMilestones("_id", milestone_id, function (milestone) {
        for (var x in emp) {
            rand = generator.generate({
                length: 10,
                numbers: true,
                symbols: true,
                uppercase: true
            });
            dbs.insertNotification({
                _id: project_id + milestone_id + rand,
                user_id: emp[x],
                message: "You have been assigned to a new task.\nTask name:" + task + "\n Deadline date:                   " + milestone_date[0].milestone_end_date,
                date_created: today,
                isRead: false
            });
        }
    });


    res.send("Succuess");

});

router.get('/get_tasks', function (req, res, next) {
    var project_id = req.param('id');
    var tasks = dbs.findTasks("project_id", project_id, function (tasks) {
        console.log(tasks);
        res.send(tasks);
    });

});

module.exports = router;