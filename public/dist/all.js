"use strict";

angular.module("app", ["ui.router", "ui.calendar", 'ui.bootstrap']).config(function ($stateProvider, $urlRouterProvider) {

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

angular.module("app").controller("calendarCtrl", function ($scope, $compile, uiCalendarConfig, mainSvc) {
  var date = new Date();
  var d = date.getDate();
  var m = date.getMonth();
  var y = date.getFullYear();

  /* event source that pulls from google.com */
  $scope.eventSource = {
    color: 'yellow', // an option!
    textColor: 'black', // an option!
    // url: "http://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic",
    className: 'gcal-event', // an option!
    currentTimezone: 'America/Chicago' // an option!
  };
  /* event source that contains custom events on the scope */
  $scope.events = [{
    title: 'All Day Event',
    start: new Date(y, m, 1)
  }, {
    title: 'Long Event',
    start: new Date(y, m, d - 5),
    end: new Date(y, m, d - 2)

  }, {
    id: 999,
    title: 'Repeating Event',
    start: new Date(y, m, d - 3, 16, 0),
    allDay: false
  }, {
    id: 999,
    title: 'Repeating Event',
    start: new Date(y, m, d + 4, 16, 0),
    allDay: false
  }, {
    title: 'Birthday Party',
    start: new Date(y, m, d + 1, 19, 0),
    end: new Date(y, m, d + 1, 22, 30),
    allDay: false
  }, {
    title: 'Click for Google',
    start: new Date(y, m, 28),
    end: new Date(y, m, 29)
    // url: 'http://google.com/'
  }];
  /* event source that calls a function on every view switch */
  $scope.eventsF = function (start, end, timezone, callback) {
    var s = new Date(start).getTime() / 1000;
    var e = new Date(end).getTime() / 1000;
    var m = new Date(start).getMonth();
    var events = [{
      title: 'Feed Me ' + m,
      start: s + 50000,
      end: s + 100000,
      allDay: false,
      className: ['customFeed']
    }];
    callback(events);
  };

  $scope.calEventsExt = {
    color: '#f00',
    textColor: 'yellow',
    events: [{
      type: 'party',
      title: 'Lunch',
      start: new Date(y, m, d, 12, 0),
      end: new Date(y, m, d, 14, 0),
      allDay: false
    }, {
      type: 'party',
      title: 'Lunch 2',
      start: new Date(y, m, d, 12, 0),
      end: new Date(y, m, d, 14, 0),
      allDay: false
    }, {
      type: 'party',
      title: 'Click for Google',
      start: new Date(y, m, 28),
      end: new Date(y, m, 29),
      url: 'http://google.com/'
    }]
  };
  /* alert on eventClick */
  $scope.alertOnEventClick = function (date, jsEvent, view) {
    $scope.alertMessage = date.title + ' was clicked ';
  };
  /* alert on Drop */
  $scope.alertOnDrop = function (event, delta, revertFunc, jsEvent, ui, view) {
    $scope.alertMessage = 'Event Droped to make dayDelta ' + delta;
  };
  /* alert on Resize */
  $scope.alertOnResize = function (event, delta, revertFunc, jsEvent, ui, view) {
    $scope.alertMessage = 'Event Resized to make dayDelta ' + delta;
  };
  /* add and removes an event source of choice */
  $scope.addRemoveEventSource = function (sources, source) {
    var canAdd = 0;
    angular.forEach(sources, function (value, key) {
      if (sources[key] === source) {
        sources.splice(key, 1);
        canAdd = 1;
      }
    });
    if (canAdd === 0) {
      sources.push(source);
    }
  };
  /* add custom event*/
  $scope.addEvent = function (event) {
    console.log(event
    // $scope.events.push({
    //   title: event.title,
    //   color: event.color,
    //   description: event.description,
    //   notes: event.notes,
    //   start: event.start,
    //   end: event.end,
    //   className: [event.title],
    );mainSvc.addEvent(event);
  };
  // });
  $scope.recieveEvent = function (event) {
    $scope.events.pull({
      title: event.title,
      color: event.color,
      description: event.description,
      notes: event.notes,
      start: event.start,
      end: event.end
    });
  };

  $scope.extraEventSignature = function (event) {
    return "" + event.price;
  };
  /* remove event */
  $scope.remove = function (index) {
    $scope.events.splice(index, 1);
  };
  /* Change View */
  $scope.changeView = function (view, calendar) {
    uiCalendarConfig.calendars[calendar].fullCalendar('changeView', view);
  };
  /* Change View */
  $scope.renderCalender = function (calendar) {
    if (uiCalendarConfig.calendars[calendar]) {
      uiCalendarConfig.calendars[calendar].fullCalendar('render');
    }
  };
  /* Render Tooltip */
  $scope.eventRender = function (event, element, view) {
    element.attr({
      'tooltip': event.title,
      'tooltip-append-to-body': true
    });
    $compile(element)($scope);
  };

  /* event sources array*/
  $scope.eventSources = [$scope.events, $scope.eventSource, $scope.eventsF];
  // $scope.eventSources2 = [$scope.calEventsExt, $scope.eventsF, $scope.events];

  $scope.uiConfig = {
    calendar: {
      height: 800,
      defaultView: "agendaWeek",
      editable: true,
      selectable: true,
      header: {
        left: 'today prev,next',
        center: 'title',
        right: 'month, agendaWeek agendaDay'
      },
      eventClick: $scope.alertEventOnClick,
      eventDrop: $scope.alertOnDrop,
      eventResize: $scope.alertOnResize,
      eventRender: $scope.eventRender

    }
  };
  $scope.showModal = false;

  $(document).ready(function () {
    //   $('#calendar').fullCalendar({
    //     eventClick: function (calEvent, jsEvent, view) {

    //       alert('Event: ' + calEvent.title);
    //       alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
    //       alert('View: ' + view.name);

    //       // change the border color just for fun
    //       $(this).css('border-color', 'red');

    //     }
    $('#calendar').fullCalendar({
      eventClick: function eventClick(event, element) {
        console.log(element);
        event.title = "CLICKED!";

        $('#calendar').fullCalendar('updateEvent', event);
      }
    });
  });
});

//  document.getElementsByClassName('fc-body').addEventListener("click", function()
// var modal = document.getElementById('myModal');
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

    this.addEvent = function (event) {
        console.log(event);
        return $http({
            url: '/api/add-event',
            method: 'POST',
            data: event
        });
    };
    this.recieveEvent = function () {
        return $http({
            url: '/api/receive-event',
            method: 'GET'
        }).then(function (res) {
            return res.data;
        });
    };

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