/*global angular*/

var ccinputApp = angular.module('ccinputApp',['ngRoute']);

ccinputApp.config(function ($routeProvider) {
    'use strict';
    $routeProvider
    
        .when('/', {
            templateUrl : 'pages/home.html',
            controller  : 'mainController'
        })
        .when('/ccinput', {
            templateUrl : 'pages/ccinput.html',
            controller  : 'ccinputController'
        });
});


ccinputApp.controller('mainController', ['$scope',function($scope) {
}]);

ccinputApp.controller('ccinputController', ['$scope',function($scope) {
}]);

