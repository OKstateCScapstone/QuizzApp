'use strict';

(function () {
    var app = angular.module('CS4570');
    app.controller('QuestionController', ['$http', '$scope', '$window', '$filter',
        '$location', '$rootScope', '$cookies', '$routeParams', 'questionService', 'userSubmissionService',
        function ($http, $scope, $window, $filter, $location, $rootScope, $cookies, $routeParams, questionService, userSubmissionService) {
            var self = this;
            self.questionId = $routeParams.id;

            self.code = "";

            self.options = {
                mode: 'text/x-java',
                lineNumbers: true,
                theme: 'monokai',
                scrollbarStyle: "native"
            };

            if (self.questionId) {
                questionService.getQuestion(self.questionId)
                    .then(function (data) {
                        console.log (data);

                        self.user = $cookies.get ('user');
                        self.question = data;
                        self.code = self.question.starterCode;
                    })
                    .catch (function (error) {

                    });
            }

            $scope.submitStudentCode = function () {
                var userSubmission = {};
                userSubmission.questionId = self.questionId;
                userSubmission.userId = self.user;
                userSubmission.userCode = self.code;

                userSubmissionService.evaluate (userSubmission)
                     .then (function (result) {
                         self.resultData = result.data;

                         self.testCaseResults = [];
                         for (let i = 0; i < data.question.testCases.length; i++) {
                             self.testCaseResults.push({
                                 public: data.question.testCases[i].public,
                                 result: data.results[i],
                                 input: data.question.testCases[i].input
                            });
                         }
                     });
            };
        }]);
})();