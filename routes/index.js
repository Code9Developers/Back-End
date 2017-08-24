const express = require('express');
const router = express.Router();
const mongoose = require('mongoose') ;
const schemas = require('.././database/schemas.js') ;
const dbs = require('.././database/dbs.js') ;
const test_data = require('.././database/test_data.js') ;
const algorithm = require('.././database/Resource-Alocation-Algorithm.js');
const generator = require('generate-password');
const nodemailer = require('nodemailer');

var employees;

/**
 * ROUTING REQUESTS
 */

//Home page
router.get('/', function(req, res, next) {
    res.render('login');
});

//Project Creation Page
router.get("/project_creation",function (req,res,next) {
    res.render('project_creation');
});
//Project Milestones Page
router.get("/project_milestone",function (req,res,next) {
    res.render('project_milestones');
});

//Project Edit Page
router.get("/project_edit",function (req,res,next) {
    res.render('project_edit');
});

//Project Detail Page
router.get("/project_detail",function (req,res,next) {
    res.render('project_view');
});

// Calendar Page
router.get("/calendar", function (req,res, next) {
        res.render('calendar');
});

router.get("/calendar_events", function (req,res, next){
        //res.render('calendar');
    var project_id;
    dbs.findUsers("_id",req.session.username,function (user) {
        project_id=user[0].current_projects[0];
        console.log("Test")
        console.log(project_id);
        var project=dbs.findProjects("_id",project_id,function (project) {
            res.send(project);
        });

    })
    });

//Employees Dashboard
router.get("/user_dashboard", function (req,res, next){
    res.render('index_dashboard');
});

//Admin/Register Employee page
router.get('/admin',function (req,res,next) {
    res.render("admin");
});

//Employees page(display all employees)
router.get('/employees',function (req,res,next) {
    res.render("employees");
});

/**
 *
 * Page: Login.ejs
 * Author: Seonin David
 * Functionality: Authenticates the user when signing in
 * Bug:     If user not found need to route back and display appropriate message
 *
 */
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

router.post('/login',function (req,res,next) {
    req.session.username=req.body.username;
    req.session.password=req.body.password;

    var user=dbs.findUsers("_id",req.session.username, function(user) {
        console.log(user[0]);
        console.log(user[0].role);
        if(user[0].role=="Manager"){
            req.session.name=user[0].name;
            req.session.surname=user[0].surname;
            req.session.role=user[0].role;
            res.redirect('project_creation');
        }
        else if(user[0].role=="Admin"){
            res.redirect('employees');
        }
        else{
            res.redirect('user_dashboard');
        }
    });
});


/**
 *
 * Page: project_creation.ejs
 * Author(s): Seonin David
 * Functionality:   - Gets all the data for the specific project
 *                  - Creates the project (Calling @insertProject)
 *                  - Assigns employees to projects and projects to employees
 *                  - Sends each employee that has been assigned a notification
 *
 * Bug:             -Make the date changer a function
 *
 */

router.get('/store_emp',function (req,res,next) {
    var el=JSON.parse(req.param("emplArr"));
    var num_empl=parseInt(JSON.parse(req.param("num_empl")));

    console.log(el);
    console.log(num_empl);

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
    var moment = require('moment');

    var rand_id=Math.floor((Math.random() * 100) + 1).toString();
    var project_id=("kpmg_"+req.body.projectname+rand_id).replace(/\s/g,'');


    //var start_date=(req.body.start_date).replace(/\//g,'-');
    var start_date=(req.body.start_date);
    var s=start_date.split("/");
    var newStartDate=new Date((s[2]+"-"+s[1]+"-"+s[0]).toString());

    var end_date=((req.body.end_date));
    var temp_end_date=end_date.split("/");
    var new_end_date=new Date((temp_end_date[2]+"-"+temp_end_date[1]+"-"+temp_end_date[0]).toString());

    var today = new Date();
    var e=employees.split(",");
    var tts=JSON.parse(JSON.stringify(e));

    var project={
        _id: project_id,
        name: req.body.projectname,
        description: req.body.projectdescription,
        project_start_date: newStartDate,
        project_end_date: new_end_date,
        owner_name: req.body.projectowner,
        owner_contact: req.body.projectownercontact,
        owner_email: req.body.projectowneremail,
        manager_id: req.session.username,
        employees_assigned:tts,
        project_budget:req.body.budget,
        status:"active"
    };


    dbs.insertProject(project);
    for(var x in e)
    {
        dbs.assignProject(e[x], project_id) ;

        dbs.insertNotification({
            _id: e[x]+project_id,
            user_id: e[x],
            message: "You have been assigned to a new project.\nProject name:"+req.body.projectname+"\n Project owner: "+req.body.projectowner,
            date_created: today,
            isRead: false
        }) ;
    }
    res.redirect('projects');

});

/**
 *
 * Page: project_edit.ejs
 * Author(s): Seonin David
 * Functionality:   - Allows the project manager to edit the project deadline
 *                  - Remove employees
 *                  - Assign new employees (Done after remove)
 *
 * Bug:             - Need to calculate project duration using start and end date (If that is still being used in the algorithm)
 *                  - Send project budget through
 *                  - Possibly need to use delete employees skills to send to the algorithm
 *
 */
router.get('/project_edit_delete', function(req, res, next){
    var ids=req.param("rem_ids");
    var project_id=req.param("id");


    algorithm.get_unallocated_users(ids.length,'Aduiting', 5,  3000,function(val) {
        for(var c in val)
        {
            dbs.assignProject(val[c]._id,project_id)
        }
        var result = JSON.stringify(val);
        for(var y in ids){
            dbs.dismissProject(ids[y],project_id);
        }

        res.send(result);
    });
    res.contentType('application/json');

});

router.get('/data_project_edit',function (req,res,next) {
    var id=req.param("id");
    var current_project=dbs.findProjects("_id",id,function (current_project) {
        res.send(current_project[0]);
    }) ;
    // res.render("admin");
});

router.get('/find_project_users', function(req, res, next)
{
    var id=req.param("id");
    var docs = dbs.findUsers("current_projects", id, function(docs) {
        res.send(JSON.parse(JSON.stringify(docs))) ;
    });
});

router.get('/change_project_date',function (req,res,next) {
    var id=req.param("id");
    var oldDate="";
    var current_project=dbs.findProjects("_id",id,function (current_project) {
        oldDate=current_project[0].project_end_date;
    }) ;

    var tempDate=req.param("new_date");
    var tempDateArray=tempDate.split("/");
    var newDate=new Date((tempDateArray[2]+"-"+tempDateArray[1]+"-"+tempDateArray[0]).toString());

    console.log(newDate);
    console.log(oldDate);
    dbs.editProjects("_id",id,"project_end_date",newDate);
    res.send("Done");
});



/**
 -----------------------------------------------------------------------------------------------------------------------
 *  Name: SMTP
 *  Author: Joshua Moodley
 *  Date: 21 Aug 2017 R1
 -----------------------------------------------------------------------------------------------------------------------
 */
// Register Emp
router.post('/register_employee',function (req,res,next) {
    var rand_password = generator.generate({
        length: 8,
        numbers: true,
        symbols: true,
        uppercase: true
    });

    var today = new Date();
    dbs.encrypt(rand_password, function (enc_pass) {
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
            past_projects:req.body.pastprojects};

        dbs.insertUser(emp);

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, // secure:true for port 465, secure:false for port 587
            auth: {
                user: 'code9devs@gmail.com',
                pass: 'clarence420'
            }
        });

        // setup email data with unicode symbols
        let mailOptions  =
        {
                from: '"Code 9 👻👻👻 BOO!!" <code9devs@gmail.com>', // sender address
                to: 'code9devs@gmail.com,' + emp.email, // list of receivers
                subject: 'KPMG Employee Registration Details - NO REPLY', // Subject line
                // plain text body
                // text: 'Welcome ' + emp.name + ' ' + emp.surname + '\nYour password is: ' + rand_password
                // html body
                html: 'Welcome ' + emp.name + ' ' + emp.surname + '<br/> Your password is: ' + '<b>' +rand_password + '</b>'
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error)
            {
                return console.log(error);
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
        });

        res.redirect('dashboard');
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
        res.send(all_projects);

    });
});

router.get("/all_employees",function (req,res,next) {

    var all_users=dbs.findUsers("role", "Employee",function (all_users) {
        res.send(all_users);
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



router.get("/logout",function (req,res,next) {
    req.session.reset();
    res.redirect('/');
});



router.get("/create_test_data", function (req,res, next){
    res.render('login');
    test_data.create_test_employees();
    //test_data.create_test_projects();
});


/**
 * Page: admin.ejs
 * Functionality: Display past projects on admin page
 * Author: Seonin David
 * Note: The past projects that are being displayed are test projects, eventually actual past projects
 * will need to be displayed
 */

router.get('/get_past_projects', function(req, res, next)
{
    var past_projects=dbs.findProjects("status","completed",function (past_projects) {
        res.send(past_projects);
    })
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

    var temp_end_date=end_date.split("/");
    var new_end_date=new Date((temp_end_date[2]+"-"+temp_end_date[1]+"-"+temp_end_date[0]).toString());
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
        milestone_end_date: new_end_date
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
    res.redirect('/');
});

/**
 -----------------------------------------------------------------------------------------------------------------------
 *Name: Task Functionality
 *Author: Seonin David
 *
 -----------------------------------------------------------------------------------------------------------------------
 * */
router.get('/create_task', function(req, res, next)
{
    var project_id=req.param('project_id');
    var milestone_id=req.param('milestone_id');
    var task=req.param('task');
    var emp_assigned=req.param('emp_assigned');
    var rand_password = generator.generate({
        length: 10,
        numbers: true,
        symbols: true,
        uppercase: true
    });

    var _id=milestone_id.substr(0,5)+project_id+rand_password;
    var emp_json={ _id: _id,
        description: task,
    project_id: project_id,
    milestone_id: milestone_id,
    employees_assigned: emp_assigned};

    dbs.insertTask(emp_json);

    res.send("Succuess");

});

router.get('/get_tasks', function(req, res, next)
{
    var project_id=req.param('id');
    var tasks=dbs.findTasks("project_id",project_id,function (tasks) {
        console.log(tasks);
        res.send(tasks);
    });

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
    test_data.create_All_test_employees(1, 30);
    res.render('login');
});

//Removes the 5 test employees from the database
// router.get('/remove_test_employees', function(req, res, next)
// {
//     test_data.remove_users();
//     res.render('login');
// });
//
//
// router.get('/remove_test_projects', function(req, res, next)
// {
//     test_data.remove_projects();
//     res.render('login');
// });

// router.get('/remove_test_notifications', function(req, res, next)
// {
//     test_data.remove_notifications();
//     res.render('login');
// });
//
// router.get('/remove_test_tasks', function(req, res, next)
// {
//     test_data.remove_tasks();
//     res.render('login');
// });

// router.get('/view_test_employees', function(req, res, next)
// {
//     test_data.view_users();
//     res.render('login');
// });

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

router.get("/create_past_projects",function (req,res,next) {
    //Because of the Math.floor() we get a less managers than planned
    //And and less years for projects than we give
    test_data.create_past_Projects(1);
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
