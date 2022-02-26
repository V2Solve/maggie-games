import { PagingInfo } from "../commons/dbabstraction"

export class RestReq<T>
{
    requestBody: T; // Some object representing the Request body
    
    pagingInfo: PagingInfo; // Paging Info in case of asking for search..
}


export class RestResponse<T>
{
    responseBody: T[]; // Some objects representing the Response body (one object or more..)
    pagingInfo: PagingInfo; // Paging Info in case of asked for search or not..
    errors: string [];      // Errors in case there are errors.
    success: boolean;       // Whether the call succeeded or not. If not , then probably errors are setup. 
}


export function createSuccessMessageMultiple<T> (objects: T[],pagingInfo?: PagingInfo): RestResponse<T>
{
    let rr = new RestResponse<T>();
    rr.responseBody = objects;
    rr.success = true;
    rr.pagingInfo = pagingInfo;
    rr.errors = null;
    return rr;
}


export function createSuccessMessageSingle<T> (object: T,pagingInfo?: PagingInfo): RestResponse<T>
{
    let rr = new RestResponse<T>();
    rr.responseBody = new Array<T>();
    rr.responseBody.push(object);
    rr.success = true;
    rr.pagingInfo = pagingInfo;
    rr.errors = null;
    return rr;
}


export function createErrorMessageSingle<T> (errorMessage: string): RestResponse<T>
{
    let rr = new RestResponse<T>();
    rr.responseBody = null;
    rr.errors = new Array<string>();
    rr.errors.push(errorMessage);
    rr.success = false;
    rr.pagingInfo = null;
    return rr;
}


export function createErrorMessageMultiple<T> (errorMessages: string[]): RestResponse<T>
{
    let rr = new RestResponse<T>();
    rr.responseBody = null;
    rr.errors = new Array<string>();
    for (let errMsg of errorMessages) rr.errors.push(errMsg);
    rr.success = false;
    rr.pagingInfo = null;
    return rr;
}