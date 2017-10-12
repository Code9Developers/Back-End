const express = require('express');
const router = express.Router();
const dbs = require('../../database/dbs');
const generator = require('generate-password');

/**
 * Page:
 * Functionality: Task Functionality
 * Note:
 * Bug(s): N/A
 *
 * Author(s): author
 * Date Revised: DD/MM/2017 by Seonin David
 * Date Revised: 02/10/2017 by Joshua Moodley
 */
router.get('/create_task', function (req, res, next) {
    let  project_id = req.param('project_id');
    let  milestone_id = req.param('milestone_id');
    let  task = req.param('task');
    let  emp_assigned = req.param('emp_assigned');
    let  rand_password = generator.generate({
        length: 5,
        numbers: true,
        symbols: false,
        uppercase: true
    });

    let  _id = milestone_id.substr(0, 5) + project_id + rand_password;
    let  emp_json = {
        _id: _id,
        description: task,
        project_id: project_id,
        milestone_id: milestone_id,
        employees_assigned: emp_assigned,
        status:"active"
    };

    dbs.insertTask(emp_json);
    let  rand = generator.generate({
        length: 5,
        numbers: true,
        symbols: false,
        uppercase: true
    });
    let  emp = req.param('emp_assigned');
    dbs.findMilestones("_id", milestone_id, function (milestone) {
        for (let  x in emp) {
            rand = generator.generate({
                length: 5,
                numbers: true,
                symbols: false,
                uppercase: true
            });
            let today = new Date();
            dbs.insertNotification({
                _id: project_id + milestone_id + rand,
                user_id: emp[x],
                message: "You have been assigned to a new task.\nTask name:" + task + "\n Deadline date:                   " + milestone[0].milestone_end_date,
                date_created: today,
                isRead: false
            });
        }
    });


    res.send("Success");

});

router.get('/get_tasks', function (req, res, next) {
    let  project_id = req.param('id');
    let  tasks = dbs.findTasks("project_id", project_id, function (tasks) {
        console.log(tasks);
        res.send(tasks);
    });

});

router.get('/remove_task', function (req, res, next) {
    let task_id=req.query.task_id;
   dbs.editTasks("_id",task_id,"status","completed");
    dbs.findTasks("_id",task_id,function (task) {
        dbs.remove_task_from_milestone(task[0].milestone_id,task_id);
        dbs.remove_task_from_milestone(task[0].project_id,task_id);

    });
});

router.get('/progress_analytics', function (req, res, next) {
    let project_id=req.query.id;
    console.log(project_id);
    dbs.findProjects("_id",project_id,function (project_data) {
        console.log(project_data);
        let task_ids=project_data[0].tasks;
        let completed;
        if(task_ids.length!=0) {
            dbs.get_finished_tasks(task_ids, function (task_data) {
                let counter=0;
                for(let count in task_data){
                    counter=counter+1;
                }
                completed=task_data.length;
                let to_complete=task_ids.length-completed;
                res.send([counter,to_complete]);
            });
        }
    });
});
module.exports = router;