'use strict';

(function () {

    var app = angular.module('CS4570');

    app.controller('HomeController', ['$http', '$scope', '$window', '$filter', '$location', '$rootScope', '$cookies', 'encodeService',
        function ($http, $scope, $window, $filter, $location, $rootScope, $cookies, encodeService) {
            var self = this;

            if (!$cookies.get("token")) {
                $location.path("/sign_in");
                return;
            }

            $rootScope.currentPage = "home";
        }]);
})();