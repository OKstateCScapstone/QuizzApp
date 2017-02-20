
'use strict';

(function () {
    var app = angular.module('CS4570');
    app.controller('ProblemUploadController', ['$http', '$scope', '$window', '$filter', '$location', '$rootScope', '$cookies', 'uploadService',
        function ($http, $scope, $window, $filter, $location, $rootScope, $cookies, uploadService) {
            var self = this;
            self.fileUploading = false;
            $cookies.put("email", "test@email.com");

            self.submit = function () {
                if ($scope.questionFile) {
                    console.log($scope.questionFile);
                    self.fileUploading = true;
                    var user = $cookies.get("email");
                    uploadService.uploadFile($scope.questionFile, user)
                        .then(function (response) {
                            self.fileUploading = false;
                            console.log(response);
                        });
                }
            };

        }]);
})();