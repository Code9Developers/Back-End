//This file is used to insert test data in the database

var exports = module.exports = {};

var dbs = require('./dbs.js');
var schemas = require('./schemas.js');
var fs = require('fs');

exports.create_test_employees = function () {
    console.log("creating a user");

    var today = new Date();
    dbs.encrypt("test", function (enc_pass) {
        var dir = {
            _id: "33",
            name: "Bob",
            surname: "Naidoo",
            password: enc_pass,
            password_date: today,
            contact: "(076)-234-9458",
            email: "employee1@gmail.com",
            role: "Director",
            position: "Director",
            employment_length: 6,
            skill: [{name: "MS Office", rating: 0, counter: 0}, {
                name: " Accounting Skills",
                rating: 0,
                counter: 0
            }, {name: "Auditor", rating: 0, counter: 0}],
            current_projects: [],
            past_projects: []
        };
        var emp = {
            _id: "test_manager_12",
            name: "Sargon",
            surname: "David",
            password: enc_pass,
            password_date: today,
            contact: "(076)-234-9458",
            email: "employee1@gmail.com",
            role: "Manager",
            position: "Senior Analyst",
            employment_length: 1,
            skill: [{name: "MS Office", rating: 0, counter: 0}, {
                name: " Accounting Skills",
                rating: 0,
                counter: 0
            }, {name: "Auditor", rating: 0, counter: 0}],
            current_projects: [],
            past_projects: []
        };

        var emp2 = {
            _id: "emp1",
            name: "Nebuchadnezzar",
            surname: "Shnebly",
            password: enc_pass,
            password_date: today,
            contact: "(076)-234-9458",
            email: "Nebuchadnezzar@gmail.com",
            role: "Employee",
            position: "Junior Analyst",
            employment_length: 1,
            skill: [{name: "MS Office", rating: 0, counter: 0}, {
                name: " Accounting Skills",
                rating: 0,
                counter: 0
            }, {name: "Auditor", rating: 0, counter: 0}],
            current_projects: [],
            past_projects: []
        };

        var emp3 = {
            _id: "test_admin_1",
            name: "Xerxes",
            surname: "Xenon",
            password: enc_pass,
            password_date: today,
            contact: "(076)-234-9458",
            email: "Xerxes@gmail.com",
            role: "Admin",
            position: "Junior Analyst",
            employment_length: 1,
            skill: [{name: "MS Office", rating: 0, counter: 0}, {
                name: " Accounting Skills",
                rating: 0,
                counter: 0
            }, {name: "Auditor", rating: 0, counter: 0}],
            current_projects: [],
            past_projects: []
        };

        var emp4 = {
            _id: "emp2",
            name: "Chandragupta",
            surname: "Indian",
            password: enc_pass,
            password_date: today,
            contact: "(076)-234-9458",
            email: "Chandragupta@gmail.com",
            role: "Employee",
            position: "Junior Analyst",
            employment_length: 1,
            skill: [{name: "MS Office", rating: 0, counter: 0}, {
                name: " Accounting Skills",
                rating: 0,
                counter: 0
            }, {name: "Auditor", rating: 0, counter: 0}],
            current_projects: [],
            past_projects: []
        };

        var emp5 = {
            _id: "emp3",
            name: "Ptolemy",
            surname: "Smith",
            password: enc_pass,
            password_date: today,
            contact: "(076)-234-9458",
            email: "Ptolemy@gmail.com",
            role: "Employee",
            position: "Junior Analyst",
            employment_length: 1,
            skill: [{name: "MS Office", rating: 0, counter: 0}, {
                name: " Accounting Skills",
                rating: 0,
                counter: 0
            }, {name: "Auditor", rating: 0, counter: 0}],
            current_projects: [],
            past_projects: []
        };
        //dbs.remove({name: "Testy"});  /*THIS deletes all previous users in the db*/
        dbs.insertUser(emp);
        dbs.insertUser(emp2);
        dbs.insertUser(emp3);
        dbs.insertUser(emp4);
        dbs.insertUser(emp5);
        dbs.insertUser(dir);
        console.log("Test employees added to data base")
    });
};

exports.create_test_projects = function () {
    var proj1 = {
        _id: "kpmg1",
        name: "First Crusade",
        description: "Deus Vult",
        project_start_date: "2017-01-01",
        project_end_date: "2017-05-05",
        owner_name: "Pope Urban II",
        owner_contact: "666 6666 666",
        owner_email: "someemail@vatican.vc",
        manager_id: "test_manager_12",
        project_budget: 5,
        status: "completed"
    };
    dbs.insertProject(proj1);

    var proj2 = {
        _id: "kpmg2",
        name: "Battle of Thermopylae",
        description: "War",
        project_start_date: "2017-01-01",
        project_end_date: "2017-09-09",
        owner_name: "King Leonidas",
        owner_contact: "666 6666 444",
        owner_email: "someemail@vatican.vc",
        manager_id: "test_manager_12",
        project_budget: 6,
        status: "completed"
    };
    dbs.insertProject(proj2);
}

//A function to statically create 250 managers and 750 employees into the db
//TODO: pull random names from a text file
exports.create_All_test_employees = function(num_manager, num_employees) {
    //list of roles and rates
    var positions = ["Junior Analyst 1", "Junior Analyst 2","Analyst", "Senior Analyst",
        "Supervisor", "Assistant Manager", "Manager", "Senior Manager", "Associate Director", "Director"];
    var rates  = [250, 500, 750, 1000, 1250, 1500, 1750, 2000, 2250, 2500];
    var skills = ["skill 1", "skill 2", "skill 3", "skill 4", "skill 5", "skill 6", "skill 7", "skill 8", "skill 9", "skill 10"];
    dbs.encrypt("test", function (enc_pass) {
        var today = new Date();
        var roles = ["project manager", "employee"];
        var email = "@gmail.com";
        var manager_ids = 1;
        var employee_ids = 1;
        var emp_list = {};
        var emp_count = 0;
        filename_first_names = "./database/data/500_first_names.txt";
        filename_second_names = "./database/data/500_second_names.txt";
        fs.readFile(filename_first_names, 'utf8', function (err, data) {
            if (err) throw err;
            console.log('OK: ' + filename_first_names);
            var name_index = 0;
            var lines = data.split(/\r?\n/);
            fs.readFile(filename_second_names, 'utf8', function (err, data) {
                if (err) throw err;
                console.log('OK: ' + filename_second_names);
                var name_index = 0;
                var lines2 = data.split(/\r?\n/);
                console.log("creating managers");
                for (var loop = 0; loop < num_manager; loop++) {
                    var employee_index = Math.floor(Math.random() * (7 - 4 + 1) + 4);
                    var new_json_obj = {
                        _id: roles[0] + " " + manager_ids,
                        name: lines[name_index].trim(),
                        surname: lines2[name_index].trim(),
                        password: enc_pass,
                        password_date: today,
                        contact: "123 456 7890",
                        email: lines[name_index].trim()+"."+lines2[name_index].trim()+email,
                        role: "Manager",
                        position: positions[employee_index],
                        employment_length: Math.floor(Math.random() * (10 - 5 + 1) + 5),
                        rate: rates[employee_index],
                        skill: [],
                        current_projects: [],
                        past_projects: [],
                        events: []
                    };
                    emp_list[emp_count] = new_json_obj;
                    manager_ids += 1;
                    emp_count++;
                    name_index++;
                }

                console.log("creating employees");
                for (var loop = 0; loop < num_employees; loop++) {
                    var employee_index = Math.floor(Math.random() * (3 - 0 + 1) + 0);
                    var skills_index_1 = Math.floor(Math.random() * (3 - 0 + 1) + 0);
                    var skills_index_2 = Math.floor(Math.random() * (6 - 4 + 1) + 4);
                    var skills_index_3 = Math.floor(Math.random() * (9 - 7 + 1) + 7);
                    var new_json_obj = {
                        _id: roles[1] + " " + employee_ids,
                        name: lines[name_index].trim(),
                        surname: lines2[name_index].trim(),
                        password: enc_pass,
                        password_date: today,
                        contact: "123 456 7890",
                        email: lines[name_index].trim()+"."+lines2[name_index].trim()+email,
                        role: "Employee",
                        position: positions[employee_index],
                        rate: rates[employee_index],
                        employment_length: Math.floor(Math.random() * (4 - 1 + 1) + 1),
                        skill: [
                            {
                                name: skills[skills_index_1],
                                rating: Math.floor(Math.random() * (10 - 4 + 1) + 4),
                                counter: 1
                            },
                            {
                                name: skills[skills_index_2],
                                rating: Math.floor(Math.random() * (10 - 4 + 1) + 4),
                                counter: 1
                            },
                            {
                                name: skills[skills_index_3],
                                rating: Math.floor(Math.random() * (10 - 4 + 1) + 4),
                                counter: 1
                            }
                        ],
                        current_projects: [],
                        past_projects: []
                    };
                    emp_list[emp_count] = new_json_obj;
                    employee_ids += 1;
                    emp_count++;
                    name_index++;
                }
                for (var loop = 0; loop < emp_count; loop++) {
                    dbs.insertUser(emp_list[loop]);
                }
                console.log("Test employees added to data base");
            });
        });
    });
};

/*This Function creates past projects dating back from 2017
 * Parameters: num_years: the number of years it must go back in time from 2017
 * Result: it adds the projects to the database, places them all in the past_projects.txt and displays the amount of
 * projects created in the terminal
 * Note: it uses the amount of managers specified in create_All_test_employees*/
exports.create_past_Projects = function (num_years) {
    console.log("Creating past projects");
    var fileName = 'past_projects.txt';
    var creating = {
        'flags': 'w',
        'encoding': null,
        'mode': 0666
    };
    var appending = {
        'flags': 'a'
        , 'encoding': null
        , 'mode': 0666
    };
    var file = fs.createWriteStream(fileName, creating);
    file.write("");
    file.close();
    var file = fs.createWriteStream(fileName, appending);
    dbs.findUsers("role", "Manager", function (managers) {
        var num_managers = Object.keys(managers).length;
        console.log("number of managers found : " + num_managers);
        console.log("num_managers is now :" + num_managers);
        var start_date = new Date();
        var end_date = new Date();
        var project_count = 0;
        var months_array = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11];
        var days_start_array = [1, 16, 1, 16, 1, 16, 1, 16, 1, 16, 1, 16, 1, 16, 1, 16, 1, 16, 1, 16, 1, 16, 1, 16];
        var days_end_array = [15, 28, 15, 28, 15, 28, 15, 28, 15, 28, 15, 28, 15, 28, 15, 28, 15, 28, 15, 28, 15, 28, 15, 28];

        for (var loop = 0; loop < Math.ceil(num_years * 0.25); loop++) {
            start_date.setYear(2017 - num_years + loop);
            end_date.setYear(2017 - num_years + loop);
            for (var loop2 = 0; loop2 < Math.floor(num_managers * 0.25); loop2++) {
                for (var loop3 = 0; loop3 < 24; loop3++) {
                    start_date.setMonth(months_array[loop3]);
                    end_date.setMonth(months_array[loop3]);
                    start_date.setDate(days_start_array[loop3]);
                    end_date.setDate(days_end_array[loop3]);
                    file.write("Start Date : " + start_date + " :: End Date : " + end_date + "\n");
                    var json_project = {
                        _id: project_count,
                        name: "project " + project_count,
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
                        project_budget: (Math.round((Math.random() * (500000 - 30000) + 30000) + 'e2') + 'e-2'),
                        status: "completed"
                        //we need to generate a random number here between two values
                    };
                    dbs.insertProject(json_project);
                    project_count += 1;
                }
            }
        }
        for (var loop = 0; loop < Math.ceil(num_years * 0.25); loop++) {
            start_date.setYear(2017 - Math.floor(num_years * 0.75) + loop);
            end_date.setYear(2017 - Math.floor(num_years * 0.75) + loop);
            for (var loop2 = 0; loop2 < Math.floor(num_managers * 0.5); loop2++) {
                for (var loop3 = 0; loop3 < 24; loop3++) {
                    start_date.setMonth(months_array[loop3]);
                    end_date.setMonth(months_array[loop3]);
                    start_date.setDate(days_start_array[loop3]);
                    end_date.setDate(days_end_array[loop3]);
                    file.write("Start Date : " + start_date + " :: End Date : " + end_date + "\n");
                    var json_project = {
                        _id: project_count,
                        name: "project " + project_count,
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
                        project_budget: (Math.round((Math.random() * (500000 - 30000) + 30000) + 'e2') + 'e-2'),
                        status: "completed"//we need to generate a random number here between two values
                    };
                    dbs.insertProject(json_project);
                    project_count += 1;
                }
            }
        }
        for (var loop = 0; loop < Math.ceil(num_years * 0.25); loop++) {
            start_date.setYear(2017 - Math.floor(num_years * 0.5) + loop);
            end_date.setYear(2017 - Math.floor(num_years * 0.5) + loop);
            for (var loop2 = 0; loop2 < Math.floor(num_managers * 0.75); loop2++) {
                for (var loop3 = 0; loop3 < 24; loop3++) {
                    start_date.setMonth(months_array[loop3]);
                    end_date.setMonth(months_array[loop3]);
                    start_date.setDate(days_start_array[loop3]);
                    end_date.setDate(days_end_array[loop3]);
                    file.write("Start Date : " + start_date + " :: End Date : " + end_date + "\n");
                    var json_project = {
                        _id: project_count,
                        name: "project " + project_count,
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
                        project_budget: (Math.round((Math.random() * (500000 - 30000) + 30000) + 'e2') + 'e-2'),
                        status: "completed"//we need to generate a random number here between two values
                    };
                    dbs.insertProject(json_project);
                    project_count += 1;
                }
            }
        }
        for (var loop = 0; loop < Math.ceil(num_years * 0.25); loop++) {
            start_date.setYear(2017 - Math.floor(num_years * 0.25) + loop);
            end_date.setYear(2017 - Math.floor(num_years * 0.25) + loop);
            for (var loop2 = 0; loop2 < Math.floor(num_managers); loop2++) {
                for (var loop3 = 0; loop3 < 24; loop3++) {
                    start_date.setMonth(months_array[loop3]);
                    end_date.setMonth(months_array[loop3]);
                    start_date.setDate(days_start_array[loop3]);
                    end_date.setDate(days_end_array[loop3]);
                    file.write("Start Date : " + start_date + " :: End Date : " + end_date + "\n");
                    var json_project = {
                        _id: project_count,
                        name: "project " + project_count,
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
                        project_budget: (Math.round((Math.random() * (500000 - 30000) + 30000) + 'e2') + 'e-2'),
                        status: "completed"//we need to generate a random number here between two values
                    };
                    dbs.insertProject(json_project);
                    project_count += 1;
                }
            }
        }
        console.log("created : " + project_count + " projects");
    });
};

//25% of managers have been working for 25% of the number of years
//25% of managers have been working for 50% of the number of years
//25% of managers have been working for 75% of the number of years
//25% of managers have been working for 100% of the number of years

//The amount of projects eaxh year grows with the amount of managers
//so for the beggining years (25%) we had the fewest amount of projects per year only enough that 25% of managers could do
//the next 25% of years (50% years complete) we had 25% more projects
//this follows for the following two 25% of years
exports.assign_past_Projects = function () {
    //FIRST LETS HAVE A COUNT AND MAKE SURE IT DOES NOT GO ABOVE THE AMOUNT OF PROJECTS
    var projects_list = [];
    var project_count = length(projects_list);
    console.log("Assigning managers to the past projects");
    //we need to get the amount of projects and create a list with them in
    var num_projects = 0;
    dbs.findAllProjects("role", "Manager", function (projects) {
        num_projects = Object.keys(projects).length;
        console.log(num_projects);
    });
    console.log("current number of stored projects : " + num_projects)
    //we need to get the amount of years
    //we need to get the first 25% of managers and assign them to each project in the list
    //we need to then get the next 25% of managers + the last 25% and assign them to projects too
    //we do this again for 25% + 25% +25% of managers
    //finally we do it one last time for all managers

    //25% of managers have been working for 25% of the number of years
    //25% of managers have been working for 50% of the number of years
    //25% of managers have been working for 75% of the number of years
    //25% of managers have been working for 100% of the number of years
    //so distribute the projects as such

    //we assign managers to a project with a function which uses the manager id with the project id
};


exports.create_test_notifications = function () {
    var not1 = {
        _id: "not1",
        user_id: "emp1",
        message: "Shrek is love, Shrek is life.",
        date_created: "2017-08-16",
        isRead: false
    };
    dbs.insertNotification(not1);

    var not2 = {
        _id: "not2",
        user_id: "emp1",
        message: "Shrek is drek.",
        date_created: "2017-08-16",
        isRead: true
    };
    dbs.insertNotification(not2);
};

exports.create_test_milestones = function () {
    var mstone = {
        _id: "mstone1",
        description: "Issue 69",
        end_date: "2017-09-17"
    };
    dbs.insertMilestone("kpmg1", mstone);
    var mstone2 = {
        _id: "mstone2",
        description: "Issue 74",
        end_date: "2017-05-05"
    };
    dbs.insertMilestone("kpmg1", mstone2);
    var mstone3 = {
        _id: "mstone3",
        description: "Issue 11",
        end_date: "2017-09-21"
    };
    dbs.insertMilestone("kpmg1", mstone3);
};

//A function to display all users in the terminal
exports.view_users = function () {
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

exports.view_projects = function () {
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
exports.remove_users = function () {
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

exports.remove_projects = function () {
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

exports.remove_notifications = function () {
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

exports.remove_tasks = function () {
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