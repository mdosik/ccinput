var ccinputApp = angular.module('ccinputApp', ['ngRoute']);

ccinputApp.config(['$controllerProvider', function ($controllerProvider) {
    $controllerProvider.allowGlobals();
}]);

ccinputApp.config(function ($routeProvider) {
    'use strict';
    $routeProvider
    
    .when('/', {
        templateUrl : 'pages/home.html',
        controller  : 'mainController'
    });
});

ccinputApp.controller('mainController', function ($scope) {
    $scope.message = "huh?";
});