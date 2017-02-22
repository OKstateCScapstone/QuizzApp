'use strict';

(function () {

    var app = angular.module('CS4570');

    app.controller('LoginController', ['$http', '$scope', '$window', '$filter', '$location', '$rootScope', '$cookies',
        function ($http, $scope, $window, $filter, $location, $rootScope, $cookies) {
            var self = this;

            if($cookies.get('email')) {
                $location.path("/home");
            }


            self.user = {
                email: '',
                password: ''
            };


            self.enableSubmit = function () {
                return self.user.email != '' && self.user.password != '';
            };

            self.login = function () {
                console.log(self.user);

                $http.post($window._base_url + "sign_in", self.user)
                    .then(function (result) {
                        var res = result.data;
                        console.log(res.data);
                        console.log(res.token);

                        $location.path('/home');

                        var expiresNow = new Date();

                        expiresNow.setHours(expiresNow.getHours() + 1); //set cookie expire time to one later

                        $cookies.put('email',self.user.email, {expires: expiresNow});
                    })
                    .catch(function (err) {

                        $('#password').addClass('invalid'); //Output for wrong password

                        console.log(err);
                    });
            };

        }]);
})();