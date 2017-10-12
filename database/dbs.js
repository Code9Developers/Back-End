//let exports = module.exports = {};

const mongoose = require('mongoose');
const schemas = require('.././database/schemas.js');
const connection = require('.././database/connect.js');
const bcrypt = require('bcryptjs');
const generator = require('generate-password');
const fs = require('fs');


/**
 ***********************************************************************************************************************
 ALL USER-RELATED FUNCTIONS BELOW --->>
 ***********************************************************************************************************************
 */

// inserts user defined in JSON string "_json"
exports.insertUser = function (_json) {

    let user = schemas.user;

    let _user = new user(_json);

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

    let user = schemas.user;
    let query = JSON.parse('{ ' + "\"" + attrib + "\"" + ': ' + "\"" + value + "\"" + '}');

    user.find(query, function (err, docs) {
        if (err) {
            console.log("Error finding Users.");
            console.log(err);
        }
        else if (JSON.stringify(docs) === "[]") {
            console.log("No Users found.");
            callback("no_user");
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

    let user = schemas.user;
    let query = JSON.parse('{ ' + '"' + attrib + '"' + ': ' + '"' + value + '"' + '}');
    let update = JSON.parse('{ ' + '"' + attrib_to_edit + '"' + ': ' + '"' + new_value + '"' + '}');

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

    let user = schemas.user;
    let query = JSON.parse('{ ' + '"' + attrib + '":' + '"' + value + '"' + ', ' + '"' + object + '.' + object_attrib + '"' + ': ' + '"' + object_value + '"' + '}');
    let update = JSON.parse('{ ' + '"' + object + '.$.' + attrib_to_edit + '"' + ': ' + '"' + new_value + '"' + '}');

    user.update(query, {$set: update}, {multi: true}, function (err) {
        if (!err) {
            console.log("User " + object + " updated.");
        }
        else {
            console.log("Error updating " + object + " of User.");
            console.log(err);
        }
    });
};


//adds object to array of objects of user with specific id
exports.insertUserObject = function (user_id, object, _json) {
	
	let user = schemas.user ;
	let update = JSON.parse('{ ' + '"' + object + '"' + ': ' + JSON.stringify(_json) + '}');
	
	user.findByIdAndUpdate(user_id, {$push: update}, function (err) {
        if (!err) {
            console.log(object + " inserted into User.");
        }
        else {
            console.log("Error inserting " + object + " into User.");
            console.log(err);
        }
    });
};

//removes object with attrib of value from array of objects of user with specific id
exports.removeUserObject = function (user_id, object, attrib, value) {
	
	let user = schemas.user ;
	let update = JSON.parse('{ ' + '"' + object + '"' + ': ' + '{' + '"' + attrib + '"' + ': ' + '"' + value + '"' + '}' + '}');
	
	user.update({_id: user_id}, {$pull: update}, function (err) {
        if (!err) {
            console.log(object + " removed from User.");
        }
        else {
            console.log("Error removing " + object + " from User.");
            console.log(err);
        }
    });
};


//edits the profile image of a user
exports.editProfileImage = function (user_id, filename) {

    let user = schemas.user;

    let precount;
    let count = 0;
    while (count != -1) {
        precount = count;
        count = filename.indexOf("\\", count + 1);
    }
    filename = filename.substring(precount + 1, filename.length);

    let _data = fs.readFileSync(filename);

    let _content = "image/" + filename.substring(filename.indexOf(".") + 1, filename.length);


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
};

exports.deleteUser = function (user_id) {

    let user = schemas.user;
	
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

 /*********************************************************************************************************************************************************************************************************************************************
  **/
 
 /**
 **************************************************************************************************************************
 ALL GHOST-RELATED FUNCTIONS BELOW --->>
 ***********************************************************************************************************************
 */
 
exports.insertGhost = function (_json) {

    let ghost = schemas.ghost;

    let _ghost = new ghost(_json);

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

/*********************************************************************************************************************************************************************************************************************************************
 **/

/**
 ***********************************************************************************************************************
 ALL EVENT-RELATED FUNCTIONS BELOW --->>
 ***********************************************************************************************************************
 */

exports.insertEvent = function (_json) {

    let event = schemas.event;
    let user = schemas.event;

    let _event = new event(_json);

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

    let event = schemas.event;
    let query = JSON.parse('{ ' + "\"" + attrib + "\"" + ': ' + "\"" + value + "\"" + '}');

    event.find(query, function (err, docs) {
        if (err) {
            console.log("Error finding Events.");
            console.log(err);
        }
        else if (JSON.stringify(docs) === "[]") {
            console.log("No Events found.");
            return callback(docs);
        }
        else {
            console.log("Events found.");
            return callback(docs);
        }
    });
};

exports.editEvents = function (attrib, value, attrib_to_edit, new_value) {

    let event = schemas.event;
    let query = JSON.parse('{ ' + '"' + attrib + '"' + ': ' + '"' + value + '"' + '}');
    let update = JSON.parse('{ ' + '"' + attrib_to_edit + '"' + ': ' + '"' + new_value + '"' + '}');

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

    let event = schemas.event;

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

/*********************************************************************************************************************************************************************************************************************************************
 **/

/**
 ***********************************************************************************************************************
 ALL USER+PROJECT-RELATED FUNCTIONS BELOW --->>
 ***********************************************************************************************************************
 */

// assigns project to user and vice versa

// Note: You need to specify for which skill the user is being assigned to the project, BECAUSE THE SKILL ATTRIBUTE IS AN ARRAY!!

exports.assignProject = function (user_id, project_id, _skill, callback) {

    let user = schemas.user;
    let project = schemas.project;

    user.findByIdAndUpdate(user_id, { $push: {current_projects: project_id}}, function (err) {
        if (!err) {
            console.log("Project added to User.");
            project.findByIdAndUpdate(project_id, {$push: {employees_assigned: {_id: user_id, skill: _skill}}}, function (err) {
                if (!err) {
                    console.log("User added to Project.");
                    return callback(true) ;
                }
                else {
                    console.log("Error adding User to Project.");
                    console.log(err);
                }
            });
        }
        else {
            console.log("Error adding Project to User.");
            console.log(err);
        }
    });
};

/*
 _employeesAndSkills = {[
 {employee_id: "emp1", skill_name: "skill1"},
 {employee_id: "emp2", skill_name: "skill2"}
 ]};
 */
//the parameter needs to be in this format since I need to know the skill for which the employee is being assigned to the project
//if you disagreee with this, remember that we need to keep track of the skill an employee was assigned to a project for, so that upon project review, we can increase the skill rating approppriately.


exports.insertAndAssignPastProject = function (_json, _employeesAndSkills, rating, callback) {

    module.exports.insertProject(_json);

    let updated = 0 ;
    let size = _employeesAndSkills.length ;

    for (let loop = 0; loop < size ; loop++) {
        module.exports.assignProject(_employeesAndSkills[loop].employee_id, _json._id, _employeesAndSkills[loop].skill_name, function(res) {
            if (++updated == size) {
                module.exports.completeProject(_json._id, rating, function(res) {
                    return callback(true) ;
                });

            }
        });
    }
};

// remove employee from project and vice versa
exports.dismissProject = function (user_id, project_id) {

    let project = schemas.project;
    let user = schemas.user;

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

// marks a project as completed, and moves project to past_project array of all employees_assigned and manager
exports.completeProject = function (project_id, rating, callback) {

    module.exports.editProjects("_id", project_id, "status", "completed");

    //module.exports.editProjects("_id", project_id, "project_end_date", new Date());

    module.exports.editProjects("_id", project_id, "project_rating", rating);

    let user = schemas.user;
    let project = schemas.project;

    user.update({current_projects: project_id}, {$push: {past_projects: project_id}}, {multi: true}, function (err) {
        if (!err) {
            console.log("Projects set as past projects for employees assigned.");

            user.update({current_projects: project_id}, {$pull: {current_projects: project_id}}, {multi: true}, function (err) {
                if (!err) {
                    console.log("Projects removed from current projects for employees assigned.");
                    return callback(true) ;
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



/*********************************************************************************************************************************************************************************************************************************************
 **/

/**
 ***********************************************************************************************************************
 ALL PROJECT-RELATED FUNCTIONS BELOW --->>
 ***********************************************************************************************************************
 */

// inserts project defined in JSON string "_json"
exports.insertProject = function (_json) {

    let project = schemas.project;
    let user = schemas.user;

    let _project = new project(_json);

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
            current_projects:_project._id

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

    let project = schemas.project;
    let query = JSON.parse('{ ' + "\"" + attrib + "\"" + ': ' + "\"" + value + "\"" + '}');

    project.find(query, function (err, docs) {
        if (err) {
            console.log("Error finding Projects.");
            console.log(err);
        }
        else if (JSON.stringify(docs) === "[]") {
            console.log("No Projects found.");
            return callback(docs);
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

    let project = schemas.project;
    let query = JSON.parse('{ ' + '"' + attrib + '"' + ': ' + '"' + value + '"' + '}');
    let update = JSON.parse('{ ' + '"' + attrib_to_edit + '"' + ': ' + '"' + new_value + '"' + '}');

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
	
	let project = schemas.project ;
	let update = JSON.parse('{ ' + '"' + object + '"' + ': ' + JSON.stringify(_json) + '}');
	
	project.findByIdAndUpdate(project_id, {$push: update}, function (err) {
        if (!err) {
            console.log(object + " inserted into Project.");
        }
        else {
            console.log("Error inserting " + object + " into Project.");
            console.log(err);
        }
    });
};

//removes object with attrib of value from array of objects of project with specific id
exports.removeProjectObject = function (project_id, object, attrib, value) {
	
	let project = schemas.project ;
	let update = JSON.parse('{ ' + '"' + object + '"' + ': ' + '{' + '"' + attrib + '"' + ': ' + '"' + value + '"' + '}' + '}');
	
	project.update({_id: project_id}, {$pull: update}, function (err) {
        if (!err) {
            console.log(object + " removed from Project.");
        }
        else {
            console.log("Error removing " + object + " from Project.");
            console.log(err);
        }
    });
};

exports.editProjectObject = function (attrib, value, object, object_attrib, object_value, attrib_to_edit, new_value) {

    let project = schemas.project;
    let query = JSON.parse('{ ' + '"' + attrib + '":' + '"' + value + '"' + ', ' + '"' + object + '.' + object_attrib + '"' + ': ' + '"' + object_value + '"' + '}');
    let update = JSON.parse('{ ' + '"' + object + '.$.' + attrib_to_edit + '"' + ': ' + '"' + new_value + '"' + '}');

    project.update(query, {$set: update}, {multi: true}, function (err) {
        if (!err) {
            console.log("Project " + object + " updated.");
        }
        else {
            console.log("Error updating " + object + " of Project.");
            console.log(err);
        }
    });
};

// checks if projects are complete and updates status
exports.refreshProjectStatus = function () {

    let project = schemas.project;
    let today = String(new Date());

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

/*********************************************************************************************************************************************************************************************************************************************
 **/
 
 /**
 ***********************************************************************************************************************
 ALL TRAINING-RELATED FUNCTIONS BELOW --->>
 ***********************************************************************************************************************
 */
 
 exports.insertTraining = function (_json) {

    let training = schemas.training;

    let _training = new training(_json);

    _training.save(function (err) {
        if (err) {
            console.log("Training could not be inserted.");
            console.log(err);
        }
        else {
            console.log("Successfully inserted Training.");
        }
    });
};

exports.findTrainings = function (attrib, value, callback) {

    let training = schemas.training;
    let query = JSON.parse('{ ' + "\"" + attrib + "\"" + ': ' + "\"" + value + "\"" + '}');

    training.find(query, function (err, docs) {
        if (err) {
            console.log("Error finding Training.");
            console.log(err);
        }
        else if (JSON.stringify(docs) === "[]") {
            console.log("No Training found.");
        }
        else {
            console.log("Training found.");
            return callback(docs);
        }
    });
};

exports.editTrainings = function (attrib, value, attrib_to_edit, new_value) {

    let training = schemas.training;
    let query = JSON.parse('{ ' + '"' + attrib + '"' + ': ' + '"' + value + '"' + '}');
    let update = JSON.parse('{ ' + '"' + attrib_to_edit + '"' + ': ' + '"' + new_value + '"' + '}');

    training.update(query, {$set: update}, {multi: true}, function (err) {
        if (!err) {
            console.log("Training " + attrib_to_edit + "\'s updated.");
        }
        else {
            console.log("Error updating " + attrib_to_edit + "\'s of Training.");
            console.log(err);
        }
    });
};

exports.deleteTraining = function (training_id) {

    let training = schemas.training;

    training.remove({_id: training_id}, function (err) {
        if (!err) {
            console.log("Training successfully deleted.");
        }
        else {
            console.log("Error deleting Training.");
        }
    });
};
 
 /*********************************************************************************************************************************************************************************************************************************************
 **/

/**
 ***********************************************************************************************************************
 ALL MILESTONE-RELATED FUNCTIONS BELOW --->>
 ***********************************************************************************************************************
 */

// inserts milestone, and inserts it into correspondig project
exports.insertMilestone = function (_json) {

    let milestone = schemas.milestone;
    let project = schemas.project;

    let _milestone = new milestone(_json);

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

    let milestone = schemas.milestone;
    let query = JSON.parse('{ ' + "\"" + attrib + "\"" + ': ' + "\"" + value + "\"" + '}');

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

    let milestone = schemas.milestone;
    let query = JSON.parse('{ ' + '"' + attrib + '"' + ': ' + '"' + value + '"' + '}');
    let update = JSON.parse('{ ' + '"' + attrib_to_edit + '"' + ': ' + '"' + new_value + '"' + '}');

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

    let milestone = schemas.milestone;

    milestone.remove({_id: milestone_id}, function (err) {
        if (!err) {
            console.log("Milestone successfully deleted.");
        }
        else {
            console.log("Error deleting Milestone.");
        }
    });
};

exports.remove_task_from_milestone = function (milestone_id,task_id) {

    let milestone = schemas.milestone;

    milestone.update( { _id: milestone_id }, { $pull: { tasks:task_id} }, function (err) {
        if (!err) {
            console.log("Task successfully deleted from milestone.");
        }
        else {
            console.log("Error deleting task from milestone.");
        }
    });
};

exports.remove_task_from_prject = function (project_id,task_id) {

    let project= schemas.project;

    project.update( { _id: project_id }, { $pull: { tasks:task_id} }, function (err) {
        if (!err) {
            console.log("Task successfully deleted from milestone.");
        }
        else {
            console.log("Error deleting task from milestone.");
        }
    });
};
//removes all expired milestones from project
exports.removeExpiredMilestones = function (project_id) {

    let project = schemas.project;
    let milestone = schemas.milestone;
    let today = new Date();

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
            for (let x = 0; x < results.length; x++) {
                for (let y = 0; y < results[x].tasks.length; y++) {
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

/*********************************************************************************************************************************************************************************************************************************************
 **/

/**
 ***********************************************************************************************************************
 ALL TASK-RELATED FUNCTIONS BELOW --->>
 ***********************************************************************************************************************
 */

// inserts task, and inserts it into corresponding milestone and project
exports.insertTask = function (_json) {

    let task = schemas.task;
    let milestone = schemas.milestone;
    let project = schemas.project;

    let _task = new task(_json);

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

    let task = schemas.task;
    let query = JSON.parse('{ ' + "\"" + attrib + "\"" + ': ' + "\"" + value + "\"" + '}');

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

    let task = schemas.task;
    let query = JSON.parse('{ ' + '"' + attrib + '"' + ': ' + '"' + value + '"' + '}');
    let update = JSON.parse('{ ' + '"' + attrib_to_edit + '"' + ': ' + '"' + new_value + '"' + '}');

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

    let task = schemas.task;

    task.remove({_id: task_id}, function (err) {
        if (!err) {
            console.log("Task successfully deleted.");
        }
        else {
            console.log("Error deleting Task.");
        }
    });
};

/*********************************************************************************************************************************************************************************************************************************************
 **/

/**
 ***********************************************************************************************************************
 ALL NOTIFICATION-RELATED FUNCTIONS BELOW --->>
 ***********************************************************************************************************************
 */

exports.insertNotification = function (_json) {

    let notification = schemas.notification;

    let _notification = new notification(_json);

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

    let notification = schemas.notification;

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
    let notification = schemas.notification;

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

/*********************************************************************************************************************************************************************************************************************************************
 **/
 
 /**
 ***********************************************************************************************************************
 ALL APPROVAL FUNCTIONS BELOW --->>
 ***********************************************************************************************************************
 */

exports.insert_approval = function (_json) {

    let approval = schemas.approval;

    let _approval = new approval(_json);

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

    let ap = schemas.approval;
    let query = JSON.parse('{ ' + '"' + attrib + '"' + ': ' + '"' + value + '"' + '}');
    let update = JSON.parse('{ ' + '"' + attrib_to_edit + '"' + ': ' + '"' + new_value + '"' + '}');

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

    let approval = schemas.approval;
    let query = JSON.parse('{ ' + "\"" + attrib + "\"" + ': ' + "\"" + value + "\"" + '}');

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

    let approval = schemas.approval;

    approval.remove({_id: approval_id}, function (err) {
        if (!err) {
            console.log("Approval successfully deleted.");
        }
        else {
            console.log("Error deleting Approval.");
        }
    });
};

/*********************************************************************************************************************************************************************************************************************************************
 **/

/**
 ***********************************************************************************************************************
 ALL AGGREGATE FUNCTIONS BELOW --->>
 ***********************************************************************************************************************
 */

exports.get_completed_projects = function (project_ids,callback) {
    let project = schemas.project;
    project.aggregate([
        {$match:{$and:[{_id:{$in:project_ids}},{status:"completed"},{reviewed:"No"}]}},
        {$group:{_id:{id:"$_id",name:"$name",employees_assigned:"$employees_assigned",project_start_date:"$project_start_date"}}}
    ], function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        else {
            return callback(result);
        }

    });
};

exports.get_finished_tasks = function (task_ids,callback) {
    let task = schemas.task;
    task.aggregate([
        {$match:{$and:[{_id:{$in:task_ids}},{status:"completed"}]}},
        {$group:{_id:{_id:"$_id"}}}
    ], function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        else {
            return callback(result);
        }

    });
};

exports.get_specific_user_data = function (user_ids,callback) {
    let user = schemas.user;
    user.aggregate([
        {$match:{_id:{$in:user_ids}}},
        {$group:{_id:{id:"$_id",name:"$name",surname:"$surname",contact:"$contact",position:"$position",email:"$email"}}}//possibly add image if working
    ], function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        else {
            return callback(result);
        }

    });
};

exports.get_specific_user_skill = function (user_id,callback) {
    let user = schemas.user;
    user.aggregate([
       {$match:{_id:user_id}},
        {$group:{_id:{skill:"$skill"}}}
    ], function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        else {
            return callback(result);
        }

    });
};

exports.get_past_projects = function (project_ids,callback) {
    let project = schemas.project;
    project.aggregate([
        {$match:{_id:{$in:project_ids}}},
        {$group:{_id:{id:"$_id",name:"$name",owner_name:"$owner_name",project_start_date:"$project_start_date",project_end_date:"$project_end_date"}}}
    ], function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        else {
            return callback(result);
        }
 
    });
 };

exports.get_all_users_skill = function (user_ids,callback) {
    let user = schemas.user;
    user.aggregate([
        {$match:{_id:{$in:user_ids}}},
        {$group:{_id:{_id:"$_id",skill:"$skill"}}}
    ], function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        else {
            return callback(result);
        }

    });
};
/*
 ***********************************************************************************************************************
 ***********************************************************************************************************************
 */
 
 /*
 ***********************************************************************************************************************
 ALL ANALYTIC-RELATED FUNCTIONS BELOW --->> ((work in progress))
 ***********************************************************************************************************************
 */

 //returns an array indicating how long each manager worked with employees in past projects
 //more info @: https://github.com/Code9Developers/Integration/wiki/Analytics
 
 
exports.managerEmployeeCorrelation = function(callback) {
	
	let hours_per_day = 1 ; //define the number of hours that employees work per day ;
	
	let managerArray = [] ; //stores each manager id
	let employeeArray = [[]] ; //stores all employees and their hours for each manager in the corresponding index
	let hourArray = [[]] ; //stores the hours worked for each employee in the corresponding index
	
	
	/*Eg:
				  manager1,					   [emp1, emp2, emp3],						    [32, 12, 10],
	managerArray: manager3,		employeeArray: [],								 hourArray: [],
				  manager2					   [emp1, emp3, emp4, emp5]					    [20, 10, 10, 10]
	*/
	
	module.exports.findProjects("status", "completed", function(res) {
			
		function getManagerNames(array, callback) {
			let user = schemas.user ;
			let updated = 0 ;
			for (let x = 0 ; x < array.length ; x++) {
				user.findOne({_id: array[x]}).exec().then(function(res) {
					array[x] = res.name + " " + res.surname ;
					if (++updated == array.length) {
						console.log(array) ;
						return callback(array) ;
					}
				});
			}
		}
		
		function getEmployeeNames(array, callback) {
			let user = schemas.user ;
			let updated = 0 ;
			let size = 0  ;
			for (let x = 0 ; x < array.length ; x++) {
				for (let y = 0 ; y < array[x].length ; y++) {
					size++ ;
				}
			}
			
			for (let x = 0 ; x < array.length ; x++) {
				for (let y = 0 ; y < array[x].length ; y++) {
					user.findOne({_id: array[x][y]}).exec().then(function(res) {
						array[x][y] = res.name + " " + res.surname ;
						if (++updated == size) {
							console.log(array) ;
							return callback(array) ;
						}
					});
				}
			}
		}
		
		for (let x = 0 ; x < res.length ; x++) {
			let i = managerArray.indexOf(res[x].manager_id) ;
			if (i == -1) {
				i = managerArray.length ;
				managerArray[i] = res[x].manager_id ;
			}
			let days = (res[x].project_end_date - res[x].project_start_date) / (1000*60*60*24) ;
			let hours = days * hours_per_day ;
			
			if (employeeArray[i] == null) {
					employeeArray[i] = [] ;
			}
			if (hourArray[i] == null) {
				hourArray[i] = [] ;
			}
			
			for (let y = 0 ; y < res[x].employees_assigned.length ; y++) {
				let j = employeeArray[i].indexOf(res[x].employees_assigned[y]._id) ;
				
				if (j == -1) {
					j = employeeArray[i].length ;
					employeeArray[i][j] = res[x].employees_assigned[y]._id ;
					hourArray[i][j] = hours ;
				}
				else hourArray[i][j] += hours ;
			}
		}
		
		
		getManagerNames(managerArray, function(res) {
			managerArray = res ;
			getEmployeeNames(employeeArray, function(res) {
				employeeArray = res ;
				
				let obj = { data: [] } ;
				for (let x = 0 ; x < managerArray.length ; x++) {
					let subobj = { "manager_name": managerArray[x], employees_worked_with: [] } ;
					for (let y = 0 ; y < employeeArray[x].length ; y++) {
						subobj.employees_worked_with.push({ "employee_name": employeeArray[x][y], "hours_worked": hourArray[x][y] }) ;
					}
					obj.data.push(subobj) ;
				}
				
				return callback(obj.data) ;
			});
		});
			
	});
};

/*********************************************************************************************************************************************************************************************************************************************
 **/

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
        let hash = user[0].password;
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

/*********************************************************************************************************************************************************************************************************************************************
 **/


