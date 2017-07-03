angular.module("app").controller("calendarCtrl", function ($scope, users, $compile, uiCalendarConfig, mainSvc) {

  $scope.showModal = false

  $scope.events = []

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
  // The Events that Show on calendar

  
  $scope.getEvents = () => {
    mainSvc.getEvents().then((response) => {
      console.log("calendarCtrl: ", response)
      response.map(e => {
        const {color, title, end_time, start_time } = e

        let startTime = moment(start_time).format()
        let endTime = moment(end_time).format()

        $scope.events.push({
              title: title,
              start: startTime,
              end: endTime,
              color: color
            })
      })
    })
  } 
  $scope.getEvents()




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
    mainSvc.addEvent(event).then(response => {
      const {
        title,
        color,
        description,
        notes,
        start_time,
        end_time
      } = response.data[0]

      let startTime = moment(start_time).format()
      let endTime = moment(end_time).format()


      $scope.events.push({
        title: title,
        start: startTime,
        end: endTime,
        color: color
      })

    })

  }



  //     mainSvc.recieveEvent().then((response) => {
  //   $scope.event = response
  //     console.log(event)
  // });

  // $scope.eventsWatcher.onAdded = function (event) {
  //    if (calendar && calendar.fullCalendar) {
  //         calendar.fullCalendar('renderEvent', event, true);
  //    }
  // };

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







});