/**
 * Created by Seonin David on 2017/08/30.
 */
const express = require('express');
const router = express.Router();

router.get("/logout",function (req,res,next) {
    req.session.reset();
    res.redirect('/');
});


module.exports = router;