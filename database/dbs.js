var exports = module.exports = {} ;

var mongoose = require('mongoose') ;
var schemas = require('.././database/schemas.js') ;
var connection = require('.././database/connect.js') ;
var bcrypt = require('bcrypt') ;
var generator = require('generate-password');


/*
 ***********************************************************************************************************************
 ALL USER-RELATED FUNCTIONS BELOW --->>
 ***********************************************************************************************************************
*/

// inserts user defined in JSON string "_json"
exports.insertUser = function(_json) {

    var user = schemas.user ;

    var _user = new user(_json) ;

    _user.save(function (err) {
        if (err) {
            console.log(_user.role + " could not be inserted.") ;
            console.log(err) ;
        }
        else {
            console.log("Successfully inserted " + _user.role + ".") ;
        }
    }) ;
};

// returns all users where attributes 'attrib' have value of 'value'
exports.findUsers = function(attrib, value, callback) {

    var user = schemas.user ;
    var query = JSON.parse('{ ' + "\"" + attrib + "\"" + ': ' + "\"" + value + "\"" + '}') ;

    user.find(query, function(err, docs) {
        if (err) {
            console.log("Error finding Users.") ;
            console.log(err) ;
        }
        else if (docs == "[]") {
            console.log("No Users found.") ;
        }
        else {
            console.log("Users found.") ;
            return callback(docs);
        }
    });
};

// finds all users with attribute "attrib" of value "value",
// and sets their attribute of "attrib_to_edit" to "new_value"
exports.editUsers = function(attrib, value, attrib_to_edit, new_value) {

    var user = schemas.user ;
    var query = JSON.parse('{ ' + "\"" + attrib + "\"" + ': ' + "\"" + value + "\"" + '}') ;
    var update = JSON.parse('{ ' + "\"" + attrib_to_edit + "\"" + ': ' + "\"" + new_value + "\"" + '}') ;

    user.update( query, { $set: update}, function(err) {
        if (!err) {
            console.log("User " + attrib_to_edit + "\'s updated.") ;
        }
        else {
            console.log("Error updating " + attrib_to_edit + "\'s of Users.") ;
            console.log(err) ;
        }
    });
};

/*
 ***********************************************************************************************************************
 ***********************************************************************************************************************
*/

/*
 ***********************************************************************************************************************
 ALL USER+PROJECT-RELATED FUNCTIONS BELOW --->>
 ***********************************************************************************************************************
*/

// assigns project to user and vice versa
exports.assignProject = function(user_id, project_id) {
    module.exports.assignProjectToUser(user_id, project_id) ;
    module.exports.assignUserToProject(user_id, project_id) ;
};

exports.assignProjectToUser = function(user_id, project_id) {

    var user = schemas.user ;

    user.findByIdAndUpdate(user_id, {$push: {current_projects: project_id}}, function (err) {
        if (!err) {
            console.log("Project added to User.");
        }
        else {
            console.log("Error adding Project to User.");
            console.log(err) ;
        }
    });
};

exports.assignUserToProject = function(user_id, project_id) {

    var project = schemas.project;

    project.findByIdAndUpdate( project_id , { $push:  {employees_assigned: user_id}}, function(err) {
        if (!err) {
            console.log("User added to Project.") ;
        }
        else {
            console.log("Error adding User to Project.") ;
            console.log(err) ;
        }
    });

    //employee rates?
};

// remove employee from project and vice versa
exports.dismissProject = function(user_id, project_id) {
    //will be implemented later
};

/*
 ***********************************************************************************************************************
 ***********************************************************************************************************************
*/

/*
 ***********************************************************************************************************************
 ALL PROJECT-RELATED FUNCTIONS BELOW --->>
 ***********************************************************************************************************************
*/

// inserts project defined in JSON string "_json"
exports.insertProject = function(_json) {

    var project = schemas.project ;

    var project1 = new project(_json) ;

    project1.save(function (err) {
        if (err) {
            console.log("Project could not be inserted.") ;
            console.log(err) ;
        }
        else {
            console.log("Successfully inserted Project.") ;
        }
    });
};

// returns all projects where attributes 'attrib' have value of 'value'
exports.findProjects = function(attrib, value, callback) {

    var project = schemas.project ;
    var query = JSON.parse('{ ' + "\"" +attrib + "\"" + ': ' + "\"" + value + "\"" + '}') ;
    console.log(query) ;

    project.find(query, function(err, docs) {
        if (err) {
            console.log("Error finding Projects.") ;
            console.log(err) ;
        }
        else if (!docs) {
            console.log("No Projects found.") ;
        }
        else {
            console.log("Projects found.") ;
            return callback(docs);
        }
    });
};

// returns all projects
exports.findAllProjects = function(callback) {

    var project = schemas.project ;

    project.find({}, function(err, docs) {
        if (err) {
            console.log("Error finding Projects.") ;
            console.log(err) ;
        }
        else if (docs == "[]") {
            console.log("No Projects found.") ;
        }
        else {
            console.log("All Projects found.") ;
            return callback(docs);
        }
    });
};

// checks if projects are complete and updates status
exports.refreshProjectStatus = function() {
    var project = schemas.project ;
    var today = new Date() ;

    project.update( { project_end_date: {$lt: today}} , { $set: {status: "completed"}}, function(err) {
        if (!err) {
            console.log("Projects status updated.") ;
        }
        else {
            console.log("Error updating Projects status.") ;
            console.log(err) ;
        }
    });
};

// finds all projects with attribute "attrib" of value "value",
// and sets their attribute of "attrib_to_edit" to "new_value"
exports.editProjects = function(attrib, value, attrib_to_edit, new_value) {
    var project = schemas.project ;

    project.findByIdAndUpdate( project_id , { $set: {project_end_date: new_project_end_date}}, function(err) {
        if (!err) {
            console.log("Project end date updated.") ;
        }
        else {
            console.log("Error updating Project end date.") ;
            console.log(err) ;
        }
    });
};

/*
 ***********************************************************************************************************************
 ***********************************************************************************************************************
*/

/*
 ***********************************************************************************************************************
 ALL MILESTONE-RELATED FUNCTIONS BELOW --->>
 ***********************************************************************************************************************
 */

exports.insertMilestone = function(_json) {

    var milestone = schemas.milestone ;
    var project = schemas.project ;

    var milestone1 = new milestone(_json) ;

    milestone1.save(function (err) {
        if (err) {
            console.log("Milestone could not be inserted.") ;
            console.log(err) ;
        }
        else {
            console.log("Successfully inserted Project.") ;
        }
    });

    project.findByIdAndUpdate( milestone1.project_id, { $push: {milestones: milestone1}}, function(err) {
        if (!err) {
            console.log("Milestone inserted into Project.") ;
        }
        else {
            console.log("Error inserting Milestone into Project.") ;
            console.log(err) ;
        }
    });
};

//may need to compare doc.milestone to null for no milestones
exports.findMilestones = function(project_id, callback) {

    var milestone = schemas.milestone ;

    project.find(query, function(err, docs) {
        if (err) {
            console.log("Error finding Projects.") ;
            console.log(err) ;
        }
        else if (!docs) {
            console.log("No Projects found.") ;
        }
        else {
            console.log("Projects found.") ;
            return callback(docs);
        }
    });
};

//removes all expired milestones from project
exports.removeExpiredMilestones = function(project_id) {
    var project = schemas.project;
    var today = new Date() ;

    project.findByIdAndUpdate( project_id , { $pull:  {milestones: {end_date: {$lt: today}}}}, function(err) {
        if (!err) {
            console.log("Expired Milestone removed from Project.") ;
        }
        else {
            console.log("Error removing expired Milestone from Project.") ;
            console.log(err) ;
        }
    });
};

exports.editMilestoneEndDate = function(project_id, milestone_id, new_milestone_end_date) {
    var project = schemas.project ;

    project.findByIdAndUpdate( project_id , { $pull: {milestones: {_id: milestone_id}}}, function(err, result) {
        if (!err) {
            console.log("Milestone found.") ;
            result.end_date = new_milestone_end_date ;
            module.exports.insertMilestone(project_id, result) ;
        }
        else {
            console.log("Error updating Project end date.") ;
            console.log(err) ;
        }
    });
};

/*
 ***********************************************************************************************************************
 ***********************************************************************************************************************
 */

/*
 ***********************************************************************************************************************
 ALL TASK-RELATED FUNCTIONS BELOW --->>
 ***********************************************************************************************************************
 */

exports.insertTask = function(_json) {

    var task = schemas.task ;

    var _task = new task(_json) ;

    _task.save(function (err) {
        if (err) {
            console.log("Task could not be inserted.") ;
            console.log(err) ;
        }
        else {
            console.log("Successfully inserted Task.") ;
        }
    }) ;
};

/*
 ***********************************************************************************************************************
 ***********************************************************************************************************************
 */

/*
 ***********************************************************************************************************************
 ALL NOTIFICATION-RELATED FUNCTIONS BELOW --->>
 ***********************************************************************************************************************
 */

exports.insertNotification = function(_json) {

    var notification = schemas.notification ;

    var _notification = new notification(_json) ;

    _notification.save(function (err) {
        if (err) {
            console.log("Notification could not be inserted.") ;
            console.log(err) ;
        }
        else {
            console.log("Successfully inserted Notification.") ;
        }
    }) ;
};

//returns all unread notifications for specific user
exports.unreadNotifications = function(user_id, callback) {
    var notification = schemas.notification ;

    notification.find({ user_id: user_id, isRead: false}, function(err, docs) {
        if (err) {
            console.log("Error finding Notifications.") ;
            console.log(err) ;
        }
        else if (docs == "[]") { //for some reason, all collections are stored as follows "[ <collections> ]'
            console.log("No Unread Notifications found.") ;
        }
        else {
            console.log("Unread Notifications found.") ;
            return callback(docs);
        }
    });
};

/*
 ***********************************************************************************************************************
 ***********************************************************************************************************************
 */

/*
 ***********************************************************************************************************************
 ALL PASSWORD+ENCRYPTION-RELATED FUNCTIONS BELOW --->>
 ***********************************************************************************************************************
 */

exports.encrypt = function(value, callback) {
    bcrypt.hash(value, 10, function(err, hash) {
        return callback(hash) ;
    });
};

exports.authenticate = function(user_id, password, callback) {
    console.log("Authenticate Running with user_id: "+user_id+" and password : "+password); //must remove
    module.exports.findUser(user_id, function(user) {
        console.log("User details "+user);  //must remove
        var hash = user.password;
        console.log("Hashed password found is : "+hash);
        bcrypt.compare(password, hash, function (err, res) {
            if (err) {
                console.log("Authentication error.") ;
                console.log(err) ;
            }
            console.log("authenticated: " + res);
            return callback(res);
        });
    });
};

/*
 ***********************************************************************************************************************
 ***********************************************************************************************************************
 */

