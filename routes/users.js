const express = require('express');
const router = express.Router();

/**
 * Page: N/A
 * Functionality: GET users listing
 * Note:
 * Bug(s): N/A
 *
 * Author(s): Seonin David
 * Date Revised: 24/09/2017 by Seonin David
 * Date Revised: 02/10/2017 by Joshua Moodley
 */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});


module.exports = router;
