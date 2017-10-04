/**
 * Created by Seonin David on 2017/08/30.
 */
const express = require('express');
const router = express.Router();
const generator = require('generate-password');
const dbs = require('../../database/dbs');
/**
 -----------------------------------------------------------------------------------------------------------------------
 * Page: Milestone.ejs
 * Author: Seonin David
 -----------------------------------------------------------------------------------------------------------------------
 * */
router.get('/store_milestones', function (req, res, next) {
    var project_id = req.param('id');
    var milestone_name = req.param('milestone_name');
    var end_date = req.param('end_date');

    var temp_end_date = end_date.split("/");
    var new_end_date = new Date((temp_end_date[2] + "-" + temp_end_date[1] + "-" + temp_end_date[0]).toString());
    var rand_password = generator.generate({
        length: 100,
        numbers: true,
        symbols: true,
        uppercase: true
    });

    var milstone_id = milestone_name.substr(0, 4) + project_id + rand_password;

    var milestone_json = {
        _id: milstone_id,
        project_id: project_id,
        description: milestone_name,
        milestone_end_date: new_end_date
    };
    dbs.insertMilestone(milestone_json);
    res.send("Got it!!");
});

router.get('/get_milestones', function (req, res, next) {
    var project_id = req.param('id');
    var all_milestones = dbs.findMilestones("project_id", project_id, function (all_milestones) {
        res.send(all_milestones);
    });
});

module.exports = router;