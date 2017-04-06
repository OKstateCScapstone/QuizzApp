'use strict';

(function () {

    var app = angular.module('CS4570');

    app.controller('MyAccountController',
        ['$http', '$scope', '$window', '$filter', '$location', '$rootScope', '$cookies', 'encodeService', 'courseService', 'quizzService',
        function ($http, $scope, $window, $filter, $location, $rootScope, $cookies, encodeService, courseService, quizzService) {
            var self = this;
            if (!$cookies.get("token")) {
                $location.path("/sign_in");
                return;
            }
            $rootScope.currentPage = "account";
            $scope.seasons = ["Spring", "Summer", "Fall", "Winter"];

            self.course = {};
            self.quizz = {};

            self.user = JSON.parse(encodeService.decode64($cookies.get('user')));

            self.editCourse = function (course) {
                self.course = course;
            };

            self.newQuizz = function (course) {
                self.quizz.courseId = course._id;
            };

            self.addCourse = function () {
                self.course.instructor = self.user.email;
                courseService.addCourse(self.course)
                    .then(function (result) {
                        self.course = {};
                    });
            };

            self.addQuizz = function () {
                self.quizz.instructor = self.user.email;
                quizzService.addQuizz(self.quizz)
                    .then(function (result) {
                        self.quizz = {};
                        Materialize.toast("Successfully added Quizz.", 4000);
                    });
            };

            self.viewCourse = function (course) {
                $location.path("course/" + course._id);
            };

            courseService.getCoursesForInstructor(self.user.email)
                .then(function (result) {
                    self.courses = result;
                });

        }]);
})();