'use strict';

(function () {

    var app = angular.module('CS4570');

    app.controller('CourseController',
        ['$http', '$scope', '$window', '$filter', '$location', '$rootScope', '$cookies', 'encodeService', 'courseService', 'quizzService', '$routeParams',
            function ($http, $scope, $window, $filter, $location, $rootScope, $cookies, encodeService, courseService, quizzService, $routeParams) {
                var self = this;
                if (!$cookies.get("token")) {
                    $location.path("/sign_in");
                    return;
                }
                $rootScope.currentPage = "account";
                self.courseId = $routeParams.id;
                self.course = {};

                self.deleteQuizz = function () {

                };

                courseService.getCourse(self.courseId)
                    .then(function (result) {
                        console.log(result);
                        self.course = result;
                    });
            }]);
})();