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
        var emp3 = {
            _id: "tesA",
            name: "Xerxes",
            surname: "Xenon",
            password: enc_pass,
            password_date: today,
            contact: "(076)-234-9458",
            email: "Xerxes@gmail.com",
            role: "Admin",
            position: "Manager",
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

        dbs.insertUser(emp3);
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
    var skills = ["Penetration Testing and Vulnerability", "Scanning (Nesus and Qualys)", "Windows / Linux Security", "Database Security",
        "Security Gap Assessments", "Cyber Threat Detection And Root Cause", "Analysis", "Virtualisation Technologies",
        "Strategic Management", "Regulatory Compliance", "Risk Management", "IT Corporate Governance",
        "Data Centre Security", "Report Writing", "Policies, Procedures and Standards Writing skills",
        "Policies, Procedures and Standards Compliance Measurement", "IT Legislation Compliance Gap Assessments," +
        "IT Procurement and Bid Management", "IT Governance and Service Management", "IT Strategy and Performance Management",
        "Enterprise Architecture and Design", "Digitisation",
        "Specialist Supporting the Audit training", "Eaudit skills", "External Audit basics", "General IT controls",
        "IT Risk Profiling", "Risk and Compliance Assessment", "Application Controls", "General IT Controls",
        "Report Writing", "IT Fraud Investigation", "Audit Plan Development", "Eaudit skills",
        "ITIA Basics", "SAP Basics", "IT Assurance", "King 3 Assessments", "Data Migration Reviews," +
        "User Account Testing", "Data Analysis", "Data Visualization", "IDEA Skills", "CAATS Basics Skills",
        "Data Insight Detection", "Report Writing", "Vendor Sourcing and RFP Development", "Vendor Contract Review",
        "Business Case Review", "Project Assurance and Auditing", "Project Risk Management",
        "IT Strategy Development and Master Systems Plan", "IT Governance and Maturity Assessment",
        "Data Migration", "Business Process Risk and Control Analysis In Erp Environments", "Automated Controls Testing",
        "Requirements Management", "Blueprint / Process Design", "Controls Integration", "Master Data Management",
        "Security and Sod", "User Account Testing", "Support Management", "IT Service Management",
        "Develop IT Governance Frameworks", "IT Risks and Controls Assessments and Benchmarking", "Review It Policies and Procedures",
        "Development of IT Strategies", "Value IT Analysis and Reviews", "IT Governance Audits",
        "IT Governance Maturity Reviews", "Vendor Selection Assistance", 'IT Project Assurance and Business Req Review",' +
        "Disaster Recovery Test Assist and Reviews", "Project Management"];
    dbs.encrypt("test", function (enc_pass) {
        var today = new Date();
        var roles = ["project manager", "employee"];
        var email = "@gmail.com";
        var manager_ids = 1;
        var employee_ids = 1;
        var emp_list = {};
        var emp_count = 0;
        var skill_count = 0;
        filename_first_names = "./database/data/500_first_names.txt";
        filename_second_names = "./database/data/500_second_names.txt";
        fs.readFile(filename_first_names, 'utf8', function (err, data) {
            if (err) throw err;
            console.log('OK: ' + filename_first_names);
            var name_index = 0;
            var lines = data.split(/\r?\n/);
            fs.readFile(filename_second_names, 'utf8', function (err, data) {
                if (err) throw err;
                var name_index = 0;
                var lines2 = data.split(/\r?\n/);
                console.log("creating managers");
                for (var loop = 0; loop < num_manager; loop++) {
                    var employee_index = Math.floor(Math.random() * (7 - 5 + 1) + 5);
                    var new_json_obj = {
                        _id: "mp_" + manager_ids,
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
                    var employee_index = Math.floor(Math.random() * (4 - 0 + 1) + 0);
                    var new_json_obj = {
                        _id: "emp_" + employee_ids,
                        name: lines[name_index].trim(),
                        surname: lines2[name_index].trim(),
                        password: enc_pass,
                        password_date: today,
                        contact: "123 456 7890",
                        email: lines[name_index].trim()+"."+lines2[name_index].trim()+email,
                        role: "Employee",
                        position: positions[employee_index],
                        rate: rates[employee_index],
                        employment_length: Math.floor(Math.random() * (6 - 1 + 1) + 1),
                        skill: [
                            {
                                name: skills[(skill_count%skills.length-1)],
                                rating: Math.floor(Math.random() * (10 - 4 + 1) + 4),
                                counter: 1
                            },
                            {
                                name: skills[(skill_count+1%skills.length-1)],
                                rating: Math.floor(Math.random() * (10 - 4 + 1) + 4),
                                counter: 1
                            },
                            {
                                name: skills[(skill_count+2%skills.length-1)],
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
                    skill_count++;
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

//2 years, 4 managers, 40 employers
/*This Function creates past projects dating back from 2017
 * Parameters: num_years: the number of years it must go back in time from 2017
 * Result: it adds the projects to the database, places them all in the past_projects.txt and displays the amount of
 * projects created in the terminal
 * Note: it uses the amount of managers specified in create_All_test_employees*/
exports.create_past_Projects = function (num_years) {
    console.log("Creating past projects");
    var project_count = 0;
    var start_date = new Date();
    var end_date = new Date();
    var months_array = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11];
    var days_start_array = [1, 16, 1, 16, 1, 16, 1, 16, 1, 16, 1, 16, 1, 16, 1, 16, 1, 16, 1, 16, 1, 16, 1, 16];
    var days_end_array = [15, 28, 15, 28, 15, 28, 15, 28, 15, 28, 15, 28, 15, 28, 15, 28, 15, 28, 15, 28, 15, 28, 15, 28];

    dbs.findUsers("role", "Manager", function (managers) {
        var num_managers = Object.keys(managers).length;
        console.log("number of managers found : " + num_managers);
        dbs.findUsers("role", "Employee", function(employees) {
            var num_employees = Object.keys(employees).length;
            console.log("The number of stored employees is : " + num_employees);
            console.log("number of managers found : " + num_managers);
            for (var loop = 0; loop < num_years; loop++)
            {
                start_date.setYear(2017 - num_years + loop);
                end_date.setYear(2017 - num_years + loop);
                for (var loop2 = 0; loop2 < Math.floor(num_managers/2); loop2++)
                {
                    for (var loop3 = 0; loop3 < 24; loop3++)
                    {
                        start_date.setMonth(months_array[loop3]);
                        end_date.setMonth(months_array[loop3]);
                        start_date.setDate(days_start_array[loop3]);
                        end_date.setDate(days_end_array[loop3]);
                        var json_project = {
                            _id: project_count,
                            name: "project " + project_count,
                            description: null,
                            project_start_date: start_date,
                            project_end_date: end_date,
                            owner_name: null, // i will assign this later
                            owner_contact: null, // i will assign this later
                            owner_email: null, // i will assign this later
                            manager_id: managers[(project_count % num_managers)]._id,
                            employees_assigned: [],
                            project_budget: null,
                            tasks: [],
                            status: "completed",
                            project_rating: null,
                            milestones: [],
                            reviewed: null
                        };

                        var obj = {emps: []};
                        var emp1 = {
                            "employee_id": employees[(project_count + 0) % num_employees]._id,
                            "skill_name": employees[(project_count + 0) % num_employees].skill[0].name
                        };
                        var emp2 = {
                            "employee_id": employees[(project_count + 1) % num_employees]._id,
                            "skill_name": employees[(project_count + 1) % num_employees].skill[0].name
                        };
                        var emp3 = {
                            "employee_id": employees[(project_count + 2) % num_employees]._id,
                            "skill_name": employees[(project_count + 2) % num_employees].skill[0].name
                        };
                        var emp4 = {
                            "employee_id": employees[(project_count + 3) % num_employees]._id,
                            "skill_name": employees[(project_count + 3) % num_employees].skill[0].name
                        };
                        var emp5 = {
                            "employee_id": employees[(project_count + 4) % num_employees]._id,
                            "skill_name": employees[(project_count + 4) % num_employees].skill[0].name
                        };

                        obj.emps.push(emp1);
                        obj.emps.push(emp2);
                        obj.emps.push(emp3);
                        obj.emps.push(emp4);
                        obj.emps.push(emp5);

                        dbs.insertAndAssignPastProject(json_project, obj.emps, Math.floor(Math.random() * (10 - 4 + 1)) + 4, function (res) {
                        });
                        project_count += 1;
                    }
                }
            }
            console.log("created : "+project_count+" projects");
        });
    });
    dbs.findUsers("role", "Manager", function (managers) {
        var num_managers = Object.keys(managers).length;
        console.log("number of managers found : " + num_managers);
        dbs.findUsers("role", "Employee", function(employees) {
            var num_employees = Object.keys(employees).length;
            console.log("The number of stored employees is : " + num_employees);
            console.log("number of managers found : " + num_managers);
            for (var loop = 0; loop < num_years; loop++)
            {
                start_date.setYear(2017 - num_years + loop);
                end_date.setYear(2017 - num_years + loop);
                for (var loop2 = 0; loop2 < Math.floor(num_managers/2); loop2++)
                {
                    for (var loop3 = 0; loop3 < 24; loop3++)
                    {
                        start_date.setMonth(months_array[loop3]);
                        end_date.setMonth(months_array[loop3]);
                        start_date.setDate(days_start_array[loop3]);
                        end_date.setDate(days_end_array[loop3]);
                        var json_project = {
                            _id: project_count,
                            name: "project " + project_count,
                            description: null,
                            project_start_date: start_date,
                            project_end_date: end_date,
                            owner_name: null, // i will assign this later
                            owner_contact: null, // i will assign this later
                            owner_email: null, // i will assign this later
                            manager_id: managers[(project_count % num_managers)]._id,
                            employees_assigned: [],
                            project_budget: null,
                            tasks: [],
                            status: "completed",
                            project_rating: null,
                            milestones: [],
                            reviewed: null
                        };

                        var obj = {emps: []};
                        var emp1 = {
                            "employee_id": employees[(project_count + 0) % num_employees]._id,
                            "skill_name": employees[(project_count + 0) % num_employees].skill[0].name
                        };
                        var emp2 = {
                            "employee_id": employees[(project_count + 1) % num_employees]._id,
                            "skill_name": employees[(project_count + 1) % num_employees].skill[0].name
                        };
                        var emp3 = {
                            "employee_id": employees[(project_count + 2) % num_employees]._id,
                            "skill_name": employees[(project_count + 2) % num_employees].skill[0].name
                        };
                        var emp4 = {
                            "employee_id": employees[(project_count + 3) % num_employees]._id,
                            "skill_name": employees[(project_count + 3) % num_employees].skill[0].name
                        };
                        var emp5 = {
                            "employee_id": employees[(project_count + 4) % num_employees]._id,
                            "skill_name": employees[(project_count + 4) % num_employees].skill[0].name
                        };

                        obj.emps.push(emp1);
                        obj.emps.push(emp2);
                        obj.emps.push(emp3);
                        obj.emps.push(emp4);
                        obj.emps.push(emp5);

                        dbs.insertAndAssignPastProject(json_project, obj.emps, Math.floor(Math.random() * (10 - 4 + 1)) + 4, function (res) {
                        });
                        project_count += 1;
                    }
                }
            }
            console.log("created : "+project_count+" projects");
        });
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