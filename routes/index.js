var express = require('express');
var router = express.Router();

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



module.exports = router;
