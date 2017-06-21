angular.module("app", ["ui.router"]).config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state("home", {
            url: "/home",
            templateUrl: "./app/views/home.html",
            controller: "homeCtrl"
        })
        .state("calendar", {
            url: "/calendar",
            templateUrl: "./app/views/calendar.html",
            controller: "calendarCtrl"
        })
        .state("grades", {
            url: "/grades",
            templateUrl: "./app/views/grades.html",
            controller: "gradesCtrl"
        })
        .state("login", {
            url: "/login",
            templateUrl:"./app/views/login.html",
            controller: "loginCtrl"
        })


});