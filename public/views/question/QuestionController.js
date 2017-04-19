'use strict';

(function () {
    var app = angular.module('CS4570');
    app.controller('QuestionController', ['$http', '$scope', '$window', '$filter',
        '$location', '$rootScope', '$cookies', '$routeParams', 'questionService',
        function ($http, $scope, $window, $filter, $location, $rootScope, $cookies, $routeParams, questionService) {
            var self = this;
            self.questionId = $routeParams.id;

            if (self.questionId) {
                questionService.getQuestion(self.questionId)
                    .then(function (data) {
                        self.user = $cookies.get ('user');
                        self.question = data;

                        self.studentCodeMirror = CodeMirror (document.getElementById("studentCodeMirror"), {
                            value: self.question.starterCode,
                            mode: 'text/x-java',
                            lineNumbers: true,
                            theme: 'monokai'
                        });
                    })
                    .catch (function (error) {

                    });
            }

            $scope.submitStudentCode = function () {
                var studentSubmission = {};
                studentSubmission["question"] = self.questionId;
                studentSubmission["username"] = self.user;
                studentSubmission["code"] = self.studentCodeMirror.getValue();
                studentSubmission["result"] = false;
                studentSubmission["score"] = 0;
                console.log(studentSubmission);

                // TODO: Send to server
            };

        }]);
})();