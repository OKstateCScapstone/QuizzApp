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
                            /*

                            for(var ii = 0; ii < data[i].topics.length; ii++)
                            {
                                valid = true;
                                for(var iii = 0; iii < posts.topics.length; iii++)
                                {
                                    if(data[i].topics[ii] == posts.topics[iii])
                                    {
                                        valid = false;
                                        break;
                                    }
                                }
                                if(valid) posts.topics.push(data[i].topics[ii]);
                            }
                        }
                    }
                    posts.topics = posts.topics.sort();
                    self.updateActivePosts();*/
                    }
                    self.updatePosts();
                });


            self.posts = posts.posts;
            self.date = new Date();
            //self.topics = posts.topics.sort();
            self.activeTopics = [];



            /*
            self.topics = [
             {title: 'questionPreview/:id link', link: '#!/questionPreview/:id', upvotes: 5},
             {title: 'home link', link: '#!/home', upvotes: 2},
             {title: 'post 3', link: '#!/home', upvotes: 15},
             {title: 'post 4', link: '#!/home', upvotes: 9},
             {title: 'post 5', link: '#!/home', upvotes: 4}
             ]*/
            //updateTopics();
            /*self.addPost = function(){
                if(!self.title || self.title === '') {return; }
                self.posts.push({
                    body: self.title,
                    _id: self.newQuestionid
                });
                self.title = '';
                self.link = '';
            };*/

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

            /*
            self.addTag = function (topic)
            {
               if(self.topics.indexOf(topic) < 0) return;
               self.activeTopics.push(self.topics.splice(self.topics.indexOf(topic), 1)[0]);
               self.activeTopics = self.activeTopics.sort();
               self.updateActivePosts();
            };

            self.removeTag = function (topic)
            {
                if(self.activeTopics.indexOf(topic) < 0) return;
                self.topics.push(self.activeTopics.splice(self.activeTopics.indexOf(topic), 1)[0]);
                self.topics = self.topics.sort();
                self.updateActivePosts();
            };

            self.updateActivePosts = function()
            {
                self.activePosts = [];

                for(var i = 0; i < self.posts.length; i++)
                {
                    var valid = true;
                    for(var ii = 0; ii < self.activeTopics.length; ii++)
                    {
                        if(!self.posts[i].topics.includes(self.activeTopics[ii]))
                        {
                            valid = false;
                            break;
                        }
                    }
                    if(valid) self.activePosts.push(self.posts[i]);
                }
                self.activePosts = self.activePosts.sort();
            };*/

            /*self.updateTopics = function() {
                for(var i = 0; i < self.posts.length; i++)
                {
                    if(self.posts[i]._id == data._id) {
                        return;
                    }

                    for(var ii = 0; ii < self.posts[i].topics.length; ii++)
                    {
                        var vaild = true;
                        for(var iii = 0; iii < self.topics.length; iii++)
                        {
                            if(self.topics[iii] == self.posts[i].topics[ii])
                            {
                                valid = false;
                                break;
                            }
                        }
                        if(valid) topics.push(self.posts[i].topics[ii])
                    }
                }
            };*/
        }]);
})();