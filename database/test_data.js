//This file is used to insert test data in the database

var exports =  module.exports = {} ;

var dbs = require('./dbs.js') ;
var schemas = require('./schemas.js') ;
var fs = require('fs');

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

//A function to statically create 250 managers and 750 employees into the db
//TODO: pull random names from a text file
exports.create_All_test_employees = function(num_manager, num_employees) {
    //var enc_pass;
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
                role: "Manager",
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
                role: "Employee",
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

/*This Function creates past projects dating back from 2017
* Parameters: num_years: the number of years it must go back in time from 2017
* Result: it adds the projects to the database, places them all in the past_projects.txt and displays the amount of
* projects created in the terminal
* Note: it uses the amount of managers which it scales with waiting for each of the years specified by num_years*/
exports.create_past_Projects = function(num_years) {
    //we need to get the number of managers
    console.log("Creating past projects");
    var fileName = 'past_projects.txt';
    var creating = { 'flags': 'w'
        , 'encoding': null
        , 'mode': 0666
    };
    var appending = { 'flags': 'a'
        , 'encoding': null
        , 'mode': 0666
    };
    var file = fs.createWriteStream(fileName, creating);
    file.write("");
    file.close();
    var file = fs.createWriteStream(fileName, appending);
    var managers;
    //dbs.findUsers("role", "Manager", 3000, managers);
    console.log(managers);
    var num_managers = 30;
    var start_date = new Date();
    var end_date = new Date();
    var project_count = 0;
    //we need to make a months array with 24 starting dates (1 every two weeks)
    var months_array = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11];
    var days_start_array = [1, 16, 1, 16, 1, 16, 1, 16, 1, 16, 1, 16, 1, 16, 1, 16, 1, 16, 1, 16, 1, 16, 1, 16];
    var days_end_array = [15, 28, 15, 28, 15, 28, 15, 28, 15, 28, 15, 28, 15, 28, 15, 28, 15, 28, 15, 28, 15, 28, 15, 28];

    var year_count = 1;
    for(var loop = 0; loop <  Math.ceil(num_years*0.25); loop++)
    {
        start_date.setYear(2017-num_years+loop);
        end_date.setYear(2017-num_years+loop);
        //repeat this for every 25% of managers
        for(var loop2 = 0; loop2 < Math.floor(num_managers*0.25); loop2++)
        {
            //for each manager create 24 projects
            for(var loop3 = 0; loop3 < 24; loop3++)
            {
                //set the dates month to the month array
                //set the dates day to the day array
                start_date.setMonth(months_array[loop3]);
                end_date.setMonth(months_array[loop3]);
                start_date.setDate(days_start_array[loop3]);
                end_date.setDate(days_end_array[loop3]);
                file.write("Start Date : "+start_date+" :: End Date : "+end_date+"\n");
                var json_project = {
                    _id: project_count,
                    name: "project "+project_count,
                    description: null,
                    project_start_date: start_date,
                    project_end_date: end_date,
                    owner_name: null, // i will assign this later
                    owner_contact: null, // i will assign this later
                    owner_email: null, // i will assign this later
                    manager_name: null, // i will assign this later
                    manager_contact: null, // i will assign this later
                    manager_email: null, // i will assign this later
                    employees_assigned: [{employee_id: String, role: String}],
                    employee_rates: [{employee_id: null, rate: null}], //we will assign this later
                    project_budget: 1 //we need to generate a random number here between two values
                };
                //actually push this new project to the db
                project_count +=1;
            }
        }
    }
    //create 24 projects for 50% of the managers for 25% of num years
    for(var loop = 0; loop <  Math.ceil(num_years*0.25); loop++)
    {
        start_date.setYear(2017-Math.floor(num_years*0.75)+loop);
        end_date.setYear(2017- Math.floor(num_years*0.75)+loop);
        //repeat this for every 50% of managers
        for(var loop2 = 0; loop2 < Math.floor(num_managers*0.5); loop2++)
        {
            //for each manager create 24 projects
            for(var loop3 = 0; loop3 < 24; loop3++)
            {
                //set the dates month to the month array
                //set the dates day to the day array
                start_date.setMonth(months_array[loop3]);
                end_date.setMonth(months_array[loop3]);
                start_date.setDate(days_start_array[loop3]);
                end_date.setDate(days_end_array[loop3]);
                //console.log("Start Date : "+start_date+" :: End Date : "+end_date);
                file.write("Start Date : "+start_date+" :: End Date : "+end_date+"\n");
                var json_project = {
                    _id: project_count,
                    name: "project "+project_count,
                    description: null,
                    project_start_date: start_date,
                    project_end_date: end_date,
                    owner_name: null, // i will assign this later
                    owner_contact: null, // i will assign this later
                    owner_email: null, // i will assign this later
                    manager_name: null, // i will assign this later
                    manager_contact: null, // i will assign this later
                    manager_email: null, // i will assign this later
                    employees_assigned: [{employee_id: String, role: String}],
                    employee_rates: [{employee_id: null, rate: null}], //we will assign this later
                    project_budget: 1 //we need to generate a random number here between two values
                };
                //actually push this new project to the db
                project_count +=1;
            }
        }
    }
    //create 24 projects for 75% of the managers for 25% of num years
    for(var loop = 0; loop <  Math.ceil(num_years*0.25); loop++)
    {
        start_date.setYear(2017- Math.floor(num_years*0.5)+loop);
        end_date.setYear(2017- Math.floor(num_years*0.5)+loop);
        //repeat this for every 75% of managers
        for(var loop2 = 0; loop2 < Math.floor(num_managers*0.75); loop2++)
        {
            //for each manager create 24 projects
            for(var loop3 = 0; loop3 < 24; loop3++)
            {
                //set the dates month to the month array
                //set the dates day to the day array
                start_date.setMonth(months_array[loop3]);
                end_date.setMonth(months_array[loop3]);
                start_date.setDate(days_start_array[loop3]);
                end_date.setDate(days_end_array[loop3]);
                file.write("Start Date : "+start_date+" :: End Date : "+end_date+"\n");
                var json_project = {
                    _id: project_count,
                    name: "project "+project_count,
                    description: null,
                    project_start_date: start_date,
                    project_end_date: end_date,
                    owner_name: null, // i will assign this later
                    owner_contact: null, // i will assign this later
                    owner_email: null, // i will assign this later
                    manager_name: null, // i will assign this later
                    manager_contact: null, // i will assign this later
                    manager_email: null, // i will assign this later
                    employees_assigned: [{employee_id: String, role: String}],
                    employee_rates: [{employee_id: null, rate: null}], //we will assign this later
                    project_budget: 1 //we need to generate a random number here between two values
                };
                //actually push this new project to the db
                project_count +=1;
            }
        }
    }
    //create 24 projects for 100% of the managers for 25% of num years
    for(var loop = 0; loop <  Math.ceil(num_years*0.25); loop++)
    {
        start_date.setYear(2017-Math.floor(num_years*0.25)+loop);
        end_date.setYear(2017-Math.floor(num_years*0.25)+loop);
        //repeat this for every 100% of managers
        for(var loop2 = 0; loop2 < Math.floor(num_managers); loop2++)
        {
            //for each manager create 24 projects
            for(var loop3 = 0; loop3 < 24; loop3++)
            {
                //set the dates month to the month array
                //set the dates day to the day array
                start_date.setMonth(months_array[loop3]);
                end_date.setMonth(months_array[loop3]);
                start_date.setDate(days_start_array[loop3]);
                end_date.setDate(days_end_array[loop3]);
                file.write("Start Date : "+start_date+" :: End Date : "+end_date+"\n");
                var json_project = {
                    _id: project_count,
                    name: "project "+project_count,
                    description: null,
                    project_start_date: start_date,
                    project_end_date: end_date,
                    owner_name: null, // i will assign this later
                    owner_contact: null, // i will assign this later
                    owner_email: null, // i will assign this later
                    manager_name: null, // i will assign this later
                    manager_contact: null, // i will assign this later
                    manager_email: null, // i will assign this later
                    employees_assigned: [{employee_id: String, role: String}],
                    employee_rates: [{employee_id: null, rate: null}], //we will assign this later
                    project_budget: 1 //we need to generate a random number here between two values
                };
                //actually push this new project to the db
                project_count +=1;
            }
        }
    }
    console.log("created : "+project_count+" projects");
};


//25% of managers have been working for 25% of the number of years
//25% of managers have been working for 50% of the number of years
//25% of managers have been working for 75% of the number of years
//25% of managers have been working for 100% of the number of years

//The amount of projects eaxh year grows with the amount of managers
//so for the beggining years (25%) we had the fewest amount of projects per year only enough that 25% of managers could do
//the next 25% of years (50% years complete) we had 25% more projects
//this follows for the following two 25% of years
exports.assign_past_Projects = function() {
    //we need to get the amount of projects
    //we need to get the amount of years
    //we need to get the first 25% of managers and place them in a list
    //t
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