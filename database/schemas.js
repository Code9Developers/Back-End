var exports = module.exports = {} ;
var mongoose = require('mongoose') ;

exports.create_schemas = function() {
    var url = 'mongodb://localhost:27017/kpmg_dbs' ;

     mongoose.connect(url, { useMongoClient: true }, function(err, db) {
        if (err) {
            console.log("Connection to database failed.") ;
            console.log("Schemas could not be created.") ;
        }
        else {
            console.log("Connection to database established.") ;
            create_employee(db) ;
            //each schema has their own initialiser function that is called here

            console.log("Schemas successfully created.") ;
        }
     });
 };


//all schema initialser functions are below -->

function create_employee(db) {
    var schema = mongoose.Schema({
        name: String,
        surname: String,
        password: String,
        role: String, //add more if necessary
        employment_length: Number, //years? months?
        skill: []
    }) ;

    var employee = db.model('employee', schema) ;
    exports.employee = employee ;

    console.log('employee schema created.') ;

}