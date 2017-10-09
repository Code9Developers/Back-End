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

router.post('/add_training', function (req, res, next) {
    let start_date = (req.body.start_date);
    let s = start_date.split("/");
    let newStartDate = new Date((s[2] + "-" + s[1] + "-" + s[0]).toString());

    let end_date = ((req.body.end_date));
    let temp_end_date = end_date.split("/");
    let new_end_date = new Date((temp_end_date[2] + "-" + temp_end_date[1] + "-" + temp_end_date[0]).toString());

    let rand_id = Math.floor((Math.random() * 1000) + 1).toString();
    let rand_id_1 = Math.floor((Math.random() * 1000) + 1).toString();
    let id=rand_id+req.body.trainer_name+rand_id_1;
    let training_obj={
        _id: id,
        training_start_date: newStartDate,
        training_end_date: new_end_date,
        trainer_name: req.body.trainer_name,
        training_contact: req.body.trainer_contact,
        trainer_email: req.body.trainer_email,
        employees_assigned:JSON.parse(req.body.emp_ids)
    }

    dbs.insertTraining(training_obj);


    let ids=JSON.parse(req.body.emp_ids);
    for(let i in ids){
        dbs.findUsers("_id",ids[i],function (user_data) {
           console.log(user_data[0].email);//Works
        });
    }
});
module.exports = router;