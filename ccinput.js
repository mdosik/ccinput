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
    $scope.ccType = "";
}]);


ccinputApp.service('ccFunctions', [function (prefix){
    
    var cctypes=[{type:'Visa',      prefixes:'4',              length:'16', image: 'Visa.png'},
                 {type:'MsterCard', prefixes:'51,52,53,54,55', length:'16', image: 'MasterCard.png'},
                 {type:'AmEx',      prefixes:'34,37',          length:'15', image: 'Amex.png'},
                 {type:'Discover',   prefixes:'6011, 65',      length:'16', image: 'Discover.png'},
                 {type:'Unknown',   prefixes:'x',              length:'16', image: 'genericcard.png'}];
    
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
    
    
    // Got regex from here: http://www.richardsramblings.com/regex/credit-card-numbers/
    // Did some jiggering to make the check after each number is typed in.  I'm sure there
    // is a more elegant way than this.  I also didn't have the brain muscle to combine both
    // Amex and everyone else's format. Also, for some reason, couldn't get the capture with \1
    // to work.
    this.doCCRegexCheck = function (ccnum) {
        var regex = /(?:^4|^5|^6)$|(?:^4\d|^5[1-5]|^65|^60)$|(?:^4\d{2,3}|^5[1-5]\d{1,2}|^65\d{1,2}|^60(?:1){1,2})$|(?:(?:^4\d{2,3}|^5[1-5]\d{1,2}|^65\d{1,2}|^60(?:1){1,2})([\ ]\d{1,4}){1,3})$/;
        var regexAmex = /(?:^3[47]{0,1})$|(?:^3[47]{0,1}\d{1,2})$|(?:^3[47]{0,1}\d{1,2}[\ ]\d{1,6})$|(?:^3[47]{0,1}\d{1,2}[\ ]\d{1,6}[\ ]\d{1,5})$/;
        
        return (regex.test(ccnum) || regexAmex.test(ccnum));
    }
}]);


ccinputApp.directive('ccInputValidation', ['ccFunctions', function (ccFunctions) {
    
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, modelCtrl) {
            modelCtrl.$parsers.push(function(inputValue) {
                
                var transformedInput = inputValue;
                
                
                // I'm trying to work through the scenario where this directive has added a space to the formatting
                // of the credit card but now the user wants to backspace and retype something in.  Without any logic
                // the app will appear that it won't let the user backspace passed the padded space.  What is happening
                // is the user backspaces and then the app adds the space back in.  I've got some lame scoping going on
                // here too.
                
                scope.keyPress = function(keyCode) {
                    if ((keyCode == 8) || (keyCode == 46)) {
                        scope.backspace = true;
                        return true;
                    } else {
                        scope.backspace = false;
                        return false;
                    }
                }
                
               if (transformedInput[transformedInput.length-1] == " ") {
                   transformedInput = transformedInput.substring(0, transformedInput.length - 1);
                }
               // if ((!regex.test(transformedInput)) && (!regexAmex.test(transformedInput))) {
                if (!ccFunctions.doCCRegexCheck(transformedInput)) {
                    transformedInput = transformedInput.substring(0, transformedInput.length - 1);
                }
                                    
                
                // This puts in the space in between the groups of numbers assuming the above
                // format for cards other than Amex.  Amex format is xxxx xxxxxx xxxxx          
                if (scope.ccType == "AmEx") {
                    console.log("Amex Type");
                    if (((transformedInput.length == 4) || 
                        (transformedInput.length == 11)) &&
                        (!scope.backspace)) {
                            transformedInput = transformedInput + " ";
                    }
                } else {
                    if (((transformedInput.length == 4) || 
                        (transformedInput.length == 9) ||                                          
                        (transformedInput.length == 14)) &&
                        (!scope.backspace)) {
                            transformedInput = transformedInput + " ";
                        }
                }
        
                    
                modelCtrl.$setViewValue(transformedInput);
                modelCtrl.$render();
                
                // Let's go put an image up that matches the type of credit card that is being 
                // entered.  The type can be determined by the first couple of digits.
                scope.ccType = ccFunctions.getCCType(transformedInput);
                scope.ccImageURL = ccFunctions.getCCImageFromType(scope.ccType);
                console.log(inputValue+":"+transformedInput+":"+scope.ccNumber);
                return transformedInput;
          });
        }
    }
}])
                                  
                                  