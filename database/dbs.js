var exports = module.exports = {};

var mongoose = require('mongoose');
var schemas = require('.././database/schemas.js');
var connection = require('.././database/connect.js');
var bcrypt = require('bcryptjs');
var generator = require('generate-password');
var fs = require('fs');


/*
 ***********************************************************************************************************************
 ALL USER-RELATED FUNCTIONS BELOW --->>
 ***********************************************************************************************************************
 */

// inserts user defined in JSON string "_json"
exports.insertUser = function (_json) {

    var user = schemas.user;

    var _user = new user(_json);

    _user.save(function (err) {
        if (err) {
            console.log(_user.role + " could not be inserted.");
            console.log(err);
        }
        else {
            console.log("Successfully inserted " + _user.role + ".");
        }
    });
};

// returns all users where attributes 'attrib' have value of 'value'
exports.findUsers = function (attrib, value, callback) {

    var user = schemas.user;
    var query = JSON.parse('{ ' + "\"" + attrib + "\"" + ': ' + "\"" + value + "\"" + '}');

    user.find(query, function (err, docs) {
        if (err) {
            console.log("Error finding Users.");
            console.log(err);
        }
        else if (JSON.stringify(docs) === "[]") {
            console.log("No Users found.");
        }
        else {
            console.log("Users found.");
            return callback(docs);
        }
    });
};

// finds all users with attribute "attrib" of value "value",
// and sets their attribute of "attrib_to_edit" to "new_value"
exports.editUsers = function (attrib, value, attrib_to_edit, new_value) {

    var user = schemas.user;
    var query = JSON.parse('{ ' + '"' + attrib + '"' + ': ' + '"' + value + '"' + '}');
    var update = JSON.parse('{ ' + '"' + attrib_to_edit + '"' + ': ' + '"' + new_value + '"' + '}');

    user.update(query, {$set: update}, {multi: true}, function (err) {
        if (!err) {
            console.log("Users " + attrib_to_edit + "\'s updated.");
        }
        else {
            console.log("Error updating " + attrib_to_edit + "\'s of Users.");
            console.log(err);
        }
    });
};


//edits the object stored in an array of objects for all users with attrib value
exports.editUserObject = function (attrib, value, object, object_attrib, object_value, attrib_to_edit, new_value) {

    var user = schemas.user;
    var query = JSON.parse('{ ' + '"' + attrib + '":' + '"' + value + '"' + ', ' + '"' + object + '.' + object_attrib + '"' + ': ' + '"' + object_value + '"' + '}');
    var update = JSON.parse('{ ' + '"' + object + '.$.' + attrib_to_edit + '"' + ': ' + '"' + new_value + '"' + '}');

    user.update(query, {$set: update}, {multi: true}, function (err) {
        if (!err) {
            console.log("User " + object + " updated.");
        }
        else {
            console.log("Error updating " + object + " of User.");
            console.log(err);
        }
    });
}


//adds object to array of objects of user with specific id
exports.insertUserObject = function (user_id, object, _json) {
	
	var user = schemas.user ;
	var update = JSON.parse('{ ' + '"' + object + '"' + ': ' + JSON.stringify(_json) + '}');
	
	user.findByIdAndUpdate(user_id, {$push: update}, function (err) {
        if (!err) {
            console.log(object + " inserted into User.");
        }
        else {
            console.log("Error inserting " + object + " into User.");
            console.log(err);
        }
    });
}

//removes object with attrib of value from array of objects of user with specific id
exports.removeUserObject = function (user_id, object, attrib, value) {
	
	var user = schemas.user ;
	var update = JSON.parse('{ ' + '"' + object + '"' + ': ' + '{' + '"' + attrib + '"' + ': ' + '"' + value + '"' + '}' + '}');
	
	user.update({_id: user_id}, {$pull: update}, function (err) {
        if (!err) {
            console.log(object + " removed from User.");
        }
        else {
            console.log("Error removing " + object + " from User.");
            console.log(err);
        }
    });
}


//edits the profile image of a user
exports.editProfileImage = function (user_id, filename) {

    var user = schemas.user;

    var precount;
    var count = 0;
    while (count != -1) {
        precount = count;
        count = filename.indexOf("\\", count + 1);
    }
    filename = filename.substring(precount + 1, filename.length);

    var _data = fs.readFileSync(filename);

    var _content = "image/" + filename.substring(filename.indexOf(".") + 1, filename.length);


    user.update({_id: user_id}, {$set: {image: {data: _data, contentType: _content}}}, function (err) {
        if (!err) {
            console.log("User Image updated.");
        }
        else {
            console.log("Error updating Image of Users.");
            console.log(err);
        }
    });

    console.log("Image successfully saved.");
}

exports.deleteUser = function (user_id) {

    var user = schemas.user;
	
	module.exports.findUsers("_id", user_id, function(res) {
		module.exports.insertGhost(res) ;
	});
	
    user.remove({_id: user_id}, function (err) {
        if (!err) {
            console.log("User successfully deleted.");
        }
        else {
            console.log("Error deleting User.");
        }
    });
};

 /*
 ***********************************************************************************************************************
 ***********************************************************************************************************************
 */
 
 /*
 ***********************************************************************************************************************
 ALL GHOST-RELATED FUNCTIONS BELOW --->>
 ***********************************************************************************************************************
 */
 
exports.insertGhost = function (_json) {

    var ghost = schemas.ghost;

    var _ghost = new ghost(_json);

    _ghost.save(function (err) {
        if (err) {
            console.log("Ghost could not be inserted.");
            console.log(err);
        }
        else {
            console.log("Successfully inserted Ghost");
        }
    });
};

//I'll add view/resurrect functions later
 
 /*
 ***********************************************************************************************************************
 ***********************************************************************************************************************
 */

/*
 ***********************************************************************************************************************
 ALL EVENT-RELATED FUNCTIONS BELOW --->>
 ***********************************************************************************************************************
 */

exports.insertEvent = function (_json) {

    var event = schemas.event;
    var user = schemas.event;

    var _event = new event(_json);

    _event.save(function (err) {
        if (err) {
            console.log("Event could not be inserted.");
            console.log(err);
        }
        else {
            console.log("Successfully inserted Event.");
        }
    });

    user.findByIdAndUpdate(_event.user_id, {$push: {events: _event._id}}, function (err) {
        if (!err) {
            console.log("Event inserted into User.");
        }
        else {
            console.log("Error inserting Event into User.");
            console.log(err);
        }
    });
};

exports.findEvents = function (attrib, value, callback) {

    var event = schemas.event;
    var query = JSON.parse('{ ' + "\"" + attrib + "\"" + ': ' + "\"" + value + "\"" + '}');

    event.find(query, function (err, docs) {
        if (err) {
            console.log("Error finding Events.");
            console.log(err);
        }
        else if (JSON.stringify(docs) === "[]") {
            console.log("No Events found.");
        }
        else {
            console.log("Events found.");
            return callback(docs);
        }
    });
};

exports.editEvents = function (attrib, value, attrib_to_edit, new_value) {

    var event = schemas.event;
    var query = JSON.parse('{ ' + '"' + attrib + '"' + ': ' + '"' + value + '"' + '}');
    var update = JSON.parse('{ ' + '"' + attrib_to_edit + '"' + ': ' + '"' + new_value + '"' + '}');

    event.update(query, {$set: update}, {multi: true}, function (err) {
        if (!err) {
            console.log("Events " + attrib_to_edit + "\'s updated.");
        }
        else {
            console.log("Error updating " + attrib_to_edit + "\'s of Events.");
            console.log(err);
        }
    });
};

exports.deleteEvent = function (event_id) {

    var event = schemas.event;

    event.remove({_id: event_id}, function (err) {
        if (!err) {
            console.log("Event successfully deleted.");
        }
        else {
            console.log("Error deleting Event.");
        }
    });

    // de-reference events in corresponding users
};

/*
 ***********************************************************************************************************************
 ***********************************************************************************************************************
 */

/*
 ***********************************************************************************************************************
 ALL USER+PROJECT-RELATED FUNCTIONS BELOW --->>
 ***********************************************************************************************************************
 */

// assigns project to user and vice versa

// Note: You need to specify for which skill the user is being assigned to the project, BECAUSE THE SKILL ATTRIBUTE IS AN ARRAY!!

exports.assignProject = function (user_id, project_id, _skill) {

    var user = schemas.user;
    var project = schemas.project;

    user.findByIdAndUpdate(user_id, { $push: {current_projects: project_id}}, function (err) {
        if (!err) {
            console.log("Project added to User.");
        }
        else {
            console.log("Error adding Project to User.");
            console.log(err);
        }
    });

    project.findByIdAndUpdate(project_id, {$push: {employees_assigned: {_id: user_id, skill: _skill}}}, function (err) {
        if (!err) {
            console.log("User added to Project.");
        }
        else {
            console.log("Error adding User to Project.");
            console.log(err);
        }
    });
};

// WARNING! AUTISM ALERT: Race Conditions
exports.insertAndAssignProject = function (_json, employees) {

    var project = schemas.project;

    module.exports.insertProject(_json);

    var _project = new project(_json);

    for (var loop = 0; loop < employees.length; loop++) {
        module.exports.assignProject(employees[loop], _project._id);
    }
    module.exports.completeProject(_project._id, _project.project_rating);
};

// remove employee from project and vice versa
exports.dismissProject = function (user_id, project_id) {

    var project = schemas.project;
    var user = schemas.user;

    module.exports.removeProjectObject(project_id, "employees_assigned", "_id", user_id) ;

    user.findByIdAndUpdate(user_id, {$pull: {current_projects: project_id}}, function (err) {
        if (!err) {
            console.log("Project removed from User.");
        }
        else {
            console.log("Error removing Project from User.");
            console.log(err);
        }
    });
	
};


//giving bug where project is pulled for all employees, but isn't pushing for all employees

// marks a project as completed, and moves project to past_project array of all employees_assigned and manager
exports.completeProject = function (project_id, rating) {

    module.exports.editProjects("_id", project_id, "status", "completed");

    module.exports.editProjects("_id", project_id, "project_end_date", new Date());

    module.exports.editProjects("_id", project_id, "project_rating", rating);

    var user = schemas.user;
    var project = schemas.project;

    user.update({current_projects: project_id}, {$push: {past_projects: project_id}}, {multi: true}, function (err) {
        if (!err) {
            console.log("Projects set as past projects for employees assigned.");
			
			user.update({current_projects: project_id}, {$pull: {current_projects: project_id}}, {multi: true}, function (err) {
			if (!err) {
				console.log("Projects removed from current projects for employees assigned.");
			}
			else {
				console.log("Error removing Projects from current projects for employees assigned.");
				console.log(err);
			}
    });
        }
        else {
            console.log("Error setting Projects as past projects for employees assigned.");
            console.log(err);
        }
    });

    //de-reference all tasks from employees assigned


};

/*
 ***********************************************************************************************************************
 ***********************************************************************************************************************
 */

/*
 ***********************************************************************************************************************
 ALL PROJECT-RELATED FUNCTIONS BELOW --->>
 ***********************************************************************************************************************
 */

// inserts project defined in JSON string "_json"
exports.insertProject = function (_json) {

    var project = schemas.project;
    var user = schemas.user;

    var _project = new project(_json);

    _project.save(function (err) {
        if (err) {
            console.log("Project could not be inserted.");
            console.log(err);
        }
        /*else {
         console.log("Successfully inserted Project.") ;
         }*/
    });
    user.findByIdAndUpdate(_project.manager_id, {
        $push: {
            current_projects: {
                _id: _project._id,
                skill: "Manager"
            }
        }
    }, function (err) {
        if (!err) {
            console.log("Project added to User (Manager).");
        }
        else {
            console.log("Error adding Project to User (Manager).");
            console.log(err);
        }
    });
};

// returns all projects where attributes 'attrib' have value of 'value'
exports.findProjects = function (attrib, value, callback) {

    var project = schemas.project;
    var query = JSON.parse('{ ' + "\"" + attrib + "\"" + ': ' + "\"" + value + "\"" + '}');

    project.find(query, function (err, docs) {
        if (err) {
            console.log("Error finding Projects.");
            console.log(err);
        }
        else if (JSON.stringify(docs) === "[]") {
            console.log("No Projects found.");
        }
        else {
            console.log("Projects found.");
            return callback(docs);
        }
    });
};

// returns all projects  --- Is this function even necessary? Like c'mon bruh
exports.findAllProjects = function (callback) {

    module.exports.findProjects("__v", 0, function(res) {
		return callback(res) ;
	});
};

// finds all projects with attribute "attrib" of value "value",
// and sets their attribute of "attrib_to_edit" to "new_value"
exports.editProjects = function (attrib, value, attrib_to_edit, new_value) {

    var project = schemas.project;
    var query = JSON.parse('{ ' + '"' + attrib + '"' + ': ' + '"' + value + '"' + '}');
    var update = JSON.parse('{ ' + '"' + attrib_to_edit + '"' + ': ' + '"' + new_value + '"' + '}');

    project.update(query, {$set: update}, {multi: true}, function (err) {
        if (!err) {
            console.log("Projects " + attrib_to_edit + "\'s updated.");
        }
        else {
            console.log("Error updating " + attrib_to_edit + "\'s of Projects.");
            console.log(err);
        }
    });
};

//adds object to array of objects of project with specific id
exports.insertProjectObject = function (project_id, object, _json) {
	
	var project = schemas.project ;
	var update = JSON.parse('{ ' + '"' + object + '"' + ': ' + JSON.stringify(_json) + '}');
	
	project.findByIdAndUpdate(project_id, {$push: update}, function (err) {
        if (!err) {
            console.log(object + " inserted into Project.");
        }
        else {
            console.log("Error inserting " + object + " into Project.");
            console.log(err);
        }
    });
}

//removes object with attrib of value from array of objects of project with specific id
exports.removeProjectObject = function (project_id, object, attrib, value) {
	
	var project = schemas.project ;
	var update = JSON.parse('{ ' + '"' + object + '"' + ': ' + '{' + '"' + attrib + '"' + ': ' + '"' + value + '"' + '}' + '}');
	
	project.update({_id: project_id}, {$pull: update}, function (err) {
        if (!err) {
            console.log(object + " removed from Project.");
        }
        else {
            console.log("Error removing " + object + " from Project.");
            console.log(err);
        }
    });
}

exports.editProjectObject = function (attrib, value, object, object_attrib, object_value, attrib_to_edit, new_value) {

    var project = schemas.project;
    var query = JSON.parse('{ ' + '"' + attrib + '":' + '"' + value + '"' + ', ' + '"' + object + '.' + object_attrib + '"' + ': ' + '"' + object_value + '"' + '}');
    var update = JSON.parse('{ ' + '"' + object + '.$.' + attrib_to_edit + '"' + ': ' + '"' + new_value + '"' + '}');

    project.update(query, {$set: update}, {multi: true}, function (err) {
        if (!err) {
            console.log("Project " + object + " updated.");
        }
        else {
            console.log("Error updating " + object + " of Project.");
            console.log(err);
        }
    });
}

// checks if projects are complete and updates status
exports.refreshProjectStatus = function () {

    var project = schemas.project;
    var today = String(new Date());

    project.update({project_end_date: {$lt: today}}, {$set: {status: "completed"}}, {multi: true}, function (err) {
        if (!err) {
            console.log("Projects status updated.");
        }
        else {
            console.log("Error updating Projects status.");
            console.log(err);
        }
    });
};

/*
 ***********************************************************************************************************************
 ***********************************************************************************************************************
 */

/*
 ***********************************************************************************************************************
 ALL MILESTONE-RELATED FUNCTIONS BELOW --->>
 ***********************************************************************************************************************
 */

// inserts milestone, and inserts it into correspondig project
exports.insertMilestone = function (_json) {

    var milestone = schemas.milestone;
    var project = schemas.project;

    var _milestone = new milestone(_json);

    _milestone.save(function (err) {
        if (err) {
            console.log("Milestone could not be inserted.");
            console.log(err);
        }
        else {
            console.log("Successfully inserted Milestone.");
        }
    });

    project.findByIdAndUpdate(_milestone.project_id, {$push: {milestones: _milestone._id}}, function (err) {
        if (!err) {
            console.log("Milestone inserted into Project.");
        }
        else {
            console.log("Error inserting Milestone into Project.");
            console.log(err);
        }
    });
};

exports.findMilestones = function (attrib, value, callback) {

    var milestone = schemas.milestone;
    var query = JSON.parse('{ ' + "\"" + attrib + "\"" + ': ' + "\"" + value + "\"" + '}');

    milestone.find(query, function (err, docs) {
        if (err) {
            console.log("Error finding Milestones.");
            console.log(err);
        }
        else if (JSON.stringify(docs) === "[]") {
            console.log("No Milestones found.");
        }
        else {
            console.log("Milestones found.");
            return callback(docs);
        }
    });
};

exports.editMilestones = function (attrib, value, attrib_to_edit, new_value) {

    var milestone = schemas.milestone;
    var query = JSON.parse('{ ' + '"' + attrib + '"' + ': ' + '"' + value + '"' + '}');
    var update = JSON.parse('{ ' + '"' + attrib_to_edit + '"' + ': ' + '"' + new_value + '"' + '}');

    milestone.update(query, {$set: update}, {multi: true}, function (err) {
        if (!err) {
            console.log("Milestones " + attrib_to_edit + "\'s updated.");
        }
        else {
            console.log("Error updating " + attrib_to_edit + "\'s of Milestones.");
            console.log(err);
        }
    });
};

exports.deleteMilestone = function (milestone_id) {

    var milestone = schemas.milestone;

    milestone.remove({_id: milestone_id}, function (err) {
        if (!err) {
            console.log("Milestone successfully deleted.");
        }
        else {
            console.log("Error deleting Milestone.");
        }
    });
};

//removes all expired milestones from project
exports.removeExpiredMilestones = function (project_id) {

    var project = schemas.project;
    var milestone = schemas.milestone;
    var today = new Date();

    milestone.find({project_id: project_id, milestone_end_date: {$lt: today}}, function (err, results) {
        if (err) {
            console.log("Error finding expired Milestones.");
            console.log(err);
        }
        if (JSON.stringify(results) === "[]") {
            console.log("No expired Milestones for project found.");
            console.log(results);
        }
        else {
            for (var x = 0; x < results.length; x++) {
                for (var y = 0; y < results[x].tasks.length; y++) {
                    module.exports.deleteTask(results[x].tasks[y]._id);
                    project.update({tasks: results[x].tasks[y]._id}, {$pull: {tasks: results[x].tasks[y]._id}}, function (err, user) {
                        if (!err) {
                            console.log("Task removed from Project.");
                        }
                        else {
                            console.log("Error removing Task from Project.");
                            console.log(err);
                        }
                    });
                }
                module.exports.deleteMilestone(results[x]._id);
                project.update({milestones: results[x]._id}, {$pull: {milestones: results[x]._id}}, function (err, user) {
                    if (!err) {
                        console.log("Milestone removed from Project.");
                    }
                    else {
                        console.log("Error removing Milestone from Project.");
                        console.log(err);
                    }
                });
            }
        }
    });
};

/*
 ***********************************************************************************************************************
 ***********************************************************************************************************************
 */

/*
 ***********************************************************************************************************************
 ALL TASK-RELATED FUNCTIONS BELOW --->>
 ***********************************************************************************************************************
 */

// inserts task, and inserts it into corresponding milestone and project
exports.insertTask = function (_json) {

    var task = schemas.task;
    var milestone = schemas.milestone;
    var project = schemas.project;

    var _task = new task(_json);

    _task.save(function (err) {
        if (err) {
            console.log("Task could not be inserted.");
            console.log(err);
        }
        else {
            console.log("Successfully inserted Task.");
        }
    });

    if (_task.milestone_id === null) {
        console.log("Task has no Milestone.");
    }
    else {
        milestone.findByIdAndUpdate(_task.milestone_id, {$push: {tasks: _task._id}}, function (err) {
            if (!err) {
                console.log("Task inserted into Milestone.");
            }
            else {
                console.log("Error inserting Task into Milestone.");
                console.log(err);
            }
        });
    }

    project.findByIdAndUpdate(_task.project_id, {$push: {tasks: _task._id}}, function (err) {
        if (!err) {
            console.log("Task inserted into Project.");
        }
        else {
            console.log("Error inserting Task into Project.");
            console.log(err);
        }
    });
};

exports.findTasks = function (attrib, value, callback) {

    var task = schemas.task;
    var query = JSON.parse('{ ' + "\"" + attrib + "\"" + ': ' + "\"" + value + "\"" + '}');

    task.find(query, function (err, docs) {
        if (err) {
            console.log("Error finding Tasks.");
            console.log(err);
        }
        else if (JSON.stringify(docs) === "[]") {
            console.log("No Tasks found.");
        }
        else {
            console.log("Tasks found.");
            return callback(docs);
        }
    });
};

exports.editTasks = function (attrib, value, attrib_to_edit, new_value) {

    var task = schemas.task;
    var query = JSON.parse('{ ' + '"' + attrib + '"' + ': ' + '"' + value + '"' + '}');
    var update = JSON.parse('{ ' + '"' + attrib_to_edit + '"' + ': ' + '"' + new_value + '"' + '}');

    task.update(query, {$set: update}, {multi: true}, function (err) {
        if (!err) {
            console.log("Tasks " + attrib_to_edit + "\'s updated.");
        }
        else {
            console.log("Error updating " + attrib_to_edit + "\'s of Tasks.");
            console.log(err);
        }
    });
};

exports.deleteTask = function (task_id) {

    var task = schemas.task;

    task.remove({_id: task_id}, function (err) {
        if (!err) {
            console.log("Task successfully deleted.");
        }
        else {
            console.log("Error deleting Task.");
        }
    });
};

/*
 ***********************************************************************************************************************
 ***********************************************************************************************************************
 */

/*
 ***********************************************************************************************************************
 ALL NOTIFICATION-RELATED FUNCTIONS BELOW --->>
 ***********************************************************************************************************************
 */

exports.insertNotification = function (_json) {

    var notification = schemas.notification;

    var _notification = new notification(_json);

    _notification.save(function (err) {
        if (err) {
            console.log("Notification could not be inserted.");
            console.log(err);
        }
        else {
            console.log("Successfully inserted Notification.");
        }
    });
};

exports.deleteNotification = function (notification_id) {

    var notification = schemas.notification;

    notification.remove({_id: notification_id}, function (err) {
        if (!err) {
            console.log("Notification successfully deleted.");
        }
        else {
            console.log("Error deleting Notification.");
        }
    });
};

//returns all unread notifications for specific user
exports.unreadNotifications = function (user_id, callback) {
    var notification = schemas.notification;

    notification.find({user_id: user_id, isRead: false}, function (err, docs) {
        if (err) {
            console.log("Error finding Notifications.");
            console.log(err);
        }
        else if (JSON.stringify(docs) === "[]") { //for some reason, all collections are stored as follows "[ <collections> ]'
            console.log("No Unread Notifications found.");
        }
        else {
            console.log("Unread Notifications found.");
            return callback(docs);
        }
    });
};

/*
 ***********************************************************************************************************************
 ***********************************************************************************************************************
 */
exports.insert_approval = function (_json) {

    var approval = schemas.approval;

    var _approval = new approval(_json);

    _approval.save(function (err) {
        if (err) {
            console.log("Approval could not be inserted.");
            console.log(err);
        }
        else {
            console.log("Approval inserted Notification.");
        }
    });
};

exports.editApproval = function (attrib, value, attrib_to_edit, new_value) {

    var ap = schemas.approval;
    var query = JSON.parse('{ ' + '"' + attrib + '"' + ': ' + '"' + value + '"' + '}');
    var update = JSON.parse('{ ' + '"' + attrib_to_edit + '"' + ': ' + '"' + new_value + '"' + '}');

    ap.update(query, {$set: update}, {multi: true}, function (err) {
        if (!err) {
            console.log("Approval " + attrib_to_edit + "\'s updated.");
        }
        else {
            console.log("Error updating " + attrib_to_edit + "\'s of Approvals.");
            console.log(err);
        }
    });
};

exports.find_approval = function (attrib, value, callback) {

    var approval = schemas.approval;
    var query = JSON.parse('{ ' + "\"" + attrib + "\"" + ': ' + "\"" + value + "\"" + '}');

    approval.find(query, function (err, docs) {
        if (err) {
            console.log("Error finding approval.");
            console.log(err);
        }
        else if (JSON.stringify(docs) === "[]") {
            console.log("No approval found.");
        }
        else {
            console.log("approval found.");
            return callback(docs);
        }
    });
};

exports.remove_approval = function (approval_id) {

    var approval = schemas.approval;

    approval.remove({_id: approval_id}, function (err) {
        if (!err) {
            console.log("Approval successfully deleted.");
        }
        else {
            console.log("Error deleting Approval.");
        }
    });
};
/*
 ***********************************************************************************************************************
 ALL APPROVAL FUNCTIONS BELOW --->>
 ***********************************************************************************************************************
 */

/*
 ***********************************************************************************************************************
 ***********************************************************************************************************************
 */

/*
 ***********************************************************************************************************************
 ALL PASSWORD+ENCRYPTION-RELATED FUNCTIONS BELOW --->>
 ***********************************************************************************************************************
 */

exports.encrypt = function (value, callback) {
    bcrypt.hash(value, 10, function (err, hash) {
        return callback(hash);
    });
};

exports.authenticate = function (user_id, password, callback) {

    module.exports.findUsers("_id", user_id, function (user) {
        var hash = user.password;
        bcrypt.compare(password, hash, function (err, res) {
            if (err) {
                console.log("Authentication error.");
                console.log(err);
            }
            console.log("authenticated: " + res);
            return callback(res);
        });
    });
};

/*
 ***********************************************************************************************************************
 ***********************************************************************************************************************
 */


