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

//A function to statically create 225 employees and 75 managers into the db
//TODO: pull random names from a text file
exports.create_All_test_employees = function(num_manager, num_employees) {
    dbs.encrypt("test", function (enc_pass) {
        var today = new Date();
        console.log("creating roles array");
        var roles = ["project manager", "employee"];
        var email = "employee1@gmail.com";
        var manager_ids = 1;
        var employee_ids = 1;
        var emp_list = {};
        var emp_count = 0;
        console.log("creating managers");
        for (var loop = 0; loop < num_manager; loop++) {
            var new_json_obj = {
                _id: roles[0] + " " + manager_ids,
                name: roles[0] + " first_name " + manager_ids,
                surname: roles[0] + " second_name " + manager_ids,
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
                _id: roles[1] + " " + employee_ids,
                name: roles[1] + " first_name " + employee_ids,
                surname: roles[1] + " second_name " + employee_ids,
                password: enc_pass,
                password_date: today,
                email: email,
                position: roles[1],
                employment_length: Math.floor(Math.random()*(4 - 1 + 1)+ 1),
                skill: [],
                current_projects: [],
                past_projects: []
            };
            emp_list[emp_count] = new_json_obj;
            employee_ids += 1;
            emp_count++;
        }
        for (var loop = 0; loop < emp_count; loop++)
        {
            dbs.insertUser(emp_list[loop]);
        }
        console.log("Test employees added to data base");
    });
};

//Each project manager has 1 project every 2 weeks
//thats 2 project a month and 24 projects a year
exports.create_past_Projects = function(num_years, num_managers) {
    //for each year
    //create initial date starting from the current year minus num_years
    var year = d.getFullYear(-num_years);
    var month = d.getMonth();
    var day = d.getDate();
    var project_count = 0;
    for (var loop = 0; loop < num_years; loop++)
    {
        //create a date
    }
};


//25% of managers have been working for 25% of the number of years
//25% of managers have been working for 50% of the number of years
//25% of managers have been working for 75% of the number of years
//25% of managers have been working for 100% of the number of years
exports.assign_past_Projects = function(num_years, projects_per_year)
{
    //we need to query the db for the amount of managers
    //How many projects per year
    //divide the years months by the amount of projects per year and use that for month dates
    //the dates are not really actually important for the algorithm
    console.log("creating dates array");
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth();
    var day = d.getDate();
    var project_count = 0;
    //25% of managers have been working for 25% of the number of years
    //25% of managers have been working for 50% of the number of years
    //25% of managers have been working for 75% of the number of years
    //25% of managers have been working for 100% of the number of years
    //so distribute the projects as such
    for (var loop = 0; loop < num_managers; loop++)
    {
        //first 25%
        if (loop<=num_managers*0.25)
        {
            for (var loop2 = 0; loop2 < (0.25*num_years); loop2++)
            {
                //assign these
            }
        }

    }
    var schema = mongoose.Schema({
        _id: String,
        name: String,
        description: String,
        project_start_date: Date,
        project_end_date: Date,
        owner_name: String,
        owner_contact: String,
        owner_email: String,
        manager_name: String,
        manager_contact: String,
        manager_email: String,
        employees_assigned: [{employee_id: String, role: String}],
        employee_rates: [{employee_id: String, rate: Number}],
        project_budget: Number
    }) ;
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
            console.log(JSON.stringify(result, null, 1));
        }
    });
};

//A function to statically remove all users from the db
exports.remove_users = function() {
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