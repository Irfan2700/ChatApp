/**
 * 
 */
chatApp.controller('dashboardControl', function($scope, $http, $location){

    if(localStorage)
    var userid = localStorage.getItem('userid');
    var token = localStorage.getItem('token');
    // var path = '/auth/users/'+userid+'/userlist'
    
    $http({

        method: 'GET',
        url: '/auth/users/'+userid+'/userlist',
        headers: {
            'token': token
          },
    }).then (function(response){
        console.log(response);
        var userList=[];
        console.log(response.data.data[0])
        for(var i=0; i<response.data.data.length; i++){
            userList.push(response.data.data[i].username);
        }
        console.log(userList)
        $scope.userlist = userList;
        console.log("Authenticated successfully")
    },function(error){
        console.log("Error in fetching data")        
    })

    $scope.logout = function(){

        localStorage.removeItem('token');
        localStorage.removeItem('userid');
        $location.path("/");
    }

})