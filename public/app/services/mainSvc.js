angular.module("app").service("mainSvc", function ($http) {
    // this.test = "Service working"
    this.getauth0 = function () {
        return $http({
            method: "GET",
            url: "/auth"
        })
    }
    // this.createEvent= (event) =>{
    //     console.log('Service', event)
    //     return $http({
    //         url: '/api/create-event',
    //         method: 'POST',
    //         data: event
    //     }).then((res) => {
    //         return res.data
    //     })
    // }

    this.addEvent = (event) => {
      console.log(event)
        return $http({
            url:'/api/add-event',
            method: 'POST',
            data: event
        })
    }
    this.recieveEvent = () => {
        return $http({
            url:'/api/receive-event',
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
           url: '/api/update-grades',
           method: "POST",
           data: grades
       })
       
   }

})