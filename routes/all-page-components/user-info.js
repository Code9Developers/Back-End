const express = require('express');
const router = express.Router();
const dbs = require('../../database/dbs');

/**
 * Page:
 * Functionality: User info
 * Note:
 * Bug(s): N/A
 *
 * Author(s): author
 * Date Revised: DD/MM/2017 by Seonin David
 * Date Revised: 02/10/2017 by Joshua Moodley
 */
router.get("/username", function (req, res, next) {
    let  user = dbs.findUsers("_id", req.session.username, function (user) {
        let  fullname = user[0].name + " " + user[0].surname;
        res.send({name: fullname, id: req.session.username});
    });
});

router.get("/role", function (req, res, next) {
    let  user = dbs.findUsers("_id", req.session.username, function (user) {
        res.send(user[0].role);
    });
});


module.exports = router;