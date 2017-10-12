const express = require('express');
const router = express.Router();
const dbs = require('../../database/dbs');

/**
 * Page: Notifications functionality
 * Functionality: Unread and delete notification routes and functions
 * Note:
 * Bug(s): N/A
 *
 * Author(s): author
 * Date Revised: DD/MM/2017 by Jacques Smulders
 * Date Revised: 02/10/2017 by Joshua Moodley
 */
router.get('/unread_notifications', function (req, res, next) {
   dbs.unreadNotifications(req.param('_id'), function (unread) {
        res.send(unread);
    });

});

router.get('/delete_notification', function (req, res, next) {
    dbs.deleteNotification(req.query.notification_id);
    dbs.unreadNotifications(req.query.user_id, function (unread) {
        res.send(unread);
    });
});
module.exports = router;