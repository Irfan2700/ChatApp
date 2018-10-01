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
        'password': '',
        'conpass': ''
        
    }
    var pass = $scope.user.password;
    var conpas = $scope.user.conpass;

    console.log(pass)
    console.log(conpas)

    // if(pass !== conpas) {
    //     console.log("Passwords Don't Match");
    //     $scope.errmessg = 
    // }

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
// }else{
   
});