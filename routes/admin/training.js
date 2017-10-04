/**
 * Created by Seonin David on 2017/10/04.
 */
const express = require('express');
const router = express.Router();
const dbs = require('../../database/dbs');
const generator = require('generate-password');
const email_functions = require('../email_functions');

/**
 * Page:training.ejs
 * Functionality: Route to training page
 * Note:
 * Bug(s): N/A
 *
 * Author(s): Seonin David
 * Date Revised: 04/10/2017 by Seonin David
 */
router.get("/training", function (req, res, next) {
    res.render('training');
});


/**
 * Page:training.ejs
 * Functionality: Returns all employees to be selected for training
 * Note:
 * Bug(s): N/A
 *
 * Author(s): Seonin David
 * Date Revised: 04/10/2017 by Seonin David
 */
router.get('/get_all_employees', function (req, res, next) {
    dbs.findUsers("role", "Employee", function (users) {
        let result = JSON.stringify(users);
        let _obj = JSON.parse(result);
        let emp_data=[];
        for(let j in _obj){
            emp_data[j]=_obj[j];
        }
        let _json = {data:emp_data};
        res.send(_json);
    });
});

module.exports = router;