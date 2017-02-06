/**
 * Created by mgabilhe on 1/23/17.
 */

'use strict';

(function () {

    var app = angular.module('CS4570');

    app.controller('HomeController', ['$http', '$scope', '$window', '$filter', '$location', '$rootScope', '$cookies',
        function ($http, $scope, $window, $filter, $location, $rootScope, $cookies) {
            var self = this;
            self.controllerVar = "Home!"
        }]);
})();