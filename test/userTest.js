const assert = require('assert');

var User = require('../models/user');

describe('User Tests', function () {
    describe('testHashPassword', function () {
        it('should return false when hashing different passwords', function () {
            var user = new User();
            user.setPassword("hello");
            var valid = user.validPassword("hellO");
            assert.equal(valid, false);
        });

        it('should return true when hashing same passwords', function () {
            var user = new User();
            user.setPassword("hello");
            var valid = user.validPassword("hello");
            assert.equal(valid, true);
        });
    });
    describe('testEmailValidation', function () {
        it('should return true when passing a valid email', function () {
            var user = new User();
            assert.equal(user.isValidEmail("hello@email.com"), true);
            assert.equal(user.isValidEmail("hello.user@email.com"), true);
            assert.equal(user.isValidEmail("hello-user@email.edu"), true);
            assert.equal(user.isValidEmail("x@email.org"), true);
        });

        it('should return false when passing a valid email', function () {
            var user = new User();
            assert.equal(user.isValidEmail("hello.user@email..com"), false);
            assert.equal(user.isValidEmail("hello@-user@email.edu"), false);
            assert.equal(user.isValidEmail("hello..user@email.org"), false);
            assert.equal(user.isValidEmail("user"), false);
        });
    });
});