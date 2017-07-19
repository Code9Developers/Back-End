var express = require('express');
var router = express.Router();
var dbs = require('.././database/dbs.js') ;

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

router.get('/test-insert', function(req, res, next) {
    var value = {_id: 'emp_id_123', name: 'John', surname: 'Doe', password: 'BushDid911', password_date: '21-07-2017', email: 'johndoe@kpmg.com', role: 'employee', employment_length: '3', skill: ['MS Office', 'Python']} ;

    dbs.insertEmployee(value) ;
});

router.get('/test-find', function(req, res, next) {
    dbs.findEmployee('emp_id_123') ;
});

module.exports = router;
