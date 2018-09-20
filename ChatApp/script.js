var chatApp = angular.module('chatApp',['ngRoute']);

/*config the route */

chatApp.config(function($routeProvider){

    $routeProvider
    .when('/', {
        templateUrl: 'templates/login.html'
    })
    .when('/registration', {

        templateUrl: 'templates/registration.html'
    });
});
