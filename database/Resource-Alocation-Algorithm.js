/**
 * Created by Jordan on 21-Jul-17.
 */
var exports = module.exports = {} ;

var schemas = require('.././database/schemas.js') ;
var dbs = require('.././database/dbs.js') ;

exports.get_unallocated_users = function(number, callback) {
  console.log("unallocated users requested");
    var user = schemas.user;

    user.find({current_projects: []},function (err, result) {
        if (err) {
            console.log("Error finding User.");
        }
        else if (!result) {
            console.log("employee not found.");
        }
        else {
            console.log("employee found.");
            //console.log(JSON.stringify(result));
            return callback(result);
        }
    }).limit(number);
};