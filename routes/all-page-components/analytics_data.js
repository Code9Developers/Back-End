/**
 * Created by Seonin David on 2017/10/11.
 */
const express = require('express');
const router = express.Router();
const dbs = require('../../database/dbs');


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

router.get('/get_all_past_projects', function (req, res, next) {
  dbs.findProjects("status","completed",function (past_project_data) {
      dbs.findProjects("status","active",function (active_project_data) {
          dbs.findUsers("role", "Employee", function (all_users) {
              dbs.findUsers("role", "Manager", function (all_managers) {
                  res.send([past_project_data.length,active_project_data.length,all_users.length,all_managers.length]);
              });
          });
      });
    });
});

module.exports = router;