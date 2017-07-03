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
        return $http({
            url:'/api/add-event',
            method: 'POST',
            data: event
        })

    }  
    // this.getEvents = () => {
    //     console.log()
    //     return $http({
    //         url: '/api/get-events',
    //         method: 'GET'
    //     }).then((res) => {
    //         console.log()
    //        return res.data.events
    //    })
    // }
    this.recieveEvent = () => {
        console.log(event)
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
       return $http({
           url: '/api/update-grades',
           method: "POST",
           data: grades
       })
       
   }

   this.getUser = () => {
       console.log("Service")
       return $http({
           url: '/auth/me',
           method: 'GET'
       }).then((res) => {
       return res
       }).catch((err) => {
          console.log('string')
       })

       
   }

})