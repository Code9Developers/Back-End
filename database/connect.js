var exports = module.exports = {};

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
exports.connect = function () {
    var url = 'mongodb://kpmg_dbs:27017/kpmg_dbs';

    mongoose.connect(url, {useMongoClient: true}, function (err, db) {
        if (err) {
            console.log("Connection to database failed.");
        }
        else {
            console.log("Connection to database established.");

            exports.db = db;
        }
    });
};