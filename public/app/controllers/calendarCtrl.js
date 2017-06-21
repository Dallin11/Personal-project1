angular.module("app").controller("calendarCtrl", function ($scope, mainSvc) {
$scope.create = (event) => {
    mainSvc.createEvent(event).then(function(res){
     console.log(res)
    })
    console.log("controller", event);
}


})