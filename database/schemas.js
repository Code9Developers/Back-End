var exports = module.exports = {} ;

var mongoose = require('mongoose') ;
var connection = require('.././database/connect.js') ;
var mongoose = require('mongoose') ;

exports.create_schemas = function() {

    var db = connection.db ;

    create_employee(db) ;

    create_project(db) ;

    console.log("Schemas successfully created.") ;

 };


//all schema initialser functions are below -->

function create_employee(db) {
//  TO DO: Add position field eg.system analyst
    var schema = mongoose.Schema({
        _id: String,
        name: String,
        surname: String,
        password: String,
        password_date: Date, //could be countdown integer
        //profile_pic: Document,
        email : String,
        role: String,
        employment_length: Number, //years? months?
        skill: [],
        current_projects: [], //-> stores project id's
        past_projects: [] //-> stores project id's
    }) ;

    var employee = mongoose.model('employee', schema) ;
    exports.employee = employee ;

    console.log('Employee schema created.') ;

}

function create_project(db) {

    //TO DO:
    // project_length:String(shows project start date and end e.g. December 30, 2016)
    // owner_contact_details
    // owner_email
    // manager_email
    // manager_contact_details
    //CHANGE- manager->manager_name
    //CHANGE= owner->owner_name
    var schema = mongoose.Schema({
        _id: String,
        name: String,
        description: String,
        owner: String,
        manager: String,
        employees_assigned: [{employee_id: String, role: String}]
    }) ;

    var project = mongoose.model('project', schema) ;
    exports.project = project ;

    console.log('Project schema created.') ;
}