class ApiError extends Error {
    constructor(status = 404, message = "Somethings Wrong....") {
      super(message);
      this.status = status;
    }
  }
  
  export { ApiError };




// class ApiError extends Error {
//     constructor(
//         statusCode,
//         message = "Somthing Went Wrong",
//         errors = [],
//     ) {
//         super(message)
//         this.statusCode = statusCode
//         this.data = null
//         this.message = message
//         this.success = false
//         this.errors = errors

        


//     }

// }


// export { ApiError }