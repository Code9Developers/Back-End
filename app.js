var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var helmet = require('helmet');
var session = require('client-sessions');


var index = require('./routes/index');
var users = require('./routes/users');

//admin routes
var register_employee_post = require("./routes/admin/register-employee-post");
var admin_get = require("./routes/admin/admin-get");
var display_employees_get = require("./routes/admin/display-employees-get");
var training = require("./routes/admin/training");
var profile_view = require("./routes/admin/profile-view");

//project routes
var display_all_projects = require("./routes/projects/display-all-projects-get");
var milestone = require("./routes/projects/milestone-get");
var project_edit = require("./routes/projects/project-edit");
var project_routing = require("./routes/projects/projects-routing");
var project_creation = require("./routes/projects/project-creation-post");
var project_review = require("./routes/projects/project-review");

//employee routes
var employee_calendar = require("./routes/employee/employee-calendar");
var employee_routing = require("./routes/employee/employee-routing");
var employee_profile = require("./routes/employee/employee-profile");

//all-page-components-routes
var login = require("./routes/all-page-components/login");
var logout = require("./routes/all-page-components/logout");
var notifications = require("./routes/all-page-components/notifications");
var tasks = require("./routes/all-page-components/tasks");
var user_info = require("./routes/all-page-components/user-info");
var analytics_data = require("./routes/all-page-components/analytics_data");

//director routes
var replacement_functionality=require("./routes/director_functionality/replacement_functionality");
var display_approvals=require("./routes/director_functionality/display-approvals");


var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(helmet());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    cookieName: 'session',
    secret: 'random_string_goes_here',
    duration: 30 * 60 * 100000000,
    activeDuration: 5 * 60 * 10000000
}));

//routes
/**
 * Date Created:31/08/24
 * Bug: Might need to set routes in priority to avoid conflicts
 */
app.use('/', login);
app.use(logout);
app.use(tasks);
app.use(notifications);
app.use(user_info);
app.use(analytics_data);

app.use(register_employee_post);
app.use(admin_get);
app.use(display_employees_get);
app.use(training);
app.use(profile_view);

app.use(project_creation);
app.use(display_all_projects);
app.use(milestone);
app.use(project_edit);
app.use(project_routing);
app.use(project_review);

app.use(employee_calendar);
app.use(employee_routing);
app.use(employee_profile);

app.use(replacement_functionality);
app.use(display_approvals);

app.use('/users', users);
app.use(index);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    res.render('error404');
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    console.log(err.message);
    console.log(err.status);
    res.status(err.status || 500);
    res.render('error500');
});

module.exports = app;
