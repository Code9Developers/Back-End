const express = require('express');
const router = express.Router();

/**
 * Page: admin.ejs
 * Functionality: GET
 * Note:
 * Bug(s): N/A
 *
 * Author(s): author
 * Date Revised: DD/MM/2017 by author
 * Date Revised: 02/10/2017 by Joshua Moodley
 */
router.get('/admin', function (req, res, next) {
    res.render("admin");
});

module.exports = router;