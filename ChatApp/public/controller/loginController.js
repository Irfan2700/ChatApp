// controller code for login-Controller

chatApp.controller('loginControl', function($scope, $http, $location){

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
       // console.log(response.data)
           console.log(response.data.username);
           localStorage.setItem('token',response.data.token)
           localStorage.setItem('userid', response.data.userid)
           localStorage.setItem('uname', response.data.username)
           //console.log(response.data);

        //    console.log(localStorage.getItem('token'));
        //    console.log(localStorage.getItem('userid'))
           
           if(response.data.Success==true){
               console.log("successfull");
               $scope.message="login Successful";
            $location.path("/dashboard");
            //    var token = ''+ response.data.token;
               
           }
           else if(response.data.status==401){
               console.log(response.message)
               $scope.message="login Unsuccessful"
           }
       })
       }
       
   });