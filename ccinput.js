/*global angular*/

var ccinputApp = angular.module('ccinputApp',['ngRoute','ui.bootstrap']);

ccinputApp.config(function ($routeProvider) {
    'use strict';
    $routeProvider
    
        .when('/', {
            templateUrl : 'pages/home.html',
            controller  : 'mainController'
        })
        .when('/ccinput', {
            templateUrl : 'pages/ccinput.html',    
            controller  : 'ccinputModalController'
        });
});


ccinputApp.controller('mainController', ['$scope',function($scope) {
}]);

ccinputApp.controller('ccinputModalController', ['$scope','$modal','$log',function($scope, $modal, $log) {
    
    $scope.open = function () {
        var modalInstance = $modal.open({
            templateUrl : 'ccinputModalContent.html',
            controller  : 'ccinputModalInstanceControl'
        });
    };
}]);

ccinputApp.controller("ccinputModalInstanceControl", ['$scope',function($scope) {
}]);

