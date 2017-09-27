/**
 * Created by Seonin David on 2017/09/02.
 */
const express = require('express');
const router = express.Router();
const dbs = require('../../database/dbs');
const Promise=require("promise");

router.get("/get_emp", function (req, res, next) {
    dbs.findUsers("_id", req.session.username, function (user) {
        res.send(user);
    });
});


// getPastProject=(project_id)=>{
//     console.log(project_id);
//     return new Promise((resolve,reject)=>{
//         dbs.findProjects("_id",project_id,(contents,err)=>{
//             if(contents){
//                 resolve(contents);
//             }
//             else{
//                 reject(err);
//             }
//         });
//     })
// }

// router.get("/get_user_past_projects", function (req, res, next) {
//     let all_past_projects=[];
//     dbs.findUsers("_id", "emp6", function (user) {
//         let past_projects_ids=user[0].past_projects;
//         for(let i=0;i<past_projects_ids.length;i++){
//             Promise.all([getPastProject(past_projects_ids[i])]).then((values=>{
//                 all_past_projects[i]=values;
//                 console.log(all_past_projects);
//                 //res.send(values);
//             }))
//         }
//     },res.send(all_past_projects));
// });

router.get("/get_user_past_projects", function (req, res, next) {
        dbs.findProjects("_id",req.query.project_id,function (project_data) {
            res.send(project_data);
        })
});

router.get("/get_emp_task", function (req, res, next) {
    dbs.findTasks("employees_assigned", req.session.username, function (tasks) {
        res.send(tasks);
    });
});

router.get("/get_emp_milestone", function (req, res, next) {
    dbs.findUsers("_id", "emp1", function (user_id) {
        dbs.findMilestones("project_id", user_id[0].current_projects[0], function (milestones) {
            res.send(milestones);
        });
    });
});

router.get("/store_image", function (req, res, next) {
    res.send(req.param("pic"));
});

module.exports = router;