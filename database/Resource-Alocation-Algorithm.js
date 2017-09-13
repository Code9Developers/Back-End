/**
 * Created by Jordan on 21-Jul-17.
 */
var exports = module.exports = {};

var schemas = require('.././database/schemas.js');
var dbs = require('.././database/dbs.js');

exports.get_unallocated_users = function (num_emp, skills, duration, budget, callback) {
    console.log("unallocated users requested");
    console.log("number of employees : " + parseInt(num_emp));
    console.log("skills : " + skills);
    console.log("duration : " + duration);
    console.log("budget : " + budget);
    var user = schemas.user;

    user.find({current_projects: []}, function (err, result) {
        if (err) {
            console.log("Error finding employees.");
        }
        else if (!result) {
            console.log("employees not found.");
        }
        else {
            console.log("employees found.");
            //console.log(JSON.stringify(result));
            var return_json = {};
            var limit_amount = parseInt(num_emp);
            var loop = 0;
            var i = 0;
            while (i < limit_amount && i<=result.length) {
                if (result[loop].role == "Employee") {
                    var new_json_obj = {
                        _id: result[loop]._id,
                        name: result[loop].name,
                        surname: result[loop].surname,
                        position: result[loop].position,
                        employment_length: result[loop].employment_length,
                        past_projects: result[loop].past_projects
                    };
                    return_json[i] = new_json_obj;
                    i++;
                }
                loop++;
            }
            console.log(return_json);
            return callback(return_json);
        }
    });
};