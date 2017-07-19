var exports = module.exports = {} ;

var mongoose = require('mongoose') ;
var schemas = require('.././database/schemas.js') ;
var connection = require('.././database/connect.js') ;
var bcrypt = require('bcrypt') ;

exports.insertEmployee = function(_json) {

    var employee = schemas.employee ;

    var employee1 = new employee(_json) ;

    employee1.save(function (err) {
        if (err) {
            console.log("Employee could not be inserted.") ;
            console.log(err) ;
        }
        else {
            console.log("Successfully inserted employee.") ;
        }
    }) ;

}

//other search templates could be added
exports.findEmployee = function(Id) {

    var employee = schemas.employee;

    employee.findOne({_id: Id}, function (err, doc) {
        if (err) {
            console.log("Error finding Employee.");
        }
        else if (!doc) {
            console.log("Employee not found.");
        }
        else {
            console.log(doc);
        }
    });
}

exports.insertProject = function(_json) {

    var project = schemas.project ;

    var project1 = new project(_json) ;

    project1.save(function (err) {
        if (err) {
            console.log("Project could not be inserted.") ;
            console.log(err) ;
        }
        else {
            console.log("Successfully inserted project.") ;
        }
    });
}

exports.findProject = function(Id) {

    var project = schemas.project;

    project.findOne({_id: Id}, function (err, doc) {
        if (err) {
            console.log("Error finding Project.");
        }
        else if (!doc) {
            console.log("Project not found.");
        }
        else {
            console.log(doc);
        }
    });
}

function encrypt(value, callback) {
    bcrypt.hash(value, 10, function(err, hash) {
        return callback(hash) ;
    });
}

//to call encyrpt:
/*
 var hashed = encrypt(<password>, function(hashed) {
    //use hashed as result
    console.log("Hashed password: " + hashed);
 })
 */