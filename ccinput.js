/*global angular*/

var ccinputApp = angular.module('ccinputApp',['ngRoute']);

ccinputApp.config(function ($routeProvider) {
    'use strict';
    $routeProvider
    
        .when('/', {
            templateUrl : 'pages/home.html',
            controller  : 'mainController'
        });
});


ccinputApp.controller('mainController', ['$scope',function($scope) {
    $scope.message = 'huh?';
}]);
