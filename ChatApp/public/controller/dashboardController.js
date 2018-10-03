/**
 * 
 */

chatApp.controller('dashboardControl', function($scope, $http, $location, SocketService){

    
        //using the data present in the localStorage
    var userid = localStorage.getItem('userid');
    var token = localStorage.getItem('token');
    var uname = localStorage.getItem('uname');
    // var path = '/auth/users/'+userid+'/userlist'

            //AJAX request to show all the chathistory on the message box
    $http({
                
        method: 'GET',      
        url: '/auth/users/'+userid+'/userlist',
        headers: {      //header for the authentication process
            'token': token
          },

                //promise for the a required
    }).then (function(response){
        console.log(response.status);
        if(response.status === '401'){
            $location.path("/");
        }
        var userList=[];
        console.log(response.data.data[0])
        info = response.data.data;
        // for(var i=0; i<response.data.data.length; i++){
        //     userList.push(response.data.data[i].username);
        // }

        console.log(userList)
        $scope.userlist = response.data.data;
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

    $scope.person = function(userId, userName){

        localStorage.setItem('receiverId', userId)
        localStorage.setItem('receiverName', userName);
        $location.path("/dashboard/personalMessage");
    }


    $scope.chatlist = [];
    $scope.chatlistnew = [];


    $scope.add = function(){

        if($scope.message.length !== 0){
        SocketService.emit('chatRoomBackend', {'userid': userid, 'username': uname, 'message': $scope.message, 'dateTime': new Date()});
        //$scope.chatlist.push({'userid': userid, 'username': uname, 'message': $scope.message, 'dateTime': new Date()})
        }
        $scope.message = null;
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
    $scope.currentUserId = userid;

    SocketService.on('chatroomClient', function(msg) {

        console.log(msg);
        $scope.chatlist.push(msg)
    });

    
})


