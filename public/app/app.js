angular.module("app", (["ui.router", "ui.calendar", 'ui.bootstrap', 'chart.js'])).config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state("home", {
            url: "/",
            templateUrl: "./app/views/home.html",
            controller: "homeCtrl"
        })
        .state("calendar", {
                url: "/calendar",
                templateUrl: "./app/views/calendar.html",
                controller: "calendarCtrl",
                resolve: {
                    users: function (mainSvc, $state) {

                        mainSvc.getUser().then(response => { 
                            if (!response) {
                                event.preventDefault()
                                $state.go("home")
                            }
                        })
                    }
                }

            }

        )
        .state("grades", {
            url: "/grades",
            templateUrl: "./app/views/grades.html",
            controller: "gradesCtrl",
            resolve: {
                    users: function (mainSvc, $state) {

                        mainSvc.getUser().then(response => { 
                            if (!response) {
                                event.preventDefault()
                                $state.go("home")
                            }
                        })
                    }
                }
        })
        .state("login", {
            url: "/login",
            templateUrl: "./app/views/login.html",
            controller: "loginCtrl",
            resolve: {
                    users: function (mainSvc, $state) {

                        mainSvc.getUser().then(response => { 
                            if (!response) {
                                event.preventDefault()
                                $state.go("home")
                            }
                        })
                    }
                }
        })
        .state("chart", {
            url: "/chart",
            templateUrl: "./app/views/chart.html",
            resolve: {
                    users: function (mainSvc, $state) {

                        mainSvc.getUser().then(response => { 
                            if (!response) {
                                event.preventDefault()
                                $state.go("home")
                            }
                        })
                    }
                }
        })

})