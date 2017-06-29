angular.module("app").controller("calendarCtrl", function ($scope, $compile, uiCalendarConfig, mainSvc) {
 
 $scope.showModal = false

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
    },
    {
      title: 'Long Event',
      start: new Date(y, m, d - 5),
      end: new Date(y, m, d - 2)
    },
    {
      id: 999,
      title: 'Repeating Event',
      start: new Date(y, m, d - 3, 16, 0),
      allDay: false
    },
    {
      id: 999,
      title: 'Repeating Event',
      start: new Date(y, m, d + 4, 16, 0),
      allDay: false
    },
    {
      title: 'Birthday Party',
      start: new Date(y, m, d + 1, 19, 0),
      end: new Date(y, m, d + 1, 22, 30),
      allDay: false
    },
    {
      title: 'Click for Google',
      start: new Date(y, m, 28),
      end: new Date(y, m, 29),
      // url: 'http://google.com/'
    }
  ];

  console.log($scope.events)
  /* event source that calls a function on every view switch */
  $scope.eventsF = function (start, end, timezone, callback) {
    var s = new Date(start).getTime() / 1000;
    var e = new Date(end).getTime() / 1000;
    var m = new Date(start).getMonth();
    var events = [{
      title: 'Feed Me ' + m,
      start: s + (50000),
      end: s + (100000),
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
      },
      {
        type: 'party',
        title: 'Lunch 2',
        start: new Date(y, m, d, 12, 0),
        end: new Date(y, m, d, 14, 0),
        allDay: false
      },
      {
        type: 'party',
        title: 'Click for Google',
        start: new Date(y, m, 28),
        end: new Date(y, m, 29),
        url: 'http://google.com/'
      }
    ]
  };
  /* alert on eventClick */
  $scope.alertOnEventClick = function (date, jsEvent, view) {
    $scope.alertMessage = (date.title + ' was clicked ');
  };
  /* alert on Drop */
  $scope.alertOnDrop = function (event, delta, revertFunc, jsEvent, ui, view) {
    $scope.alertMessage = ('Event Droped to make dayDelta ' + delta);
  };
  /* alert on Resize */
  $scope.alertOnResize = function (event, delta, revertFunc, jsEvent, ui, view) {
    $scope.alertMessage = ('Event Resized to make dayDelta ' + delta);
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
    console.log("Entered Start: ", event.start_time)
      mainSvc.addEvent(event).then(response => {
        const {title, color, description, notes, start_time, end_time} = response.data[0]

        let startTime = moment(start_time).format()
        let endTime = moment(end_time).format()

        
        $scope.events.push({
          title: title,
          start: startTime,
          end: endTime,
          color: color
        })

        // $scope.events.push({
        //   title: title,
        //   color: color,
        //   description: description,
        //   notes: notes,
        //   startTime: start_time,
        //   endTime: end_time,
        //   });
      })
  
  }
      
  

  //     mainSvc.recieveEvent().then((response) => {
  //   $scope.event = response
  //     console.log(event)
  // });

  $scope.extraEventSignature = function (event) {
    return "" + event.price;
  }
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
    eventClick: function(event, element) {
        console.log(element)
        event.title = "CLICKED!";

        $('#calendar').fullCalendar('updateEvent', event);

    }
    })
})

  });

  //  document.getElementsByClassName('fc-body').addEventListener("click", function()
  // var modal = document.getElementById('myModal');

