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
        }).then((res) => {
            return res.data
        })
    }

    this.getEvent = () => {
        return $http({
            url:'/api/get-event',
            method: 'GET'
        }).then((res) => {
            return res.data
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

   this.postGrades = (grades) => {
       console.log("Service", grades)
       return $http({
           url: '/api/post-grades',
           method: "POST",
           data: grades
       })
       
   }

})