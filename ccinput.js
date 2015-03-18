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

ccinputApp.controller("ccinputModalInstanceControl", ['$scope',function($scope) {
    $scope.ccNumber = "";
    $scope.ccImageURL = "genericcard.png";
    console.log("CC Number: " + $scope.ccNumber);
}]);


ccinputApp.service('ccFunctions', [function (prefix){
    
    var cctypes=[{type:'Visa',      prefixes:'4',              length:'16', image: 'Visa.png'},
                 {type:'MsterCard', prefixes:'51,52,53,54,55', length:'16', image: 'MasterCard.png'},
                 {type:'AmEx',      prefixes:'34,37',          length:'15', image: 'Amex.png'},
                 {type:'Unknown',   prefixes:'x',              lenght:'16', image: 'genericcard.png'}];
    
    // Loop through the different credit cards and then through the different prefixes
    // for each credit card and compare that to the characters passed in in the prefix
    // parameter.
    this.getCCType = function (prefix) {
        var i,j;
        for (i = 0; i < cctypes.length; i++) {
            for (j = 0; j < cctypes[i].prefixes.split(',').length; j++)
                if (prefix.substring(0, cctypes[i].prefixes.split(',')[j].length) == cctypes[i].prefixes.split(',')[j]) {
                    return (cctypes[i].type);
                }
        }
        
        return ("noType");
        
    }
    
    this.getCCImageFromType = function (type) {
        var i;
        for (i = 0; i < cctypes.length; i++) {
            if (cctypes[i].type == type) {
                return (cctypes[i].image);
            }      
        }
        return(cctypes[cctypes.length - 1].image);
    }
}]);


ccinputApp.directive('ccInputValidation', ['ccFunctions', function (ccFunctions) {
    
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, modelCtrl) {
            modelCtrl.$parsers.push(function(inputValue) {
                var transformedInput = inputValue.toLowerCase().replace(/[^0-9\s]/g, '');
                
                if ((transformedInput.length == 4) || 
                    (transformedInput.length == 9) || 
                    (transformedInput.length == 14)) {
                    transformedInput = transformedInput + " ";
                }
                modelCtrl.$setViewValue(transformedInput);
                modelCtrl.$render();
                console.log(ccFunctions.getCCType(transformedInput));
                scope.ccImageURL = ccFunctions.getCCImageFromType(ccFunctions.getCCType(transformedInput));
                // scope.ccImageURL = 'Visa.png';
                console.log(inputValue+":"+transformedInput+":"+scope.ccNumber);
              return transformedInput;
          });
        }
    }
}])
                                  
                                  