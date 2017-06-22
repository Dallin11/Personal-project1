angular.module("app").controller("calendarCtrl", function ($scope, mainSvc) {
$scope.events =[]

$scope.create = (event) => {
    mainSvc.createEvent(event).then(function(res){
     console.log(res)
     $scope.events = [...$scope.events, res]
    })
    console.log("controller", event);
}


})