/**
 * Created by Jordan on 21-Jul-17.
 */
var exports = module.exports = {} ;

var mongoose = require('mongoose') ;
var schemas = require('.././database/schemas.js') ;
var dbs = require('.././database/dbs.js') ;
var generator = require('generate-password');
var connection = require('.././database/connect.js') ;

exports.get_unallocated_users = function(number, callback) {
  console.log("unallocated users requested");
    var user = schemas.user;

    user.find({current_projects: []},function (err, result) {
        if (err) {
            console.log("Error finding User.");
        }
        else if (!result) {
            console.log("User not found.");
        }
        else {
            console.log("User found.");
            //console.log(JSON.stringify(result));
            return callback(result);
        }
    }).limit(number);
};

//A function to statically create employees into the db
exports.create_test_employees = function() {
    console.log("creating a user");

    var rand_password = generator.generate({
        length: 10,
        numbers: true,
        symbols: true,
        uppercase: true
    });

    var today = new Date();
    var enc_pass = dbs.encrypt(rand_password, function (enc_pass) {
        var emp = {
            _id: 1,
            name: "employee1",
            surname: "test",
            password: enc_pass,
            password_date: today,
            email: "employee1@gmail.com",
            role: "System test",
            employment_length: 1,
            skill: [],
            current_projects: [],
            past_projects: []
        };

        var emp2 = {
            _id: 2,
            name: "employee2",
            surname: "test",
            password: enc_pass,
            password_date: today,
            email: "employee2@gmail.com",
            role: "System test",
            employment_length: 1,
            skill: [],
            current_projects: [],
            past_projects: []
        };

        var emp3 = {
            _id: 3,
            name: "employee3",
            surname: "test",
            password: enc_pass,
            password_date: today,
            email: "employee3@gmail.com",
            role: "System test",
            employment_length: 1,
            skill: [],
            current_projects: [],
            past_projects: []
        };

        var emp4 = {
            _id: 4,
            name: "employee4",
            surname: "test",
            password: enc_pass,
            password_date: today,
            email: "employee4@gmail.com",
            role: "System test",
            employment_length: 1,
            skill: [],
            current_projects: [],
            past_projects: []
        };

        var emp5 = {
            _id: 5,
            name: "employee5",
            surname: "test",
            password: enc_pass,
            password_date: today,
            email: "employee5@gmail.com",
            role: "System test",
            employment_length: 1,
            skill: [],
            current_projects: [],
            past_projects: []
        };
        //dbs.remove({name: "Testy"});  /*THIS deletes all previous users in the db*/
        dbs.insertUser(emp);
        dbs.insertUser(emp2);
        dbs.insertUser(emp3);
        dbs.insertUser(emp4);
        dbs.insertUser(emp5);
        console.log("employees added to data base")
    });
};

//A function to display the db in the terminal
exports.view_employees = function()
{
    console.log("viewing all employees in user db");
    var user = schemas.user;
    user.find(function (err, result) {
        if (err) {
            console.log("Error displaying users.");
        }
        else if (!result) {
            console.log("database is empty.");
        }
        else {
            console.log("employees found");
            console.log(JSON.stringify(result));
        }
    });
};