/**
 * Local Build
 */
// let exports = module.exports = {};
//
// let mongoose = require('mongoose');
// mongoose.Promise = global.Promise;
// exports.connect = function () {
//     let url = 'mongodb://127.0.0.1:27017/kpmg_dbs';
//
//     mongoose.connect(url, {useMongoClient: true}, function (err, db) {
//         if (err) {
//             console.log("Connection to database failed.");
//         }
//         else {
//             console.log("Connection to database established.");
//
//             exports.db = db;
//         }
//     });
// };

/**
 * Docker Build
 */
let exports = module.exports = {};

let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
exports.connect = function () {
    let url = 'mongodb://kpmg_dbs:27017/kpmg_dbs';

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