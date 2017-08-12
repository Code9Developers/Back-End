//This file is used to insert test data in the database

var exports =  module.exports = {} ;

var dbs = require('./dbs.js') ;
var schemas = require('./schemas.js') ;

exports.create_test_employees = function() {
    console.log("creating a user");

    var today = new Date();
    dbs.encrypt("test", function (enc_pass) {
        var emp = {
            _id: "emp1",
            name: "Sargon",
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
            _id: "emp2",
            name: "Nebuchadnezzar",
            surname: "test",
            password: enc_pass,
            password_date: today,
            email: "employee2@gmail.com",
            role: "Manager",
            employment_length: 1,
            skill: [],
            current_projects: [],
            past_projects: []
        };

        var emp3 = {
            _id: "emp3",
            name: "Xerxes",
            surname: "test",
            password: enc_pass,
            password_date: today,
            email: "employee3@gmail.com",
            role: "Admin",
            employment_length: 1,
            skill: [],
            current_projects: [],
            past_projects: []
        };

        var emp4 = {
            _id: "emp4",
            name: "Chandragupta",
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
            _id: "emp5",
            name: "Ptolemy",
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
        console.log("Test employees added to data base")
    });
};

//A function to statically create 50 employees into the db
//TODO: pull random names from a text file
exports.create_All_test_employees = function(num_manager, num_employees) {
    module.exports.encrypt("test", function (enc_pass) {
        var today = new Date();
        console.log("creating roles array");
        var roles = ["project manager", "employee"];
        var email = "employee1@gmail.com";
        var manager_ids = 1;
        var empoloyee_ids = 1;
        var emp_list = {};
        var emp_count = 0;
        console.log("creating managers");
        for (var loop = 0; loop < num_manager; loop++) {
            var new_json_obj = {
                _id: roles[0] + " " + manager_ids,
                name: roles[0] + " first_name" + manager_ids,
                surname: roles[0] + " second_name" + manager_ids,
                password: enc_pass,
                password_date: today,
                email: email,
                position: roles[0],
                employment_length: 5,
                skill: [],
                current_projects: [],
                past_projects: []
            };
            emp_list[emp_count] = new_json_obj;
            manager_ids += 1;
            emp_count ++;
        }

        console.log("creating employees");
        for (var loop = 0; loop < num_employees; loop++) {
            var new_json_obj = {
                _id: roles[1] + " " + empoloyee_ids,
                name: roles[1] + " first_name" + empoloyee_ids,
                surname: roles[1] + " second_name" + empoloyee_ids,
                password: enc_pass,
                password_date: today,
                email: email,
                position: roles[1],
                employment_length: Math.random()*(4 - 1 + 1)+ 1,
                skill: [],
                current_projects: [],
                past_projects: []
            };
            emp_list[emp_count] = new_json_obj;
            empoloyee_ids += 1;
            emp_count++;
        }
        for (var loop = 0; loop < emp_count; loop++)
        {
            module.exports.insertUser(emp_list[loop]);
        }
        console.log("Test employees added to data base");
    });
};

//A function to display all users in the terminal
exports.view_users = function() {
    console.log("viewing all users db");
    var user = schemas.user;
    user.find(function (err, result) {
        if (err) {
            console.log("Error displaying users.");
        }
        else if (!result) {
            console.log("Database is empty.");
        }
        else {
            console.log("Users found");
            console.log(JSON.stringify(result));
        }
    });
};

//A function to statically remove all users from the db
exports.remove_user = function() {
    console.log("removing users");
    var user = schemas.user;
    user.remove({}, function (err, result) {
        if (err) {
            console.log("Error removing users.");
        }
        else if (!result) {
            console.log("database is empty.");
        }
        else {
            console.log("Users removed");
            console.log(JSON.stringify(result));
        }
    });
};