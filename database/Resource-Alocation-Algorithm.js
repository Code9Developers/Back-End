/**
 * Created by Jordan on 21-Jul-17.
 */
var exports = module.exports = {} ;

var schemas = require('.././database/schemas.js') ;
var dbs = require('.././database/dbs.js') ;

exports.get_unallocated_users = function(num_emp, skills, duration, budget, callback) {
  console.log("unallocated users requested");
    console.log("number of employees : "+parseInt(num_emp));
    console.log("skills : "+skills);
    console.log("duration : "+ duration);
    console.log("budget : "+ budget);
    var user = schemas.user;

    user.find({current_projects: []},function (err, result) {
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
            for (var loop=0; loop<result.length; loop++){
                var new_json_obj = {name: result[loop].name, role: result[loop].role, employment_length: result[loop].employment_length};
                return_json[loop] = new_json_obj;
            }
            console.log(return_json);
            return callback(return_json);
        }
    }).limit(parseInt(num_emp));
};