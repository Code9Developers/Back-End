const express = require('express');
const router = express.Router();

/**
 * Page: N/A
 * Functionality: Logout and reset sessions
 * Note:
 * Bug(s): N/A
 *
 * Author(s): author
 * Date Revised: DD/MM/2017 by author
 * Date Revised: 02/10/2017 by Joshua Moodley
 */
router.get("/logout", function (req, res, next) {
    req.session.reset();
    res.redirect('/');
});


module.exports = router;