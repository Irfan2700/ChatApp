/**
 * 
 */

chatApp.controller('dashboardControl', function($scope, $http, $location, SocketService){

    if(localStorage)
    var userid = localStorage.getItem('userid');
    var token = localStorage.getItem('token');
    var uname = localStorage.getItem('uname');
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
        info = response.data.data;
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
        localStorage.removeItem('uname');
        $location.path("/");
    }


    $scope.chatlist = [];
    $scope.chatlistnew = [];


    $scope.add = function(){

        if($scope.message.length !== 0){
        SocketService.emit('chatRoomBackend', {'userid': userid, 'username': uname, 'message': $scope.message, 'dateTime': new Date()});
        //$scope.chatlist.push({'userid': userid, 'username': uname, 'message': $scope.message, 'dateTime': new Date()})
        }
    }

    $http({

        method: 'GET',
        url: '/auth/chatlist',
        headers: {
            'token': token
          }
          })  .then(function(response){

            //var array = [];
            //array.push(response.data.message)
            console.log(response.data.message);

            //$scope.chatlistnew = arr;
            $scope.chatlist = response.data.message;
            

    })
    uName = [];
    uName.push(uname);
    $scope.userName = uName;

    SocketService.on('chatroomClient', function(msg) {

        console.log(msg);
        $scope.chatlist.push(msg)
    });

})


