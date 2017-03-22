'use strict';

(function () {
    var app = angular.module('CS4570');
    app.factory('questionService', questionService);
    questionService.$inject = ['$window', '$http'];

    function questionService($window, $http) {
        var self = {};

        self.success = function (response) {
            return response.data;
        };

        self.failure = function (error) {
            console.log(error.data);
            return error;
        };

        self.getQuestion = function (id) {
            //TODO switch from dummy endpoint to normal endpoint
            return $http.get($window._base_url + 'questions/' + id)
                    .then(self.success)
                    .catch(self.failure);
        };

        self.updateQuestion = function(question) {
            //TODO switch from dummy endpoint to normal endpoint
            return $http.put($window._base_url + 'dummy/questions/' + question._id, question)
                .then(self.success)
                .catch(self.failure);
        };

        self.uploadQuestion = function(question) {
            //TODO switch from dummy endpoint to normal endpoint
            return $http.post($window._base_url + 'dummy/questions/' + question._id, question)
                .then(self.success)
                .catch(self.failure);
        };

        return self;
    }

})();