const express = require('express');
const router = express.Router();
const dbs = require('../../database/dbs');
const generator = require('generate-password');
/**
 * Page: Milestone.ejs
 * Functionality: Milestone functions
 * Note:
 * Bug(s): N/A
 *
 * Author(s): author
 * Date Revised: DD/MM/2017 by Seonin David
 * Date Revised: 02/10/2017 by Joshua Moodley
 */
router.get('/store_milestones', function (req, res, next) {
    let  project_id = req.param('id');
    let  milestone_name = req.param('milestone_name');
    let  end_date = req.param('end_date');

    let  temp_end_date = end_date.split("/");
    let  new_end_date = new Date((temp_end_date[2] + "-" + temp_end_date[1] + "-" + temp_end_date[0]).toString());
    let  rand_password = generator.generate({
        length: 100,
        numbers: true,
        symbols: true,
        uppercase: true
    });

    let rand_id = Math.floor((Math.random() * 100) + 1).toString();
    let  milstone_id = milestone_name.substr(0, 4) + project_id + rand_id;

    let  milestone_json = {
        _id: milstone_id,
        project_id: project_id,
        description: milestone_name,
        milestone_end_date: new_end_date
    };
    dbs.insertMilestone(milestone_json);
    res.send("Got it!!");
});

router.get('/get_milestones', function (req, res, next) {
    let  project_id = req.param('id');
    let  all_milestones = dbs.findMilestones("project_id", project_id, function (all_milestones) {
        res.send(all_milestones);
    });
});

module.exports = router;