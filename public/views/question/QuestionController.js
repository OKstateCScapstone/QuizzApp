'use strict';

(function () {
    var app = angular.module('CS4570');
    app.controller('QuestionController', ['$http', '$scope', '$window', '$filter',
        '$location', '$rootScope', '$cookies', '$routeParams', 'questionService', 'userSubmissionService',
        function ($http, $scope, $window, $filter, $location, $rootScope, $cookies, $routeParams, questionService, userSubmissionService) {
            var self = this;
            self.questionId = $routeParams.id;

            if (self.questionId) {
                questionService.getQuestion(self.questionId)
                    .then(function (data) {
                        self.user = $cookies.get ('user');
                        self.question = data;

                        self.studentCodeMirror = CodeMirror.fromTextArea (document.getElementById("studentCodeMirror"), {
                            mode: 'text/x-java',
                            lineNumbers: true,
                            theme: 'monokai'
                        }).setValue (self.question.starterCode);
                        self.studentCodeMirror.refresh();
                    })
                    .catch (function (error) {

                    });
            }

            $scope.submitStudentCode = function () {
                var userSubmission = {};
                userSubmission["question"] = self.questionId;
                userSubmission["userId"] = self.user;
                userSubmission["userCode"] = self.studentCodeMirror.getValue();

                console.log(userSubmission);

                userSubmissionService.evaluate (userSubmission)
                    .then (function (data) {
                        console.log (data);
                    });
            };

        }]);
})();