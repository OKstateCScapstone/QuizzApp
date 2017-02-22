'use strict';

(function () {

    var app = angular.module('CS4570');

    app.controller('SignUpController', ['$http', '$scope', '$window', '$filter', '$location', '$rootScope', '$cookies',
        function ($http, $scope, $window, $filter, $location, $rootScope, $cookies) {
            var self = this;

            self.user = {
                firstName: '',
                lastName: '',
                cwid: '',
                email: '',
                password: ''
            };


            self.enableSignUp = function () {
                return self.user.firstName != '' && self.user.lastName != '' &&
                    self.user.email != '' && self.user.password != '';
            };

            self.signUp = function () {
                console.log(self.user);
                $http.post($window._base_url + "sign_up", self.user)
                    .then(function (result) {
                        var res = result.data;
                        console.log(res.data);
                        console.log(res.token);
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            };

        }]);
})();