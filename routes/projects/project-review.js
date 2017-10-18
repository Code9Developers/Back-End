/**
 * Created by Seonin David on 2017/10/01.
 */
const express = require('express');
const router = express.Router();
const dbs = require('../../database/dbs');



router.get("/remove_project", function (req, res, next) {
    let rand_id = Math.floor((Math.random() * 10) + 1).toString();
    let today = new Date();
    dbs.editProjects("_id",req.query.project_id,"status","completed");
    dbs.findProjects("_id",req.query.project_id,function (project_data) {
        dbs.insertNotification({
            _id: "noti_"+rand_id+project_data[0]._id+req.session.username,
            user_id: req.session.username,
            message: project_data[0].name+" has been completed, please review how the project did.",
            date_created: today,
            isRead: false
        });
        res.redirect("project_review")
    });
});

router.get("/all_projects_to_review", function (req, res, next) {
    dbs.findUsers("_id",req.session.username,(user_data)=> {

        let projects=user_data[0].current_projects;
        dbs.get_completed_projects(projects,function (result) {
            res.send(result);
        });
    });
});

router.get("/get_project_employees", function (req, res, next) {
    dbs.findProjects("_id",req.query.id,(project_data)=> {

        let users=project_data[0].employees_assigned;

        let user_array=[];
        for(let i=0;i<users.length;i++){
            user_array[i]=users[i]._id;
        }
        dbs.get_specific_user_data(user_array,function (result) {
            res.send(result);
        });
    });
});

let user_skill_array=[];
let count=0;
let user_rating_array=[];
let user_counter_array=[];
router.get("/get_chosen_skills",(req, res, next)=> {
    dbs.findProjects("_id",req.query.id,(project_data)=> {
        let skills=[];
        for(let x =0;x<project_data[0].employees_assigned.length;x++ ){
            skills[x]=JSON.parse(project_data[0].employees_assigned[x].skill).name;
        }
        dbs.findUsers("_id",req.query.user_id,function (user) {
            let _obj=[];
            let choosen_skill;
            for(let i=0;i<project_data[0].employees_assigned.length;i++){
                if(project_data[0].employees_assigned[i]._id===req.query.user_id){
                    choosen_skill=skills[i];
                }
            }
            _obj[0]=user;
            _obj[1]=choosen_skill;
            res.send(choosen_skill);
        });

    });
});


router.get("/send_review",(req, res, next)=> {
    let _data=req.query.data;
    for(let x=1;x<=_data.length-1;x++){
        let skill_data=_data[x].value.split(";");
        let value=parseInt(skill_data[1]);
        let new_rating=(parseInt(user_rating_array[x-1])+value)/(parseInt(user_counter_array[x-1]+1));
        // dbs.editUsers("_id",_data[x].name,"past_projects",req.query.id);
        dbs.editUserObject("_id",_data[x].name,"skill","name",user_skill_array[x-1],"rating",new_rating);
        dbs.editUserObject("_id",_data[x].name,"skill","name",user_skill_array[x-1],"counter",(user_counter_array[x-1]+1));
    }
    let project_skill_data=_data[0].value.split(";");
    let project_rating=parseInt(project_skill_data[1]);
    dbs.editProjects("_id",req.query.id,"reviewed","Yes");
    dbs.completeProject(req.query.id,project_rating,function(res){});
    res.send("display_reviews");

});

module.exports = router;