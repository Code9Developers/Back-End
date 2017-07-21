var exports = module.exports = {} ;

var mongoose = require('mongoose') ;
var schemas = require('.././database/schemas.js') ;
var connection = require('.././database/connect.js') ;
var bcrypt = require('bcrypt') ;

exports.insertUser = function(_json) {

    var user = schemas.user ;

    var _user = new user(_json) ;

    _user.save(function (err) {
        if (err) {
            console.log(_user.role + " could not be inserted.") ;
            console.log(err) ;
        }
        else {
            console.log("Successfully inserted " + _user.role + ".") ;
        }
    }) ;

}

//other search templates could be added

exports.findUser = function(Id, callback) {

    var user = schemas.user;

    user.findOne({_id: Id}, function (err, doc) {
        if (err) {
            console.log("Error finding User.");
        }
        else if (!doc) {
            console.log("User not found.");
        }
        else {
            console.log("User found.") ;
            return callback(doc) ;
        }
    });
}

exports.insertProject = function(_json) {

    var project = schemas.project ;

    var project1 = new project(_json) ;

    project1.save(function (err) {
        if (err) {
            console.log("Project could not be inserted.") ;
            console.log(err) ;
        }
        else {
            console.log("Successfully inserted project.") ;
        }
    });
}

exports.findProject = function(Id, callback) {

    var project = schemas.project;

    project.findOne({_id: Id}, function (err, doc) {
        if (err) {
            console.log("Error finding Project.");
        }
        else if (!doc) {
            console.log("Project not found.");
        }
        else {
            console.log("Project found.") ;
            return callback(doc) ;
        }
    });
}

// exports.encrypt = function(value, callback) {
//     return bcrypt.hashSync(value, 10)
//
// }

exports.encrypt = function(value, callback) {
    bcrypt.hash(value, 10, function(err, hash) {
        return callback(hash) ;
    });
}

exports.authenticate = function(user_id, password, callback) {
    var user = module.exports.findUser(user_id, function(user) {
        var hash = user.password ;
        bcrypt.compare(password, hash, function (err, res) {
            if (err) {
                console.log("Authentication error.") ;
                console.log(err) ;
            }
            console.log("authenticated: " + res);
            return callback(res);
        });
    })
}

exports.get_role = function(user_id, callback) {
    var user = module.exports.findUser(user_id, function(user) {
        if (!emp) {
            console.log("User not found.") ;
        }
        else {
            console.log(user.role + "found.") ;
            return callback(user.role) ;
        }
    })
}
