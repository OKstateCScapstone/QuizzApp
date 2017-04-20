/**
 * Created by James on 2/27/2017.
 */


'use strict';

(function () {

    var app = angular.module('CS4570');

    app.factory('posts', [function(){
        var o = {
            posts: [],
            //topics: []
        };
        return o;
    }]);

    app.controller('listProblemsController', ['$http', '$scope', '$window', '$filter', '$location', '$rootScope', '$cookies', 'posts', 'questionService',
        function ($http, $scope, $window, $filter, $location, $rootScope, $cookies, posts, questionService) {
            var self = this;



            questionService.getAllQuestions(self.questionID)
                .then(function (data) {
                    for(var i = 0; i < data.length; i++)
                    {
                        var valid = true;
                        for(var ii = 0; ii < self.posts.length; ii++)
                        {
                            if(self.posts[ii]._id == data[i]._id) {
                                valid = false;
                                break;
                            }
                        }
                        if(valid) {
                            posts.posts.push(data[i]);
                        }
                    }
                    self.updatePosts();
                });


            self.posts = posts.posts;
            self.date = new Date();
            self.activeTopics = [];



            

            self.loadPost = function () {
                questionService.getEditQuestion(self.questionID)
                    .then(function (data) {
                        for(var i = 0; i < self.posts.length; i++)
                        {
                            if(self.posts[i]._id == data._id) {
                                return;
                            }
                        }
                        self.posts.push(data);
                        self.posts = self.posts.sort();
                    });
                self.questionID = '';
            };

            self.updatePosts = function () {
                self.activePosts = [];
                for(var i = 0; i < posts.posts.length; i++)
                {
                    self.activePosts.push(posts.posts[i]);
                }
            };
        }]);
})();
