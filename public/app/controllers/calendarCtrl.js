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

      dayClick: function () {
     

      },
      height: 450,
      editable: true,
      header: {
        left: 'today prev,next',
        center: 'title',
        right:'month agendaWeek agendaDay' 
      }
    })
  });


});