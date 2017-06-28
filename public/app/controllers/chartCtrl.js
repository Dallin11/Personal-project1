angular.module("app").controller("chartCtrl", function ($scope, mainSvc) {

    mainSvc.getGrades().then((res) => {
        $scope.grades = res
        console.log($scope.grades)
        let gradeNum = []
        let names = []
        $scope.grades.forEach(key => {
            names.push(key.name)
            gradeNum.push(key.grade)
        })
      console.log(gradeNum, names) 

 
    $scope.labels = names
    $scope.series = ['Series A', 'Series B'];
    $scope.data = gradeNum
    ;
    $scope.onClick = function (points, evt) {
        console.log(points, evt);
    };
    $scope.datasetOverride = [{
        yAxisID: 'y-axis-1'
    }, { 
        yAxisID: 'y-axis-2'
    }];
    $scope.options = {
        scales: {
            yAxes: [{
                    id: 'y-axis-1',
                    type: 'linear',
                    display: true,
                    position: 'left'
                },
                {
                    id: 'y-axis-2',
                    type: 'linear',
                    display: true,
                    position: 'right'
                }
            ]
        }
    };
    })
});