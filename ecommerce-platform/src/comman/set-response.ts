import { ApiResponse } from "./global-response.interface";
import { APIErrorResponse } from "./global-error.interface";
export function setResponse<T>(success:boolean,message:string,data:T):ApiResponse<T>{
    // console.log("data",data)
    const response:ApiResponse<typeof data>={
        success,
        message,
        data,
    }
    return response

}

export function setErrorResponse<T>(isError:boolean,errorMessage:string,errors:T):APIErrorResponse<T>{
    const response:APIErrorResponse<typeof errors>={
        isError,
        errorMessage,
        errors,
    }
    return response
}