angular.module("app").service("mainSvc", function ($http) {
    // this.test = "Service working"
    this.getauth0 = function () {
        return $http({
            method: "GET",
            url: "/auth"
        })
    }
    this.createEvent= (event) =>{
        console.log('Service', event)
        return $http({
            url: '/api/create-event',
            method: 'POST',
            data: event
        })
    }
   
   this.getGrades = () => {
       return $http({
           url: '/api/get-grades',
           method: 'GET'
       })
       .then((res) => {
           return res.data
       })
   }

})