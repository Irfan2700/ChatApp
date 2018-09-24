//controller for registration
// var chatApp = angular.module('registerController', []);
chatApp.controller('registrationControl', function($scope, $http) {
    console.log('register');
    $scope.user={
        'firstName': '',
        'lastName': '',
        'email': '',
        'mobile': '',
        'password': ''
    }
    console.log($scope.user);
     $scope.register = function(){
         console.log("register calling", $scope.user);
    $http({
        method: 'POST',
        url: '/register',
        data: $scope.user
    }).then(function(response){
        console.log(response);
        console.log(response.data.Success);
        
        if(response.data.Success==true){
            console.log("successfull");
            $scope.message="Registration Successful";
        }
        else if(response.status==400){
            $scope.message="Registration Unsuccessful"
        }
    })
    }
    
});