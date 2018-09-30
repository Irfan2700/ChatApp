//controller for registration
// var chatApp = angular.module('registerController', []);
chatApp.controller('registrationControl', function($scope, $http, $location) {

    if(localStorage.getItem('token') !== null){

        $location.path("/dashboard");
   }

    console.log('register');
    $scope.user={
        'firstName': '',
        'lastName': '',
        'email': '',
        'mobile': '',
        'password': ''
        
    }
    // var pass = $scope.user.password;
    // var conpas = $scope.user.conpass;

    // if(pass.value != conpas.value) {
    //     console.log("Passwords Don't Match");
    //     return;
    //   } else {
    //     console.log('');
    //   }


    console.log($scope.user);
     $scope.register = function(){
         console.log("register calling", $scope.user);
    $http({
        method: 'POST',
        url: '/register',
        data: $scope.user
    }).then(function(response){
        console.log(response);
        console.log(response.data);
        
        if(response.data.Success==true){
            console.log("successfull");
            $scope.message="Registration Successful";
            $location.path("/");
        }
        else if(response.status==400){
            $scope.message="Registration Unsuccessful"
        }
    })
    }
    
});