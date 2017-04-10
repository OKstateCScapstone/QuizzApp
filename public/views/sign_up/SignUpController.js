'use strict';

(function () {

    var app = angular.module('CS4570');

    app.controller('SignUpController', ['$http', '$scope', '$window', '$filter', '$location', '$rootScope', '$cookies', 'userService',
        function ($http, $scope, $window, $filter, $location, $rootScope, $cookies, userService) {
            var self = this;
            if ($cookies.get("token")) {
                $location.path("/home");
                return;
            }

            $scope.user = {};

            self.createAccount = function () {
                userService.saveUser($scope.user)
                    .then(function (result) {
                        $location.path("/home");
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            };
        }]);
})();