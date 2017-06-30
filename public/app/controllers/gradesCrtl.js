angular.module("app").controller("gradesCtrl", function($scope, mainSvc){



$scope.getGrades = () => {
 mainSvc.getGrades().then((res) => {
   $scope.grades = res
   console.log(res)
 })
}
 $scope.post = (grades) => {
   mainSvc.postGrades(grades).then(function(res){
     console.log(res)
     $scope.grades.push(res.data[0])
   })

 }

  $scope.getGrades()

});