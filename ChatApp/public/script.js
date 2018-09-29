
var chatApp = angular.module('chatApp',['ngRoute', 'btford.socket-io']);

/*config the route */

chatApp.config(function($routeProvider){

    $routeProvider
    .when('/', {
        templateUrl: 'templates/login.html',
        controller: 'loginControl'
    })
    .when('/registration', {

        templateUrl: 'templates/registration.html',
        controller: 'registrationControl'
    })

    .when('/dashboard', {

        templateUrl: 'templates/dashboard.html',
        controller: 'dashboardControl'
    });
});

chatApp.service('SocketService', ['socketFactory', function SocketService(socketFactory) {
    return socketFactory({
        ioSocket: io.connect('http://localhost:4100')
    });
}]);

  //var socket = io.connect('http://localhost:4100');






