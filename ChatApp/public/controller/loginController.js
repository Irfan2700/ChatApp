// controller code for login-Controller

chatApp.controller('loginControl', function($scope, $http){

        console.log('login');
        $scope.user={
            'email': '',
            'password': ''
        }
        console.log($scope.user);

        console.log($scope.user);
        $scope.login = function(){
            console.log("login credential process", $scope.user);
       $http({
           method: 'POST',
           url: '/login',
           data: $scope.user
       }).then(function(response){
           console.log(response);
           console.log(response.data.Success);
           
           if(response.data.Success==true){
               console.log("successfull");
               $scope.message="login Successful";
           }
           else if(response.status==400){
               $scope.message="login Unsuccessful"
           }
       })
       }
       
   });