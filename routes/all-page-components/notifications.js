/**
 * Created by Seonin David on 2017/08/30.
 */
const express = require('express');
const router = express.Router();
const dbs = require('../../database/dbs');

/**
 -----------------------------------------------------------------------------------------------------------------------
 *Page: Notifications functionality
 *Author: Jacques Smulders
 -----------------------------------------------------------------------------------------------------------------------
 * */
router.get('/unread_notifications', function (req, res, next) {
    var unread = dbs.unreadNotifications(req.param('_id'), function (unread) {
        res.send(unread);
    });

});

router.get('/delete_notification', function (req, res, next) {
    dbs.deleteNotification(req.query._id, function (unread) {
        res.send(unread);
    });

});
module.exports = router;