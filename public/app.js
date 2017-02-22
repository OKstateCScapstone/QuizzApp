/**
 * Created by mgabilhe on 1/23/17.
 */


'use strict';
/* global app: true */

(function () {

    var app = angular.module('CS4570', [
        'ngRoute',
        'ngCookies',
        'ui.materialize',
        'ui.codemirror'
    ]);

    window._base_url = "http://localhost:3000/api/";

    app.config(function ($httpProvider, $routeProvider, $locationProvider) {
        $routeProvider
            .when('/home', {
                templateUrl: 'views/home/home.html',
                controller: 'HomeController',
                controllerAs: 'ctrl'
            })
            .when('/login', {
                templateUrl: 'views/login/login.html',
                controller: 'LoginController',
                controllerAs: 'ctrl'
            })
            .when('/sign_up', {
                templateUrl: 'views/login-signup/signup.html',
                controller: 'SignUpController',
                controllerAs: 'ctrl'
            })
            .otherwise({
                redirectTo: '/home'
            });
    });

    app.filter("sanitize", ['$sce', function($sce) {
        return function(htmlCode){
            return $sce.trustAsHtml(htmlCode);
        }
    }]);
})();