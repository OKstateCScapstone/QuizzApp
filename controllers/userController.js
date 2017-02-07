const Q = require('q');
const User = require('../models/user');

/**
 * find a specific user object from a query
 * @param query
 *      Query containing user parameters
 */
const findOne = function (query) {
    const deferred = Q.defer();
    User.findOne(query, function (err, user) {
        if (err) {
            deferred.reject(err);
            return;
        }
        deferred.resolve(user);
    });
    return deferred.promise;
};

/**
 * Saves a JSON User representation to the database
 * @param user
 *      JSON object with some of the user properties
 * @return
 *      a Promise that gets fulfilled with a Mongoose model User object
 */
module.exports.save = function (user) {
    const deferred = Q.defer();
    const u = new User();
    u.email = user.email;
    u.firstName = user.firstName;
    u.lastName = user.lastName;
    u.setPassword(user.password);
    u.cwid = user.cwid;
    u.save(function (err, doc) {
        if (err) {
            deferred.reject(err);
            return
        }
        deferred.resolve(doc);
    });
    return deferred.promise;
};

/**
 * Finds a specific user by email
 * @param email
 *      Email of the user
 * @return
 *     a Promise that gets fulfilled with a Mongoose model User object
 */
module.exports.findByEmail = function (email) {
    const query = {email: email};
    return findOne(query);
};

/**
 * Finds a specific user using cwid
 * @param cwid
 *      the cwid of the user
 *
 * @return
 *      a Promise that gets fulfilled with a Mongoose model User object
 */
module.exports.findByCWID = function (cwid) {
    const query = {cwid: cwid};
    return findOne(query);
};

/**
 *
 * @param id
 * @param fields
 */
module.exports.update = function (id, fields) {
    // Not all user fields should be allowed to update
    // So we manually delete those objects just in case
    const deferred = Q.defer();
    delete fields.email;
    User.findByIdAndUpdate(id, { $set: fields }, { new: true }, function (err, user) {
        if (err) {
            deferred.reject(err);
            return;
        }
        deferred.resolve(user);
    });
    return deferred.promise;
};

/**
 *
 * @param id
 */
module.exports.delete = function (id) {
    const deferred = Q.defer();
    User.findByIdAndRemove(id, function (err, user) {
        if (err) {
            deferred.reject(err);
            return;
        }
        deferred.resolve(user);
    });
    return deferred.promise;
};