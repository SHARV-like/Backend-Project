class ApiResponse {
    constructor(
        statusCode,
        data,
        message = "Success" // default message 
    ){
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode < 400; // < 400 code is for error less response
    }
}

export default ApiResponse;