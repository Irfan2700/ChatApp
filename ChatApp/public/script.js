var chatApp = angular.module('chatApp',['ngRoute']);

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




