const express = require('express');
const router = express.Router();
const dbs = require('../../database/dbs');
const algorithm = require('../../database/Resource-Alocation-Algorithm');
// const generator = require('generate-password');


/**
 * Page:
 * Functionality: Display approvals
 * Note:
 * Bug(s): N/A
 *
 * Author(s): author
 * Date Revised: DD/MM/2017 by author
 * Date Revised: 02/10/2017 by Joshua Moodley
 */
// router.get('/get_all_approvals', function (req, res, next) {
//     dbs.find_approval("director_id",req.session.username, function (data) {
//         res.send(data[0].reason)
//     })
// });
router.get('/approvals', function (req, res, next) {
   res.render("display_all_approvals")
});

router.get('/get_all_approvals', function (req, res, next) {
    dbs.find_approval("director_id","33", function (data) {
        res.send(data)
    })
});

module.exports = router;