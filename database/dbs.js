var exports = module.exports = {} ;

var mongoose = require('mongoose') ;
var schemas = require('.././database/schemas.js') ;
var connection = require('.././database/connect.js') ;
var bcrypt = require('bcrypt') ;

exports.insertEmployee = function() {

    var employee = schemas.employee ;

    var employee1 = new employee({
        _id: 'some_id_123',
        name: 'John',
        surname: 'Doe',
        password: 'HardToGuess',
        role: 'Employee', //add more if necessary
        employment_length: '7', //years? months?
        skill: ['No idea', 'how the format', 'for this will work']
    }) ;

    employee1.save(function (err) {
        if (err) {
            console.log("Employee could not be saved.") ;
            console.log(err) ;
        }
        else {
            console.log("Successfully inserted test employee.") ;
        }
    }) ;

}


exports.findEmployee = function() {

    var employee = schemas.employee;

    employee.findOne({_id: 'some_id_123'}, function (err, doc) {
        if (err) {
            console.log("Error finding  document.");
        }
        else if (!doc) {
            console.log("Document not found.");
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