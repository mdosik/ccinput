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
    
    var modalInstance = $modal.open({
        templateUrl : 'ccinputModalContent.html',
        controller  : 'ccinputModalInstanceControl'
    });
}]);

ccinputApp.controller("ccinputModalInstanceControl", ['$scope', '$log',function($scope,$log) {
    $scope.ccNumber = "";
    console.log($scope.ccNumber);
}]);


ccinputApp.directive('ccInputValidation', function () {
    
    var cctypes=[{type:'Visa',      prefixes:'4',              length:'16'},
                 {type:'MsterCard', prefixes:'51,52,53,54,55', length:'16'},
                 {type:'AmEx',      prefixes:'34,37',          length:'15'}];
    
    var getCCType = function (prefix) {
        var i,j;
        for (i = 0; i < getCCType.length; i++) {
            for (j = 0; j < cctypes[i].prefixes.split(',').length; j++)
                if (prefix.substring(0, getCCType[i].prefixes.split(',')[j].length) == getCCType[i].prefixes.split(',')[j]) {
                    return (cctypes[i].type);
                }
        }
        
        return ("noType");
        
    };
    
    
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, modelCtrl) {
          modelCtrl.$parsers.push(function(inputValue) {
              var transformedInput = inputValue.toLowrCase().replace(/[a-z]/g, '');
              if (transformedInput!=inputValue) {
                  modelCtrl.$setViewValue(transformedInput);
                  modelCtrl.$render();
              }
              
              console.log(inputValue+":"+transformedInput);
              return transformedInput;
          });
        }
    }
})
                                  
                                  