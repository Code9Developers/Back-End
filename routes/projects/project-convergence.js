/**
 * Created by Jacques Smulders on 2017/08/30.
 */
const express = require('express');
const router = express.Router();
const dbs = require('../../database/dbs');

router.get("/project_convergence", function (req, res, next) {
    res.render('project_convergence');
});

router.get("/converge", function (req, res, next) {
    dbs.readLatestConvergence(function(data) {
		res.send(data) ;
	});
});


module.exports = router;