var exports = module.exports = {} ;

var mongoose = require('mongoose') ;
var connection = require('.././database/connect.js') ;
var mongoose = require('mongoose') ;

exports.create_schemas = function() {

    var db = connection.db ;

    create_user(db) ;

    create_project(db) ;

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
        email : String,
        role: String,
        position: String,
        employment_length: Number, //years? months?
        skill: [],
        current_projects: [], //-> stores project id's
        past_projects: [] //-> stores project id's
    }) ;

    var user = mongoose.model('user', schema) ;
    exports.user = user ;

    console.log('User schema created.') ;

}

function create_project(db) {

    var schema = mongoose.Schema({
        _id: String,
        name: String,
        description: String,
        project_duration: String,
        owner_name: String,
        owner_contact: String,
        owner_email: String,
        manager_name: String,
        manager_contact: String,
        manager_email: String,
        employees_assigned: [{employee_id: String, role: String}],
        emmployee_rates: [{employee_id: String, rate: Number}],
        project_budget: Number
    }) ;

    var project = mongoose.model('project', schema) ;
    exports.project = project ;

    console.log('Project schema created.') ;
}