/**
 * Created by Jordan on 21-Jul-17.
 */
var exports = module.exports = {};

var schemas = require('.././database/schemas.js');
var dbs = require('.././database/dbs.js');
var PythonShell = require('python-shell');

/* TODO : find employees which are free for the current duration */
/* TODO : find employees which have the correct skills */
/* TODO : add how long an employee has not been working to employee_list */
exports.get_unallocated_users = function (skills, start_date, end_date, budget, callback) {
    console.log("unallocated users requested");
    console.log("skills : " + skills);
    console.log("start date : " + start_date);
    console.log("end date : " + end_date);
    console.log("budget : " + budget);
    var user = schemas.user;

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
            //we make 1 list for each skill
            //all employees who have that skill are added to the list
            var employee_lists = {};
            var skills_count = [skills.length];
            for(var loop = 0; loop < skills.length; loop++)
            {
                skills_count[loop] = 0;
                employee_lists[loop] = {};
            }
            for(var loop = 0; loop < Object.keys(result).length; loop++)
            {
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
                //for every skill tag
                for(var loop2 = 0; loop2 < Object.keys(skills).length; loop2++)
                {
                    //for every skill the employee has
                    for(var loop3 = 0; loop3 < result[loop].skill.length; loop3++)
                    {
                        //if the employee has the skill
                        if(result[loop].skill[loop3].name == skills[loop2])
                        {
                            //add them to that skills list
                            //possibly remove the skill from the list
                            new_json_obj.skill.push(skills[loop2]);
                            employee_lists[loop2][skills_count[loop2]] = new_json_obj;
                            skills_count[loop2]+=1;
                        }
                    }
                }
            }

            console.log("Evaluating relevant employees");
            /* We evaluate each employee in each skill list */
            /* NOTE The employees with the highest scores, have the highest chance to get
             *  chosen for the team */
            //for each list
            for(var loop = 0; loop < Object.keys(skills).length; loop++)
            {
                //for each employee
                console.log("employee skill list size : "+Object.keys(employee_lists[loop]).length);
                for(var loop2 = 0; loop2 < Object.keys(employee_lists[loop]).length; loop2++)
                {
                    //Add an employee_value attribute to each employee in the list
                    employee_lists[loop][loop2].value = 0;
                    //console.log(employee_lists[loop][loop2]);
                    //give scores to how many years they have been working
                    employee_lists[loop][loop2].value += parseInt(employee_lists[loop][loop2].employment_length);
                    //give a score to how long they have not been working for HIGH WEIGHTING APPLIED

                    //give a score to employees who have worked on past projects with the same skill tag
                }
            }

            for(var loop = 0; loop < Object.keys(skills).length; loop++)
            {
                console.log("displaying list for skill : "+skills[loop]);
                console.log(employee_lists[loop]);
            }

            var pythonFile = 'bare_bones_PSO.py';
            var shell = new PythonShell(pythonFile);
            shell.send('hello world!');
            return callback(employee_lists);
        }
    });
};