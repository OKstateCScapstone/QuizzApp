/**
 * Created by mgabilhe on 4/3/17.
 */

(function() {
    var app = angular.module('CS4570');

    app.directive('navbar', function () {
        return {
            restrict: 'E',
            templateUrl: 'views/navbar/navbar.html',
            controller: function($scope, $window, $location, $rootScope, $cookies) {
                var self = this;
                self.today = new Date();
                //TODO make it use the cookies. Requires auth to be done first
                self.signedIn = false;// $cookies.get('token');
                self.isInstructor = true; //$cookies.get('isInstructor');
                self.logout = function() {
                    for (var cookie in $cookies.getAll()) {
                        if (object.hasOwnProperty(cookie)) {
                            $cookies.remove(cookie);
                        }
                    }
                    $window.location("#!/");
                };
            },
            controllerAs: 'navBarCtrl'
        };
    });
})();

