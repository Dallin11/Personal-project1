angular.module("app").controller("gradesCtrl", function($scope, mainSvc){



 mainSvc.getGrades().then((res) =>{
   $scope.grades = res
console.log($scope.grades)
 })


 $scope.post = (grades) => {
   console.log(grades)
   mainSvc.postGrades(grades).then(function(res){
   console.log(res)

   })
console.log("controller", grades);
 }
});