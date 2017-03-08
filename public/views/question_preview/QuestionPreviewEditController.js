'use strict';

(function () {
    var app = angular.module('CS4570');
    app.controller('QuestionPreviewEditController', ['$http', '$scope', '$window', '$filter',
        '$location', '$rootScope', '$cookies', '$routeParams', 'questionService',
        function ($http, $scope, $window, $filter, $location, $rootScope, $cookies, $routeParams, questionService) {

            $scope.difficulties = ["Easy", "Medium", "Hard"];

            var self = this;
            self.newTestCase = {};
            self.questionId = $routeParams.id;
            self.question = {};
            self.question.testCases = [];
            self.cmOption = {
                lineNumbers: true,
                mode: 'text/x-java',
                theme: 'monokai'
            };

            $('.chips-placeholder').material_chip({
                placeholder: '+Category',
                secondaryPlaceholder: 'Enter a category'
            });

            if (self.questionId) {
                questionService.getQuestion(self.questionId)
                    .then(function (data) {
                        self.question = data;
                        $('#body').trigger('autoresize');
                    });
            }

            self.addTestCase = function () {
                self.question.testCases.push(self.newTestCase);
                self.newTestCase = {};
            };

            self.submit = function () {
                if (self.questionId) {
                    self.upload();
                    return
                }
                self.update();
            };

            self.update = function () {
                questionService.updateQuestion(self.question)
                    .then(function (result) {
                        Materialize.toast('Question updated.', 4000);
                        self.question = result;
                    });
            };

            self.upload = function () {
                questionService.uploadQuestion(self.question)
                    .then(function (result) {
                        // TODO send to the user preview
                    });
            };

        }]);
})();