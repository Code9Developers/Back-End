//let exports = module.exports = {};

let mongoose = require('mongoose');
let connection = require('.././database/connect.js') ;

exports.create_schemas = function () {

    let db = connection.db;

    create_user(db);

	create_ghost(db) ;	
		
    create_event(db);

    create_project(db);
	
	create_training(db) ;

    create_milestone(db);

    create_task(db);

    create_notification(db);

    create_approval(db);


    console.log("Schemas successfully created.");

};


//all schema initialser functions are below -->


function create_user(db) {
    let schema = mongoose.Schema({
        _id: String,
        name: String,
        surname: String,
        password: String,
        password_date: Date, //could be countdown integer
        image: {data: Buffer, contentType: String},
        contact: String,
        email: String,
        role: String,
        position: String,
        employment_length: Number, //years? months?
        rate: Number, //Jordan explain
        skill: [{name: String, rating: Number, counter: Number}], //counter = how many times has the user been rated for this skill
        current_projects: [], //-> stores project id's
        past_projects: [],
        events: []
    });

    exports.user = mongoose.model('user', schema);

    console.log('User schema created.');

}

function create_ghost(db) {
    let schema = mongoose.Schema({
        _id: String,
        name: String,
        surname: String,
        password: String,
        password_date: Date,
        image: {data: Buffer, contentType: String},
        contact: String,
        email: String,
        role: String,
        position: String,
        employment_length: Number,
        rate: Number,
        skill: [{name: String, rating: Number, counter: Number}],
        current_projects: [],
        past_projects: [],
        events: []
    });

    exports.ghost = mongoose.model('ghost', schema);

    console.log('Ghost schema created.');

}

function create_event(db) {
    let schema = mongoose.Schema({
        _id: String,
        user_id: String,
        description: String,
        event_start_date: Date,
        event_end_date: Date
    });

    exports.event = mongoose.model('event', schema);

    console.log('Event schema created.');
}

function create_project(db) {

    let schema = mongoose.Schema({
        _id: String,
        name: String,
        description: String,
        project_start_date: Date,
        project_end_date: Date,
        owner_name: String,
        owner_contact: String,
        owner_email: String,
        manager_id: String,
        employees_assigned: [{_id: String, skill: String}],
        //employee_rates: [], //corresponding index with employees_assigned
        project_budget: Number,
        tasks: [],//stores task id's
        status: String, //active, completed, pending
        project_rating: Number, //rating of project (1-10) on post-mortem analysis
        milestones: [], //store milestone id's
        reviewed:String
    });


    exports.project = mongoose.model('project', schema);

    console.log('Project schema created.');
}

function create_training(db) {

    let schema = mongoose.Schema({
        _id: String,
        training_start_date: Date,
        training_end_date: Date,
		trainer_name: String,
		training_contact: String,
		trainer_email: String,
        employees_assigned: []
    });

    exports.training = mongoose.model('training', schema);

    console.log('Training schema created.');
}

function create_milestone(db) {

    let schema = mongoose.Schema({
        _id: String,
        project_id: String, //project to which milestone belongs
        description: String,
        milestone_end_date: Date,
        tasks: []
    });

    exports.milestone = mongoose.model('milestone', schema);

    console.log('Milestone schema created.');
}

function create_task(db) {

    let schema = mongoose.Schema({
        _id: String,
        description: String,
        project_id: String, //project that the task is part of
        milestone_id: String, //milestone in project to which task belongs
        employees_assigned: []
    });

    exports.task = mongoose.model('task', schema);

    console.log('Task schema created.');
}

function create_notification(db) {

    let schema = mongoose.Schema({
        _id: String,
        user_id: String, //id of user that notification is intended for
        message: String,
        date_created: Date,
        isRead: Boolean
    });

    exports.notification = mongoose.model('notification', schema);

    console.log('Notification schema created.');
}

function create_approval(db) {
    let schema = mongoose.Schema({
        _id: String,
		reason: String,
        project_id:String,
        director_id: String,
        employees_removed: [],
        employees_replaced: []
    });

    exports.approval = mongoose.model('approval', schema);
    console.log('Approval schema created.');
}
