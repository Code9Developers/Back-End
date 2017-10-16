const express = require('express');
const router = express.Router();
const dbs = require('../../database/dbs');
const generator = require('generate-password');
const Promise = require('promise');
const async = require("async");

/**
 * Page:
 * Functionality: Replacement Functions
 * Note:
 * Bug(s): N/A
 *
 * Author(s): author
 * Date Revised: DD/MM/2017 by author
 * Date Revised: 02/10/2017 by Joshua Moodley
 */
router.get('/get_deleted_employees', function (req, res, next) {

    dbs.find_approval("_id",  req.query.id,(data) =>  {
        let employees_to_remove=data[0].employees_removed;
        let return_json = [];
        let x = 0;

        dbs.findUsers("role", "Employee", (user)=> {
            for (let i = 0; i < user.length; i++) {
                if (employees_to_remove.includes(user[i]._id)) {
                    let new_json_obj = {
                        _id: user[i]._id,
                        name: user[i].name,
                        surname: user[i].surname,
                        position: user[i].position,
                        employment_length: user[i].employment_length,
                        past_projects: user[i].past_projects,
                        skill:user[i].skill[0].name
                    };
                    return_json[x] = new_json_obj;
                    x++;
                }
            }

            res.send(return_json);
        });
    });
});
let added_user_json = [];
let x = 0;
router.get('/get_replacement_employees', function (req, res, next) {

    dbs.find_approval("_id", req.query.id, (data)=> {

        let employees_to_add=data[0].employees_replaced;

        dbs.get_replacement_user_data(employees_to_add,function (emp_data) {
            res.send(emp_data);
        })
    });
});

router.get('/replacement_reason', function (req, res, next) {
    dbs.find_approval("_id",req.query.id, function (data) {
        res.send(data[0].reason)
    })
});

router.get('/approved_replacement', function (req, res, next) {

    dbs.find_approval("_id",req.query.id, function (data) {
        let employees_to_be_removed=data[0].employees_removed;
        let employees_to_add=data[0].employees_replaced;

        for(let x=0;x<employees_to_be_removed.length;x++){
            console.log(employees_to_be_removed[x]);
            dbs.dismissProject(employees_to_be_removed[x],data[0].project_id)
        }
        for(let x=0;x<employees_to_add.length;x++){
            dbs.findUsers("_id",employees_to_add[x],function (emp_data) {
                let choosen_skill=emp_data[0].skill[0];
                dbs.assignProject(employees_to_add[x],data[0].project_id,JSON.stringify(choosen_skill),function(res){});
            })
            //Need to change or make function to also add skill to current employees
        }

        dbs.editProjects("_id",data[0].project_id,"status","active");
        dbs.remove_approval(req.query.id);

    })


    router.get('/rejected_replacement', function (req, res, next) {
        dbs.find_approval("_id",req.query.id, function (data) {
            dbs.editProjects("_id", data[0].project_id, "status", "active");
            dbs.remove_approval(req.query.id);
        });
    });
});

module.exports = router;