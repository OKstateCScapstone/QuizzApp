const co = require('co');
const UserController = require('../controllers/userController');
const User = require('../models/user');
const mongoose = require('mongoose');
const dbConfig = require('../dbConfig');
const assert = require('chai').assert;

// constants to make it easy to test and avoid typos mistakes on the tests..
const FIRST_NAME = "John";
const LAST_NAME = "Doe";
const USER_EMAIL = "john@doe.com";
const USER_WRONG_EMAIL = "jane@doe.com";
const USER_CWID = "12345678";
const NEW_USER_CWID = "97214538";
const PASSWORD = "superPassword";
const WRONG_PASSWORD = "superPAssword";

const getUser = function () {
    return {
        email: USER_EMAIL,
        firstName: FIRST_NAME,
        lastName: LAST_NAME,
        cwid: USER_CWID,
        password: PASSWORD
    }
};

describe('User Tests', function () {

    describe('testHashPassword', function () {
        it('should return false when hashing different passwords', function () {
            var user = new User();
            user.setPassword(PASSWORD);
            var valid = user.validPassword(WRONG_PASSWORD);
            assert.equal(valid, false);
        });

        it('should return true when hashing same passwords', function () {
            var user = new User();
            user.setPassword(PASSWORD);
            var valid = user.validPassword(PASSWORD);
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

        it('should return false when passing a invalid email', function () {
            var user = new User();
            assert.equal(user.isValidEmail("hello.user@email..com"), false);
            assert.equal(user.isValidEmail("hello@-user@email.edu"), false);
            assert.equal(user.isValidEmail("hello..user@email.org"), false);
            assert.equal(user.isValidEmail("user"), false);
        });
    });

    describe('testCrudFunctions', function () {

        beforeEach(function (done) {
            dbConfig.initTestDB(function () {
                done();
            })
        });

        afterEach(function (done) {
            mongoose.connection.close();
            done();
        });

        it('user should be saved', function () {
            return UserController.save(getUser())
                .then(function (user) {
                    assert.isNotNull(user, "user is not null");
                    assert.equal(user.email, USER_EMAIL, 'email equals ' + USER_EMAIL);
                    assert.equal(user.firstName, FIRST_NAME, 'firstName equals ' + FIRST_NAME);
                    assert.equal(user.lastName, LAST_NAME, 'lastName equals ' + LAST_NAME);
                    assert.equal(user.cwid, USER_CWID, 'cwid equals ' + USER_CWID);
                    assert.notEqual(user.hashPassword, PASSWORD, "Hashed password is not equal to " + PASSWORD);
                });
        });

        it('user should be found by email', function () {
            return UserController.save(getUser())
                .then(function (user) {
                    assert.isNotNull(user, "user is not null");
                    return UserController.findByEmail(USER_EMAIL);
                }).then(function (user) {
                    assert.equal(user.email, USER_EMAIL, 'foundUser.email equals ' + USER_EMAIL);
                });
        });

        it('user should not be found by email', function () {
            return UserController.save(getUser())
                .then(function (user) {
                    assert.isNotNull(user, "user is not null");
                    return UserController.findByEmail(USER_WRONG_EMAIL);
                }).then(function (user) {
                    assert.isNull(user, "User can not be found");
                });
        });

        it('user should be found by CWID', function () {
            return UserController.save(getUser())
                .then(function (user) {
                    assert.isNotNull(user, "user is not null");
                    return UserController.findByCWID(user.cwid);
                }).then(function (user) {
                    assert.equal(user.cwid, USER_CWID, 'foundUser.cwid equals ' + USER_CWID);
                });
        });

        it('user should not be found by CWID', function () {
            return UserController.save(getUser())
                .then(function (user) {
                    assert.isNotNull(user, "user is not null");
                    return UserController.findByCWID(NEW_USER_CWID);
                }).then(function (user) {
                    assert.isNull(user, "User can not be found");
                });
        });

        it('user should update the user CWID', function () {
            return UserController.save(getUser())
                .then(function (user) {
                    assert.isNotNull(user, "user is not null");
                    var u = getUser();
                    u.cwid = NEW_USER_CWID;
                    return UserController.update(user.id, u);
                }).then(function (updatedUser) {
                    assert.equal(updatedUser.cwid, NEW_USER_CWID, 'updatedUser.cwid equals ' + NEW_USER_CWID);
                });
        });

        it('user should be deleted', function () {
            return UserController.save(getUser())
                .then(function (user) {
                    assert.isNotNull(user, "user is not null");
                    return UserController.delete(user.id);
                }).then(function (deletedUser) {
                    assert.isNotNull(deletedUser, "deletedUser is not null");
                    return UserController.findByEmail(USER_EMAIL);
                }).then(function (found) {
                    assert.isNull(found, "found user should be null");
                })
        });
    });
});