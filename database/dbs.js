var exports = module.exports = {} ;

var mongoose = require('mongoose') ;
var schemas = require('.././database/schemas.js') ;
var connection = require('.././database/connect.js') ;
var bcrypt = require('bcrypt') ;
var generator = require('generate-password');

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

//other search templates could be added

exports.findUser = function(Id, callback) {

    var user = schemas.user;

    user.findOne({_id: Id}, function (err, doc) {
        if (err) {
            console.log("Error finding User.");
        }
        else if (doc == "[]") {
            console.log("User not found.");
        }
        else {
            console.log("User found.") ;
            return callback(doc) ;
        }
    });
};

//returns all (max{number}) users where attributes 'attrib' have value of 'value'
exports.findUsers = function(attrib, value, number, callback) {

    var user = schemas.user ;

    user.find({ attrib: value }, function(err, docs) {
        if (err) {
            console.log("Error finding Users.") ;
            console.log(err) ;
        }
        else if (doc == "[]") {
            console.log("No Users found.") ;
        }
        else {
            console.log("Users found.") ;
            return callback(docs);
        }
    }).limit(number);
}

//should we have a function like this for every attribute of each schema?
exports.getUserRole = function(user_id, callback) {
    module.exports.findUser(user_id, function(user) {
        if (!user) {
            console.log("User not found.") ;
        }
        else {
            console.log(user.role + " found.") ;
            return callback(user.role) ;
        }
    })
};

//assigns project to user and vice versa
exports.assignProject = function(user_id, project_id) {

    var user = schemas.user ;
    var project = schemas.project ;

    user.findByIdAndUpdate( user_id , { $push: {current_projects: {_id: project_id}}}, function(err) {
        if (!err) {
            console.log("Project added to User.") ;
        }
        else {
            console.log("Error adding Project to User.") ;
        }
    });

    project.findByIdAndUpdate( project_id , { $push: {employees_assigned: {_id: user_id}}}, function(err) {
        if (!err) {
            console.log("User added to Project.") ;
        }
        else {
            console.log("Error adding User to Project.") ;
        }
    });

    //employee rates?
};

//remove employee from project and vice versa
exports.dismissProject = function(user_id, project_id) {
    //will be implemented later
};

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

exports.findProject = function(Id, callback) {

    var project = schemas.project;

    project.findOne({_id: Id}, function (err, doc) {
        if (err) {
            console.log("Error finding Project.");
        }
        else if (doc == "[]") {
            console.log("Project not found.");
        }
        else {
            console.log("Project found.") ;
            return callback(doc) ;
        }
    });
};

//returns all projects where attributes 'attrib' have value of 'value'
exports.findProjects = function(attrb, value, number, callback) {

    var project = schemas.project ;

    project.find({ attrib: value }, function(err, docs) {
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
    }).limit(number);
};

//checks if projects are complete and updates status
exports.refreshProjectStatus = function() {
    var project = schemas.project ;
    var today = new Date() ;

    project.update( { project_end_date: {$lt: today}} , { $set: {status: "completed"}}, function(err) {
        if (!err) {
            console.log("Projects status updated.") ;
        }
        else {
            console.log("Error updating Projects status.") ;
        }
    });
};

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
    })
};

