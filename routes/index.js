var express = require('express');
var router = express.Router();
var mongoose = require('mongoose') ;
var schemas = require('.././database/schemas.js') ;
var dbs = require('.././database/dbs.js') ;
var test_data = require('.././database/test_data.js') ;
var algorithm = require('.././database/Resource-Alocation-Algorithm.js');
var generator = require('generate-password');

var employees;
function login_check(req, res, next) {
    var result=dbs.authenticate(req.body.username,req.body.password,function (result) {
        console.log("result found");
        if(result)
        {
            return next();
        }
        else
        {
            res.redirect('/');
            console.log("Redirecting to login page");
        }
    });
}

function isAuntenticated(req,res,next) {
    dbs.authenticate(req.session.username,req.body.session,function (result) {
        if(result)
        {
            return next();
        }
        else
        {
            res.redirect('/');
        }
    });
}


router.get('/', function(req, res, next) {
    res.render('login');
});

router.post('/dashboard',function (req,res,next) {
    req.session.username=req.body.username;
    req.session.password=req.body.password;

    var user=dbs.findUsers("_id",req.session.username, function(user) {

        if(user.role=="Manager"){
            req.session.name=user[0].name;
            req.session.surname=user[0].surname;
            req.session.role=user[0].role;
            res.render('project_creation');
        }
        else if(user.role=="Admin"){
            res.render('admin');
        }
        else{
            res.render('project_creation');
        }
    });
});

router.get("/project_creation",function (req,res,next) {
    res.render('project_creation',{role:req.session.role,name:req.session.name,surname:req.session.surname});
});

router.get('/store_emp',function (req,res,next) {
    var el=JSON.parse(req.param("emplArr"));
    var num_empl=parseInt(JSON.parse(req.param("num_empl")));


    employees="";
    for(var key in el){

        if(parseInt(key)==(num_empl-1)){
            employees=employees+el[key]._id+"";
        }
        else{
            employees=employees+el[key]._id+",";
        }
    }

    console.log("EMP: "+employees);
});

router.post("/project_creation",function (req,res,next) {
    var rand_id=Math.floor((Math.random() * 100) + 1).toString();
    var project_id=("kpmg_"+req.body.projectname+rand_id).replace(/\s/g,'');

    var project={
        _id: project_id,
        name: req.body.projectname,
        description: req.body.projectdescription,
        project_start_date: req.body.start_date,
        project_end_date: req.body.end_date,
        owner_name: req.body.projectowner,
        owner_contact: req.body.projectownercontact,
        owner_email: req.body.projectowneremail,
        manager_id: req.session.username,
        project_budget:req.body.budget,
        status:"active"
    };


    dbs.insertProject(project);
    var today = new Date();
    var e=employees.split(",");
    for(var x in e)
    {
        dbs.assignProject(e[x], project_id) ;
        dbs.assignProject(e[x], project_id) ;
        dbs.insertNotification({
            _id: e[x]+project_id,
            user_id: e[x],
            message: "You have been assigned to a new project.\nProject name:"+req.body.projectname+"\n Project owner: "+req.body.projectowner,
            date_created: today,
            isRead: false
        }) ;
    }

    res.render('project_detail');

});

router.get('/find_project_users', function(req, res, next)
{
    var id=req.param("id");
    var docs = dbs.findUsers("current_projects", id, function(docs) {
        res.send(JSON.parse(JSON.stringify(docs))) ;
    });
});
router.get('/data_project_edit',function (req,res,next) {
    var id=req.param("id");
    var current_project=dbs.findProjects("_id",id,function (current_project) {
        console.log(current_project[0]);
        res.send(current_project[0]);
    }) ;
    // res.render("admin");
});
router.get('/admin',function (req,res,next) {
    res.render("admin");
});

router.post('/register_employee',function (req,res,next) {
    var rand_password = generator.generate({
        length: 10,
        numbers: true,
        symbols: true,
        uppercase: true
    });
    // var temp_past_projects=(req.body.pastprojects).split(",");
    // var past_projects_length=parseInt(temp_past_projects.length);
    // var past_projects="[";
    // for(var i=0;i<past_projects_length;i++){
    //     if(i==past_projects_length-1){
    //         past_projects=past_projects+"{"+JSON.stringify("_id")+":"+JSON.stringify(temp_past_projects[i])+"}]";
    //     }
    //     else{
    //         past_projects=past_projects+"{"+JSON.stringify("_id")+":"+JSON.stringify(temp_past_projects[i])+"},";
    //     }
    // }
    // console.log(JSON.parse(JSON.stringify(past_projects)));
    // console.log(past_projects);

    var today = new Date();
    dbs.encrypt("test",function (enc_pass) {
        var emp = {
            _id: req.body.empid,
            name: req.body.firstname,
            surname: req.body.lastname,
            password:enc_pass ,
            password_date: today,
            contact:req.body.contact,
            email: req.body.email,
            role: req.body.role,
            position:req.body.position,
            employment_length: req.body.emp_length,
            skill: [req.body.skills],
            past_projects:req.body.pastprojects} ;

        dbs.insertUser(emp) ;
        res.render('index',{valu:JSON.stringify(emp)});
    });
});

router.get('/active_projects', function(req, res, next)
{
    var projects = dbs.findProjects("status", "active", function(projects) {
        res.send(JSON.stringify(projects));
    });

});

router.get('/assign_projects', function(req, res, next)
{
    dbs.assignProject("emp7", "kpmg_NetBank7") ;
    dbs.assignProject("emp8", "kpmg_NetBank7") ;
    //res.render('');
});

router.get("/all_projects",function (req,res,next) {

    var all_projects=dbs.findProjects("status", "active",function (all_projects) {
        console.log(all_projects);
        res.send(all_projects);

    });
});

router.get("/projects",function (req,res,next) {
    res.render('projects');
});

router.get("/username",function (req,res,next) {
    var user=dbs.findUsers("_id",req.session.username, function(user) {
        var fullname=user[0].name+" "+user[0].surname;
        res.send({name:fullname,id:req.session.username});
    });
});




router.get("/role",function (req,res,next) {
    var user=dbs.findUsers("_id",req.session.username, function(user) {
        res.send(user[0].role);
    });
});

router.get("/create_past_projects",function (req,res,next) {
    //Because of the Math.floor() we get a less managers than planned
    //And and less years for projects than we give
    test_data.create_past_Projects(15);
    res.render('login');
});

router.get("/logout",function (req,res,next) {
    req.session.reset();
    res.redirect('/');
});

router.get("/project_milestone",function (req,res,next) {
    res.render('project_milestones');
});

router.get("/project_edit",function (req,res,next) {
    res.render('project_edit');
});

router.get("/project_detail",function (req,res,next) {
    res.render('project_view');
});
//FUNCTIONS CREATED FOR TESTING OR TO BYPASS SESSION MANAGEMENT

//Easy access to project creation page
router.get('/test_project_creation', function(req, res, next)
{
    res.render('project_creation');
});

//Creates 5 test emplyees into the database
router.get('/create_test_employees', function(req, res, next)
{
    //dbs.create_test_employees();
    test_data.create_All_test_employees(30, 270);
    res.render('login');
});

router.get('/create_test_project', function(req, res, next)
{
    //dbs.create_test_employees();
    test_data.create_test_project();
    res.render('login');
});



/**
 -----------------------------------------------------------------------------------------------------------------------
 * Page: Milestone.ejs
 * Author: Seonin David
 -----------------------------------------------------------------------------------------------------------------------
 * */
router.get('/store_milestones', function(req, res, next)
{
    var project_id=req.param('id');
    var milestone_name=req.param('milestone_name');
    var end_date=req.param('end_date');

    var rand_password = generator.generate({
        length: 100,
        numbers: true,
        symbols: true,
        uppercase: true
    });

    var milstone_id=milestone_name.substr(0,4)+project_id+rand_password;

    var milestone_json={
        _id: milstone_id,
        project_id: project_id,
        description: milestone_name,
        milestone_end_date: end_date.replace("/","-")
    };
    dbs.insertMilestone(milestone_json);
    res.send("Got it!!");
});

router.get('/get_milestones', function(req, res, next)
{
    var project_id=req.param('id');
    var all_milestones=dbs.findMilestones("project_id",project_id,function (all_milestones) {
        res.send(all_milestones);
    });
});

/**
 -----------------------------------------------------------------------------------------------------------------------
 *Page: Notifications functionality
 *Author: Jacques Smulders
 -----------------------------------------------------------------------------------------------------------------------
 * */
router.get('/unread_notifications', function(req, res, next)
{
    var unread = dbs.unreadNotifications(req.param('_id'), function(unread) {
        res.send(unread);
    });

});

router.get('/create_test_notifications', function(req, res, next)
{
    test_data.create_test_notifications();
    res.render('login');
});

router.get('/assign_projects', function(req, res, next)
{
    //res.send(JSON.parse(JSON.stringify("emp9")),"kpmg_bbbbbbbb20");
    res.send(JSON.parse(JSON.stringify("emp9")),"kpmg_bbbbbbbb20");

});

//Removes the 5 test employees from the database
// router.get('/remove_test_employees', function(req, res, next)
// {
//     test_data.remove_users();
//     res.render('login');
// });

router.get('/remove_test_employees', function(req, res, next)
{
    test_data.remove_users();
    res.render('login');
});

router.get('/remove_test_projects', function(req, res, next)
{
    test_data.remove_projects();
    res.render('login');
});

router.get('/remove_test_notifications', function(req, res, next)
{
    test_data.remove_notifications();
    res.render('login');
});

router.get('/remove_test_tasks', function(req, res, next)
{
    test_data.remove_tasks();
    res.render('login');
});

router.get('/view_test_employees', function(req, res, next)
{
    test_data.view_users();
    res.render('login');
});

// router.get('/view_test_projects', function(req, res, next)
// {
//     var s= test_data.view_projects();
//     console.log("s:"+JSON.parse(JSON.stringify(s)));
//     //res.send();
// });

router.get('/refresh_project_status', function(req, res, next)
{
    dbs.refreshProjectStatus();
    res.render('login');
});

router.get('/test_algorithm', function(req, res, next) {
    console.log("employee allocation requested");
    console.log("the request number of employees is "+req.param('num_empl'));
    console.log("the request skills of employees is "+req.param('skills'));
    console.log("the request duration of project is "+req.param('duration'));
    console.log("the request budget of project is "+req.param('budget'));

    //dbs.view_employees();
    algorithm.get_unallocated_users(req.param('num_empl'),req.param('skills'), req.param('duration'),  req.param('budget'), function(val) {
        var result = JSON.stringify(val);
        employees=JSON.parse(result);
        res.send(result);
    });
    res.contentType('application/json');
});



module.exports = router;
