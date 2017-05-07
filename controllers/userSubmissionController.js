/**
 * Created by Kareshma on 4/17/2017.
 */
const Q = require('q');
const Submission = require('../models/userSubmission');

const self ={};

const find = function (query) {
    const deferred = Q.defer();
    Submission.find(query, function (err, questions) {
        if (err) {
            deferred.reject(err);
            return;
        }
        deferred.resolve(questions);
    });
    return deferred.promise;
};

self.findSubmissions = function (query) {
    return find(query);
};

module.exports = self;

