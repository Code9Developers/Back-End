/**
 * Created by Seonin David on 2017/08/30.
 */
const express = require('express');
const router = express.Router();
const dbs = require('../../database/dbs') ;

/**
 -----------------------------------------------------------------------------------------------------------------------
 *Name: Task Functionality
 *Author: Seonin David
 *
 -----------------------------------------------------------------------------------------------------------------------
 * */
router.get('/create_task', function(req, res, next)
{
    var project_id=req.param('project_id');
    var milestone_id=req.param('milestone_id');
    var task=req.param('task');
    var emp_assigned=req.param('emp_assigned');
    var rand_password = generator.generate({
        length: 10,
        numbers: true,
        symbols: true,
        uppercase: true
    });

    var _id=milestone_id.substr(0,5)+project_id+rand_password;
    var emp_json={ _id: _id,
        description: task,
        project_id: project_id,
        milestone_id: milestone_id,
        employees_assigned: emp_assigned};

    dbs.insertTask(emp_json);

    res.send("Succuess");

});

router.get('/get_tasks', function(req, res, next)
{
    var project_id=req.param('id');
    var tasks=dbs.findTasks("project_id",project_id,function (tasks) {
        console.log(tasks);
        res.send(tasks);
    });

});

module.exports = router;