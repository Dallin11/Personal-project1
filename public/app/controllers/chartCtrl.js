angular.module("app").controller("chartCtrl", function ($scope, mainSvc) {

    mainSvc.getGrades().then((res) => {
        $scope.grades = res
            $scope.gradeNum = []
            $scope.names = []
         Object.keys($scope.grades).forEach(key => {
            $scope.gradeNum.push(key)
            let myObj = $scope.grades[key]
            $scope.names.push(myObj[name])
        })
      console.log($scope.gradeNum, $scope.names) 
    })


    $scope.labels = $scope.name
    $scope.series = ['Series A', 'Series B'];
    $scope.data = $scope.gradeNum
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
});