/**
 * Created by Kareshma on 4/24/2017.
 */

(function () {
    var app = angular.module('CS4570');

    app.controller('SubmissionsController',
        ['$http', '$scope', '$window', '$filter', '$location', '$rootScope', '$cookies', '$routeParams', 'userSubmissionService',
            function ($http, $scope, $window, $filter, $location, $rootScope, $cookies, $routeParams, submissionsService) {
                var self = this;

                self.submissionId = $routeParams.id;

                if (self.submissionId) {
                    submissionsService.getEvaluations(self.submissionId)
                        .then(function (data) {
                            self.user = $cookies.get ('user');
                            self.question = data.question;

                            self.studentCodeMirror = CodeMirror.fromTextArea (document.getElementById("studentCodeMirror"), {
                                mode: 'text/x-java',
                                lineNumbers: true,
                                theme: 'monokai'
                            }).setValue (self.question.code);
                            self.studentCodeMirror.refresh();
                        })
                        .catch (function (error) {

                        });
                }

            }]);
})();