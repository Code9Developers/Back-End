/**
 * Created by Seonin David on 2017/09/02.
 */
const express = require('express');
const router = express.Router();
const dbs = require('../../database/dbs') ;

router.get("/get_emp", function (req,res, next) {
    dbs.findUsers("_id",req.session.username,function (user) {
        res.send(user);
    });
});

router.get("/store_image", function (req,res, next) {
  res.send(req.param("pic"));
});