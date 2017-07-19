var express = require('express');
var router = express.Router();
var mongoose = require('mongoose') ;
var schemas = require('.././database/schemas.js') ;

function isAuthenticated(req, res, next) {

    if ((req.body.username)=="seonin")
        return next();

    res.redirect('/');
}
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('login');
});

router.post('/dashboard',function (req,res,next) {
    res.render('index',{ title: 'dashboard',username:req.body.username,password: req.body.password });
});

router.get("/project_creation",function (req,res,next) {
    res.render('project_creation');
});
//example for using mongodb to insert
router.get('/example_insert_route', function(req, res) {

    var url = 'mongodb://localhost:27017/kpmg_dbs' ;

    mongoose.connect(url, { useMongoClient: true },  function(err, db) {
        if (err) {
            console.log("Connection to database failed.") ;
        }
        else {
            console.log("Connection to database established.") ;

            var employee = schemas.employee ;

            var employee1 = new employee({
                name: 'John',
                surname: 'Doe',
                password: 'HardToGuess',
                role: 'Employee', //add more if necessary
                employment_length: '7', //years? months?
                skill: ['No idea', 'how the format', 'for this will work']
            }) ;

            employee1.save(function (err) {
                if (err) {
                    console.log("Error inserting test employee.") ;
                }
                else {
                    console.log("Successfully inserted test employee.") ;
                }
            }) ;
        }
    });
});


//example for using mongodb to find
router.get('/example_find_route', function(req, res) {

    var url = 'mongodb://localhost:27017/kpmg_dbs' ;

    mongoose.connect(url, { useMongoClient: true },  function(err, db) {
        if (err) {
            console.log("Connection to database failed.") ;
        }
        else {
            console.log("Connection to database established.") ;

            var employee = schemas.employee ;

            employee.findOne({employment_length: '7'}, function(err, doc) {
                if (err) {
                    console.log("Document not found.") ;
                }
                else {
                    console.log(doc) ;
                }
            }) ;
        }
    });
});

module.exports = router;
