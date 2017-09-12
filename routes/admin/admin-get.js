/**
 * Created by Seonin David on 2017/08/30.
 */
const express = require('express');
const router = express.Router();

//Admin/Register Employee page
router.get('/admin', function (req, res, next) {
    res.render("admin");
});

module.exports = router;