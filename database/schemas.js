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

    var schema = mongoose.Schema({
        _id: String,
        name: String,
        surname: String,
        password: String,
        //password_date: Date, //could be countdown integer
        //profile_pic: Document,
        //email : String,
        role: String,
        employment_length: Number, //years? months?
        skill: []
        //current projects [] -> stores project id's
        //past projects [] -> stores project id's
    }) ;

    var employee = mongoose.model('employee', schema) ;
    exports.employee = employee ;

    console.log('Employee schema created.') ;

}

function create_project(db) {

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