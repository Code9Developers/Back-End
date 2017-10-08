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
        dbs.findMilestones("_id",task[0].milestone_id,function (milestone) {
            let task_ids=milestone[0].tasks;
            let new_task_ids=[];
            let new_task_ids_count=0;
            for(let x=0;x<task_ids.length;x++){
                if(task_ids[x]!==task_id){
                    new_task_ids[new_task_ids_count]=task_ids[x];
                    new_task_ids_count++;
                }
            }
            console.log(new_task_ids);
            dbs.editMilestones("_id",task[0].milestone_id,"tasks",new_task_ids);

        })
        // dbs.findProjects("_id",task[0].project_id,function (project) {
        //     let p_task_ids=project[0].tasks;
        //     console.log(p_task_ids.length);
        //     let p_new_task_ids=[];
        //     let p_new_task_ids_count=0;
        //     for(let y=0;p_task_ids.length;y++){
        //         if(p_task_ids[y]!=task_id){
        //             p_new_task_ids[p_new_task_ids_count]=p_task_ids[y];
        //             p_new_task_ids_count++;
        //         }
        //     }
        //     console.log(p_new_task_ids);
        //     dbs.editProjects("_id",project[0].project_id,"tasks",p_new_task_ids);
        // });
    });

});

module.exports = router;