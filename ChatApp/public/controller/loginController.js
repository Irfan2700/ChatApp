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
           console.log(response.data);
           
           if(response.data.Success==true){
               console.log("successfull");
               $scope.message="login Successful";
               var token = ''+ response.data.token;
               if(token.length > 0){

                    $http({
                        method: 'GET',
                        url: '/list',
                        data: $scope.data
                    })
               }
           }
           else if(response.status==400){
               $scope.message="login Unsuccessful"
           }
       })
       }
       
   });