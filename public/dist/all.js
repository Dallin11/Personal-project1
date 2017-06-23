"use strict";

angular.module("app", ["ui.router", "ui.calendar"]).config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider.state("home", {
        url: "/home",
        templateUrl: "./app/views/home.html",
        controller: "homeCtrl"
    }).state("calendar", {
        url: "/calendar",
        templateUrl: "./app/views/calendar.html",
        controller: "calendarCtrl"
    }).state("grades", {
        url: "/grades",
        templateUrl: "./app/views/grades.html",
        controller: "gradesCtrl"
    }).state("login", {
        url: "/login",
        templateUrl: "./app/views/login.html",
        controller: "loginCtrl"
    });
});
"use strict";

angular.module("app").controller("calendarCtrl", function ($scope, mainSvc) {

  // $scope.initCalendar = function () {
  //   if (!calendar) {
  //     calendar = $(elm);
  //   }
  //   calendar.fullCalendar(options);
  //   if (attrs.calendar) {
  //     uiCalendarConfig.calendars[attrs.calendar] = calendar;
  //   }
  // };


  // $scope.eventSources = [];

  // $scope.uiConfig = {
  //   calendar: {
  // height: 450,
  // editable: true,
  // header: {
  //   left: 'month basicWeek basicDay agendaWeek agendaDay',
  //   center: 'title',
  //   right: 'today prev,next'
  // },
  //     eventClick: $scope.alertEventOnClick,
  //     eventDrop: $scope.alertOnDrop,
  //     eventResize: $scope.alertOnResize
  //   }
  // };


  $(document).ready(function () {

    $('#calendar').fullCalendar('next');

    $('#calendar').fullCalendar({
      //   defaultView: 'timelineMonth',
      //   events: [
      //     // events go here
      //   ],
      //   resources: [
      //     // resources go here
      //   ]
      //   // other options go here...

      dayClick: function dayClick() {},
      height: 450,
      editable: true,
      header: {
        left: 'today prev,next',
        center: 'title',
        right: 'month agendaWeek agendaDay'
      }
    });
  });
});
"use strict";

angular.module("app").controller("gradesCtrl", function ($scope, mainSvc) {

  mainSvc.getGrades().then(function (res) {
    $scope.grades = res;
    console.log($scope.grades);
  });

  $scope.post = function (grades) {
    console.log(grades);
    mainSvc.postGrades(grades).then(function (res) {
      console.log(res);
    });
    console.log("controller", grades);
  };
});

// var students = [
//     { "FirstName": "Dallin", "LastName": "Anderson", "Grade": 2 }
// ];

// var grade = [
//   { Name: "", id: 0 },
//   { Name: 1, id: 1},
//   { Name: 2, id: 2},
//   { Name: 3, id: 3},
//   { Name: 4, id: 4}
// ]
// console.log($("#jsGrid"));
// _$("#jsGrid").jsGrid({
//       width: "100%",
//         height: "400px",

//         inserting: true,
//         editing: true,
//         sorting: true,
//         paging: true,

//         data: students,

//      fields:[
//          {name: "FirstName", type: "text", width: 150, validate: "required" },
//          {name: "LastName", type: "text", width: 150 },
//          {name: "Grade", type: "select", items: grade, valueField: "Id", textField: "Name"},
//          {type: "control"}
//      ]

// })
// });
"use strict";

angular.module("app").controller("homeCtrl", function () {});
"use strict";

angular.module("app").controller("loginCtrl", function () {});
"use strict";

angular.module("app").controller("mainCtrl", function ($scope, mainSvc) {
    // $scope.test = mainSvc.test

    // Get the modal
    var modal = document.getElementById('myModal');

    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on the button, open the modal 
    // btn.onclick = function() {
    //     modal.style.display = "block";
    // }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    };

    // When the user clicks anywhere outside of the modal, close it
    // window.onclick = function(event) {
    //     if (event.target == modal) {
    //         modal.style.display = "none";
    //     }
    // }

});
"use strict";

angular.module("app").service("mainSvc", function ($http) {
    // this.test = "Service working"
    this.getauth0 = function () {
        return $http({
            method: "GET",
            url: "/auth"
        });
    };
    // this.createEvent= (event) =>{
    //     console.log('Service', event)
    //     return $http({
    //         url: '/api/create-event',
    //         method: 'POST',
    //         data: event
    //     }).then((res) => {
    //         return res.data
    //     })
    // }

    // this.getEvent = () => {
    //     return $http({
    //         url:'/api/get-event',
    //         method: 'GET'
    //     }).then((res) => {
    //         return res.data
    //     })
    // }

    this.getGrades = function () {
        return $http({
            url: '/api/get-grades',
            method: 'GET'
        }).then(function (res) {
            return res.data;
        });
    };

    this.postGrades = function (grades) {
        console.log("Service", grades);
        return $http({
            url: '/api/post-grades',
            method: "POST",
            data: grades
        });
    };
});