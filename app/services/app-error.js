'use strict';
let ExtendableError = require('es6-error');

class AppError extends ExtendableError {
    constructor(message = "Server Error. Please try again", code = 300, errors = [], data) {
        if("message" in message){
            let msg = "message" in message ? message.message : "Something went wrong in Server"
            super(msg);
            
            this.errors = "errors" in message ? message.errors : {}
            this.code = "statusCode" in message ? message.errors.status_code : 500
        }else{
            let msg = "Something went wrong in Server"
            super(msg);
            this.errors = {
                status_code: 500,
                description: "We're trying hard to fix the problem. Please try again"
            }
            this.code =  500
        }

    }
}

module.exports = exports = AppError;