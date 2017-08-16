var exports = module.exports = {} ;

var mongoose = require('mongoose') ;
var connection = require('.././database/connect.js') ;
var mongoose = require('mongoose') ;

exports.create_schemas = function() {

    var db = connection.db ;

    create_user(db) ;

    create_project(db) ;

    create_task(db) ;

    create_notification(db) ;

    console.log("Schemas successfully created.") ;

 };


//all schema initialser functions are below -->

function create_user(db) {
    var schema = mongoose.Schema({
        _id: String,
        name: String,
        surname: String,
        password: String,
        password_date: Date, //could be countdown integer
        //profile_pic: Document,
        contact: String,
        email : String,
        role: String,
        position: String,
        employment_length: Number, //years? months?
        skill: [],
        current_projects: [{_id: String}], //-> stores project id's
        past_projects: []
        // past_projects: [{_id: String}] //-> stores project id's
    }) ;

    var user = mongoose.model('user', schema) ;
    exports.user = user ;

    console.log('User schema created.') ;

}

//removed:
//manager_name
//manager_contact
//manager_email

//added:
//manager_id
//tasks
function create_project(db) {

    var schema = mongoose.Schema({
        _id: String,
        name: String,
        description: String,
        project_start_date: Date,
        project_end_date: Date,
        owner_name: String,
        owner_contact: String,
        owner_email: String,
        manager_id: String,
        employees_assigned: [{_id: String, role: String}],
        employee_rates: [{_id: String, rate: Number}],
        project_budget: Number,
        tasks: [{task_id: String}],
        status: String
    }) ;

    var project = mongoose.model('project', schema) ;
    exports.project = project ;

    console.log('Project schema created.') ;
}

function create_task(db) {

    var schema = mongoose.Schema({
        _id: String,
        description: String,
        project_id: String, //project that the task is part of
        employees_assigned: [{_id: String}]
    }) ;

    var task = mongoose.model('task', schema) ;
    exports.task = task ;

    console.log('Task schema created.') ;
}

function create_notification(db) {

    var schema = mongoose.Schema({
        _id: String,
        user_id: String, //id of user that notification is intended for
        message: String,
        date_created: Date,
        isRead: Boolean
    }) ;

    var notification = mongoose.model('notification', schema) ;
    exports.notification = notification ;

    console.log('Notification schema created.') ;
}