/**
 * Created by Seonin David on 2017/07/11.
 */
var request = require('supertest')
    , express = require('express');

var app = require('../app');

describe('Login Page', function () {
    it("renders successfully", function (done) {
        request(app).get('/').expect(200, done);
    })

});

describe('Login Test', function () {
    it('Should pass if the data is an object and not empty', function (done) {
        request(app)
            .post('/dashboard')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send({username: 'Seonin', password: 'Seonin'})
            .expect(200)
            .end(done);
    });
});


//Added Exception handler for 404 not found so if a page is not found it will route to an error page
//Therefore the code below will fail the test

// describe('Page not found ', function() {
//     it("Cannot find route", function(done) {
//         request(app).get('/unknown_page').expect(404, done);
//     })
// })


//Thus the following will pass due to the fact the I added the exception handler
describe('Page not found error', function () {
    it("Will route to error page", function (done) {
        request(app).get('/unknown_page').expect(200, done);
    })
})