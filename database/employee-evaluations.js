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
/* TODO : find employees which are free for the current duration */
/* TODO : find employees which have the correct skills */
/* TODO : add how long an employee has not been working to employee_list */
exports.get_unallocated_users = function (skills, start_date, end_date, callback) {
    console.log("unallocated users requested");
    console.log("skills : " + skills);
    console.log("start date : " + start_date);
    console.log("end date : " + end_date);
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

            var employee_lists = [];
            var skills_count = [skills.length];
            for(var loop = 0; loop < skills.length; loop++)
            {
                skills_count[loop] = 0;
                employee_lists[loop] = [];
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
            for(var loop = 0; loop < Object.keys(skills).length; loop++)
            {
                for(var loop2 = 0; loop2 < Object.keys(employee_lists[loop]).length; loop2++)
                {
                    //Add an employee_value attribute to each employee in the list
                    employee_lists[loop][loop2].value = 0;
                    //give scores to how many years they have been working from employement length (higher = better)
                    employee_lists[loop][loop2].value += parseInt(employee_lists[loop][loop2].employment_length);

                    //give a score to there rank, based off cost to company (Higher = better)
                    employee_lists[loop][loop2].value += parseInt(employee_lists[loop][loop2].rate)/100;

                    //give a score to the number of skills they have
                    employee_lists[loop][loop2].value += parseInt(employee_lists[loop][loop2].skill.length);

                    //give a score to how long they have not been working for HIGH WEIGHTING APPLIED

                    //give a score to employees who have worked on past projects with the same skill tag

                    //weights for employees who have experience working on projects before with the same skill tag applied to their past project score

                    //how many previous projects the employee has had
                }
            }

            for(var loop = 0; loop < Object.keys(skills).length; loop++)
            {
                employee_lists[loop].sort(predicateBy("value"));
            }

            /*add a position variable to each employee for each list*/
            for(var loop = 0; loop < Object.keys(skills).length; loop++)
            {
                for(var loop2 = 0; loop2 < Object.keys(employee_lists[loop]).length; loop2++)
                {
                    employee_lists[loop][loop2].pos = loop2;
                }
            }

            for(var loop = 0; loop < Object.keys(skills).length; loop++)
            {
                for(var loop2 = 0; loop2 < Object.keys(employee_lists[loop]).length; loop2++)
                {
                    console.log(employee_lists[loop][loop2]);
                }
            }

            /*for(var loop = 0; loop < Object.keys(skills).length; loop++)
            {
                console.log("best employee in list : "+loop+" is at position "
                    +employee_lists[loop][(employee_lists[loop].length-1)].position+" with value : "+employee_lists[loop][(employee_lists[loop].length-1)].value);
            }*/

            var pso = new Algorithm(employee_lists, 20);
            var allocated_list = pso.runAlgorithm();

            /*create a return list */
            var return_list = {};
            return_list[0] = allocated_list;
            return_list[1] = [];
            var unallocated_count = 0;
            /*check if the employee is not in the allocated list*/
                /*if not, add it to the return list index 2*/
            for(var loop = 0; loop < Object.keys(employee_lists).length; loop++) {
                var test = true;
                for (var loop2 = 0; loop2 < allocated_list.length; loop2++) {
                    if(allocated_list[loop2] == employee_lists[loop])
                        test = false;
                }
                if (test == true)
                {
                    return_list[1][unallocated_count] = employee_lists[loop];
                    unallocated_count++;
                }
            }

            /*work out budget*/
            var budget = 0;
            for(var loop = 0; loop < allocated_list.length; loop++)
            {
                budget += allocated_list[loop].rate;
            }
            var timeDiff = Math.abs(start_date - end_date);
            var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
            return_list[2] = budget*diffDays;
            console.log("the budget for the project is : R"+return_list[2]);
            return callback(return_list);
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
