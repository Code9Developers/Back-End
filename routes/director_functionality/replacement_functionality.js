/**
 * Created by Seonin David on 2017/09/22.
 */
const express = require('express');
const router = express.Router();
const dbs = require('../../database/dbs');
const algorithm = require('../../database/Resource-Alocation-Algorithm');
const generator = require('generate-password');
const Promise = require('promise');
const async = require("async");

router.get('/get_deleted_employees', function (req, res, next) {

    dbs.find_approval("director_id", req.session.username,(data) =>  {
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

    dbs.find_approval("director_id", 33, (data)=> {

        let employees_to_add=data[0].employees_replaced;


        dbs.findUsers("role", "Employee", function (user) {
            for (let i = 0; i < user.length; i++) {
                if (employees_to_add.includes(user[i]._id)) {
                    let new_json_obj = {
                        _id: user[i]._id,
                        name: user[i].name,
                        surname: user[i].surname,
                        position: user[i].position,
                        employment_length: user[i].employment_length,
                        past_projects: user[i].past_projects,
                        skill:user[i].skill[0]
                    };
                    added_user_json[x] = new_json_obj;
                    x++;
                }
            }
            res.send(added_user_json);
        });
    });
});

router.get('/replacement_reason', function (req, res, next) {
    dbs.find_approval("director_id",req.session.username, function (data) {
        res.send(data[0].reason)
    })
});

router.get('/approved_replacement', function (req, res, next) {
    dbs.find_approval("director_id",33, function (data) {
        //This is to remove the employees first
        let employees_to_be_removed=data[0].employees_removed;
        let employees_to_add=data[0].employees_replaced;

        for(let x=0;x<employees_to_be_removed.length;x++){
            console.log(employees_to_be_removed[x]);
            dbs.dismissProject(employees_to_be_removed[x],data[0].project_id)
        }
        for(let x=0;x<employees_to_add.length;x++){
            console.log(added_user_json[0]);
            console.log(added_user_json[0].skill);
            dbs.assignProject(added_user_json[0],data[0].project_id);
        }

        dbs.findProjects("_id",data[0].project_id,(project_data)=>{
            res.send(project_data);
        })
    })
});

router.get('/a', function (req, res, next) {
    dbs.findProjects("_id","kpmg_rdr4",(project_data)=>{
        dbs.dismissProject("emp2","kpmg_rdr4")
        res.send(project_data);
    })
})
module.exports = router;