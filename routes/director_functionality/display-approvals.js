const express = require('express');
const router = express.Router();
const dbs = require('../../database/dbs');
// const generator = require('generate-password');


/**
 * Page:
 * Functionality: Display approvals
 * Note:
 * Bug(s): N/A
 *
 * Author(s): author
 * Date Revised: DD/MM/2017 by author
 * Date Revised: 02/10/2017 by Joshua Moodley
 */
// router.get('/get_all_approvals', function (req, res, next) {
//     dbs.find_approval("director_id",req.session.username, function (data) {
//         res.send(data[0].reason)
//     })
// });
router.get('/approvals', function (req, res, next) {
   res.render("display_all_approvals")
});

router.get('/get_all_approvals', function (req, res, next) {
    dbs.find_approval("director_id",req.session.username, function (data) {
        res.send(data)
    })
});

router.get("/director_dashboard", function (req, res, next) {
    res.render('director_dashboard');
});

router.get("/employee_swap", function (req, res, next) {
    res.render('employee_swap');
});

router.get("/analytics", function (req, res, next) {

    dbs.managerEmployeeCorrelation(function (data) {
        res.send(data);
        // var reformed_data=[];
        // for(count in data){
        //     let emps=data[count].employees_worked_with;
        //     let manager=data[count].manager_id;
        //     let emp_ids=[];
        //     let hours=[];
        //     for(let x in emps){
        //         emp_ids[x]=emps[x].employee_id;
        //         hours[x]=emps[x].hours_worked;
        //     }
        //     let final_output=[]
        //     dbs.get_all_users_names(emp_ids,function (d) {
        //
        //         for(let y in emp_ids){
        //             for(let i in emp_ids){
        //                 let one_user=d[i]._id;
        //                 if(one_user._id==emp_ids[y]){
        //                     final_output[y]={_id:emp_ids[y],name:one_user.name,surname:one_user.surname,hours:hours[y]}
        //                 }
        //             }
        //         }
        //     });
        //     reformed_data[count]={manager_id:manager,employees:final_output};
        //
        // }
        // res.send(reformed_data);
    })
});
module.exports = router;