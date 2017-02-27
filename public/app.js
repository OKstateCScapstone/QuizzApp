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
        'ui.codemirror',
        'ngFileUpload'
    ]);

    window._base_url = "http://localhost:3000/api/";

    app.config(function ($httpProvider, $routeProvider, $locationProvider) {
        $routeProvider
            .when('/home', {
                templateUrl: 'views/home/home.html',
                controller: 'HomeController',
                controllerAs: 'ctrl'
            })
            .when('/upload', {
                templateUrl: 'views/upload/upload.html',
                controller: 'ProblemUploadController',
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