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
            contact: "123 456 7890",
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
            contact: "123 456 7890",
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
            contact: "123 456 7890",
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
            contact: "123 456 7890",
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
            contact: "123 456 7890",
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
                contact: "123 456 7890",
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
                contact: "123 456 7890",
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

//Each project manager has 1 project every 2 weeks
//thats 2 project a month and 24 projects a year
//25% of managers have been working for 25% of the number of years, the first 25%, so the first 25% of project years
    // we assign only enough projects that 25% of managers could do (each manager manages 24 in a year
//25% of managers have been working for 50% of the number of years
//25% of managers have been working for 75% of the number of years
//25% of managers have been working for 100% of the number of years
exports.create_past_Projects = function(num_years) {
    //we need to get the number of managers
    var num_managers = 0;
    //for each year
    //create initial date starting from the current year minus num_years
    /*var d = new Date();
    var year = d.getFullYear(-num_years);
    var month = d.getMonth();
    var day = d.getDate();*/
    var project_count = 1;
    //we need to make a months array with 24 starting dates (1 every two weeks)
    var months_start_array = [new Date().setMonth(0, 1), new Date().setMonth(0, 16),new Date().setMonth(1, 1),
        new Date().setMonth(1, 16), new Date().setMonth(2, 1), new Date().setMonth(2, 16), new Date().setMonth(3, 1),
        new Date().setMonth(3, 16), new Date().setMonth(4, 1), new Date().setMonth(4, 16), new Date().setMonth(5, 1),
        new Date().setMonth(5, 16), new Date().setMonth(6, 1), new Date().setMonth(6, 16), new Date().setMonth(7, 1),
        new Date().setMonth(7, 16), new Date().setMonth(8, 1), new Date().setMonth(8, 16), new Date().setMonth(9, 1),
        new Date().setMonth(9, 16), new Date().setMonth(10, 1), new Date().setMonth(10, 16), new Date().setMonth(11, 1),
        new Date().setMonth(11, 16)];

    var months_end_array = [new Date().setMonth(0, 15), new Date().setMonth(0, 31),new Date().setMonth(1, 15),
        new Date().setMonth(1, 28), new Date().setMonth(2, 15), new Date().setMonth(2, 31), new Date().setMonth(3, 15),
        new Date().setMonth(3, 30), new Date().setMonth(4, 15), new Date().setMonth(4, 31), new Date().setMonth(5, 15),
        new Date().setMonth(5, 30), new Date().setMonth(6, 15), new Date().setMonth(6, 31), new Date().setMonth(7, 15),
        new Date().setMonth(7, 31), new Date().setMonth(8, 15), new Date().setMonth(8, 29), new Date().setMonth(9, 15),
        new Date().setMonth(9, 31), new Date().setMonth(10, 15), new Date().setMonth(10, 30), new Date().setMonth(11, 15),
        new Date().setMonth(11, 31)];
    var year_count = 1;
    //for (var loop = 0; loop < num_years; loop++)
    //{
        //if the number of years is less that 25% of the total number of years
        //if(year_count < num_years*0.25)
        //{
            //create 24 projects for 25% of the managers for each year for these projects
            for(var loop = 0; loop <  floor(num_years*0.25); loop++)
            {
                for(var loop = 0; loop < floor(num_managers*0.25); loop++)
                {
                    //for()
                }
            }
        //}

    //}
};

//manually create some projects to use for testing functions

exports.create_test_project = function() {
    var proj1 = {
        _id: "kpmg1",
        name: "First Crusade",
        description: "Deus Vult",
        project_start_date: "2017-01-01",
        project_end_date: "2017-05-05",
        owner_name: "Pope Urban II" ,
        owner_contact: "666 6666 666",
        owner_email: "someemail@vatican.vc",
        manager_id: "emp2",
        employees_assigned: [],
        employee_rates: [],
        project_budget: 5
    };
    dbs.insertProject(proj1) ;
}

exports.create_test_notifications = function() {
    var not1 = {
        _id: "not1",
        user_id: "emp1",
        message: "Shrek is love, Shrek is life.",
        date_created: "2017-08-16",
        isRead: false
    };
    dbs.insertNotification(not1) ;

    var not2 = {
        _id: "not2",
        user_id: "emp1",
        message: "Shrek is drek.",
        date_created: "2017-08-16",
        isRead: true
    };
    dbs.insertNotification(not2) ;
}


//25% of managers have been working for 25% of the number of years
//25% of managers have been working for 50% of the number of years
//25% of managers have been working for 75% of the number of years
//25% of managers have been working for 100% of the number of years

//The amount of projects eaxh year grows with the amount of managers
//so for the beggining years (25%) we had the fewest amount of projects per year only enough that 25% of managers could do
//the next 25% of years (50% years complete) we had 25% more projects
//this follows for the following two 25% of years
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
        employees_assigned: [{_id: String, role: String}],
        employee_rates: [{_id: String, rate: Number}],
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

exports.view_projects = function() {
    console.log("viewing all projects");
    var project = schemas.project;
    project.find(function (err, result) {
        if (err) {
            console.log("Error displaying projects.");
        }
        else if (!result) {
            console.log("Database is empty.");
        }
        else {
            console.log("Projects found");
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

exports.remove_projects = function() {
    console.log("removing projects");
    var project = schemas.project;
    project.remove({}, function (err, result) {
        if (err) {
            console.log("Error removing projects.");
        }
        else if (!result) {
            console.log("database is empty.");
        }
        else {
            console.log("Projects removed");
            console.log(JSON.stringify(result));
        }
    });
};

exports.remove_notifications = function() {
    console.log("removing notifications");
    var notification = schemas.notification;
    notification.remove({}, function (err, result) {
        if (err) {
            console.log("Error removing Notifications.");
        }
        else if (!result) {
            console.log("database is empty.");
        }
        else {
            console.log("Notifications removed");
            console.log(JSON.stringify(result));
        }
    });
};

exports.remove_tasks = function() {
    console.log("removing tasks");
    var task = schemas.task;
    task.remove({}, function (err, result) {
        if (err) {
            console.log("Error removing Tasks.");
        }
        else if (!result) {
            console.log("database is empty.");
        }
        else {
            console.log("Tasks removed");
            console.log(JSON.stringify(result));
        }
    });
};