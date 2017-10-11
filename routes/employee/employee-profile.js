const express = require('express');
const router = express.Router();
const dbs = require('../../database/dbs');
const Promise=require("promise");

/**
 * Page:
 * Functionality: Employee profile
 * Note:
 * Bug(s): N/A
 *
 * Author(s): author
 * Date Revised: DD/MM/2017 by author
 * Date Revised: 02/10/2017 by Joshua Moodley
 */
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
router.get('/user_progress_analytics', function (req, res, next) {
    dbs.findUsers("_id",req.session.username,function (user_data) {
        if(JSON.stringify(user_data[0].current_projects) === "[]"){
            res.send("no_projects");
        }
        else{
           // conosle.log(user_data[0]);
            let project_id=user_data[0].current_projects[0];
            dbs.findProjects("_id",project_id,function (project_data) {
                let task_ids=project_data[0].tasks;
                let completed;
                if(task_ids.length!=0) {
                    dbs.get_finished_tasks(task_ids, function (task_data) {
                        let counter=0;
                        for(let count in task_data){
                            counter=counter+1;
                        }
                        completed=task_data.length;
                        let to_complete=task_ids.length-completed;
                        res.send([counter,to_complete]);
                    });
                }
            });
        }



   });

});
router.get("/get_user_past_projects", function (req, res, next) {
    dbs.findUsers("_id",req.session.username,function (user_data) {
        let past_project_ids=user_data[0].past_projects;
        dbs.get_past_projects(past_project_ids,function (past_projects) {
            res.send(past_projects);
        })
    });
});

router.get("/get_emp_task", function (req, res, next) {
    dbs.findTasks("employees_assigned", req.session.username, function (tasks) {
        res.send(tasks);
    });
});

router.get("/get_emp_milestone", function (req, res, next) {
    dbs.findUsers("_id", req.session.username, function (user_id) {
        dbs.findMilestones("project_id", user_id[0].current_projects[0], function (milestones) {
            res.send(milestones);
        });
    });
});

router.get("/store_image", function (req, res, next) {
    console.log("user: " + req.session.username);
    console.log("pic: " + req.query.pic);
    dbs.editProfileImage(req.session.username, req.query.pic);
    res.send('profile');
});

router.get('/display_image', function (req, res, next) {
    dbs.findUsers("_id", req.session.username, function (doc) {
        res.contentType(doc[0].image.contentType);
        res.send(doc[0].image.data);
    });
});

module.exports = router;