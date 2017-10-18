/**
 * Created by Jordan on 21-Jul-17.
 */
var exports = module.exports = {};

var schemas = require('.././database/schemas.js');
var dbs = require('.././database/dbs.js');
var Algorithm = require('.././database/Algorithm.js');

/*FUNCTION get_unallocated_user
 *   RETURNS : A json array: index 0 is the list of allocated employees for the project, index 1 is all other employees
 *           which have the skills required by the project and are free for the duration, index 2 is the cost of the
 *           project as per the rates of assigned employees*/

exports.get_unallocated_users = function (positions, position_counts, skills, start_date, end_date, callback) {
    console.log("unallocated users requested");
    console.log("positions : "+positions);
    console.log("number of each position : "+position_counts);
    console.log("skills : " + skills);
    console.log("start date : " + start_date);
    console.log("end date : " + end_date);
    var user = schemas.user;
    var project = schemas.project;

    function getLastProjectDate(project_id) {
        project.findOne({_id: project_id}).exec().then(function(res) {
            console.log("project end date:" + res.project_end_date) ;
            return res.project_end_date ;
        });
    }

    console.log("Finding relevant employees");
    user.find({current_projects: [], role: "Employee", }, function (err, result) {
        if (err) {
            console.log("Error finding employees.");
        }
        else if (!result) {
            console.log("employees not found.");
        }
        else {
            console.log("Creating employee lists");

            var employee_lists = [];
            var skills_count = [skills.length];
            var projects = [];
            var projects_count = 0;
            for (var loop = 0; loop < skills.length; loop++) {
                skills_count[loop] = 0;
                employee_lists[loop] = [];
            }
            for (var loop = 0; loop < Object.keys(result).length; loop++) {
                var new_json_obj = {
                    _id: result[loop]._id,
                    name: result[loop].name,
                    surname: result[loop].surname,
                    position: result[loop].position,
                    employment_length: result[loop].employment_length,
                    rate: result[loop].rate,
                    skill: [],
                    past_projects: result[loop].past_projects
                };
                var project_id = result[loop].past_projects[result[loop].past_projects.length - 1];
                projects[projects_count++] = project_id;

                for (var loop2 = 0; loop2 < Object.keys(skills).length; loop2++) {
                    for (var loop3 = 0; loop3 < result[loop].skill.length; loop3++) {
                        if (result[loop].skill[loop3].name == skills[loop2]) {
                            new_json_obj.skill.push(skills[loop2]);
                            employee_lists[loop2][skills_count[loop2]] = new_json_obj;
                            skills_count[loop2] += 1;
                        }
                    }
                }
            }


            console.log("Evaluating relevant employees");
            for (var loop = 0; loop < Object.keys(skills).length; loop++) {
                for (var loop2 = 0; loop2 < Object.keys(employee_lists[loop]).length; loop2++) {
                    employee_lists[loop][loop2].value = 0;
                    employee_lists[loop][loop2].value += parseInt(employee_lists[loop][loop2].employment_length);
                }
            }

            for (var loop = 0; loop < Object.keys(skills).length; loop++) {
                employee_lists[loop].sort(predicateBy("value"));
            }

            for (var loop = 0; loop < Object.keys(skills).length; loop++) {
                for (var loop2 = 0; loop2 < Object.keys(employee_lists[loop]).length; loop2++) {
                    employee_lists[loop][loop2].pos = loop2;
                }
            }

            var no_skills_list = [];
            var no_skill_count = 0;
            var emp_check_list = [];
            var count = 0;
            for (var loop = 0; loop < Object.keys(employee_lists).length; loop++) {
                if (Object.keys(employee_lists[loop]).length > 0) {
                    emp_check_list[count] = [];
                    count += 1
                }
                else {
                    no_skills_list[no_skill_count] = skills[no_skill_count];
                    no_skill_count++;
                }
            }

            count = 0;
            for (var loop = 0; loop < Object.keys(employee_lists).length; loop++) {
                if (employee_lists[loop].length > 0) {
                    emp_check_list[count] = employee_lists[loop];
                    count++;
                }
            }
            /*var test_id = result[loop].past_projects[result[loop].past_projects.length-1];*/
            dbs.findSpecificProjects(projects, function (past_projects)
            {
                //console.log(past_projects);
                // get all id's of past projects from loop
                for(var loop = 0; loop < past_projects.length; loop++)
                {
                    //find the employee which has the current project id
                    for(var loop2 = 0; loop2 < emp_check_list.length; loop2++)
                    {
                        //search through each
                        for(var loop3 = 0; loop3 < emp_check_list[loop2].length; loop3++)
                        {
                            //console.log(emp_check_list[loop2][loop3].past_projects[emp_check_list[loop2][loop3].past_projects.length-1]);
                            var emp_project = emp_check_list[loop2][loop3].past_projects[emp_check_list[loop2][loop3].past_projects.length-1];
                            var past_project = past_projects[loop]._id;
                            if(emp_project == past_project)
                            {
                                emp_check_list[loop2][loop3].last_project_date = past_projects[loop].project_end_date;
                            }
                        }
                    }
                }
                //now get all projects which have these id's
                //now add these projects past dates to the correct employees

                var pso = new Algorithm(start_date, emp_check_list, positions, position_counts, 10);
                var allocated_list = pso.runAlgorithm();

                /*create a return list */
                var return_list = {};
                return_list[0] = allocated_list;
                return_list[1] = [];
                var unallocated_count = 0;
                /*check if the employee is not in the allocated list*/
                /*if not, add it to the return list index 2*/
                for (var loop = 0; loop < Object.keys(employee_lists).length; loop++)
                {
                    for (var loop2 = 0; loop2 < Object.keys(employee_lists[loop]).length; loop2++)
                    {
                        var test = true;
                        for (var loop3 = 0; loop3 < allocated_list.length; loop3++)
                        {
                            if (allocated_list[loop3]._id == employee_lists[loop][loop2]._id)
                                test = false;
                        }
                        if (test == true)
                        {
                            //make sure its not already in the list
                            var check2 = true;
                            for(var loop4 = 0; loop4 < return_list[1].length; loop4++)
                            {
                                if(employee_lists[loop][loop2]._id == return_list[1][loop4]._id)
                                    check2 = false;
                            }
                            if(check2 == true)
                            {
                                return_list[1][unallocated_count] = employee_lists[loop][loop2];
                                unallocated_count++;
                            }
                        }
                    }
                }
                var budget = 0;
                for (var loop = 0; loop < allocated_list.length; loop++) {
                    budget += allocated_list[loop].rate;
                }
                var timeDiff = Math.abs(start_date - end_date);
                var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
                return_list[2] = budget * diffDays;
                return_list[3] = no_skills_list;
                console.log("the budget for the project is : R" + return_list[2]);
                return callback(return_list);
            });
        }
    });
};
function predicateBy(prop){
    return function(a,b){
        if( a[prop] > b[prop]){
            return 1;
        }else if( a[prop] < b[prop] ){
            return -1;
        }
        return 0;
    }
}

