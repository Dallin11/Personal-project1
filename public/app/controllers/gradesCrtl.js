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
