/**
 * Created by Seonin David on 2017/08/30.
 */


const express = require('express');
const router = express.Router();
const dbs = require('../../database/dbs');

router.get("/username", function (req, res, next) {
    var user = dbs.findUsers("_id", req.session.username, function (user) {
        var fullname = user[0].name + " " + user[0].surname;
        res.send({name: fullname, id: req.session.username});
    });
});

router.get("/role", function (req, res, next) {
    var user = dbs.findUsers("_id", req.session.username, function (user) {
        res.send(user[0].role);
    });
});


module.exports = router;