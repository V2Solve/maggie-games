import { AzureFunction, Context, HttpRequest, HttpRequestHeaders } from "@azure/functions"
import { getPersonInfoFromJwt } from "../framework/modules/auth-logic/jwtauthlogic";
import { createAccount, getAccountInfo, updateAccountInfo } from "../framework/modules/business-logic/account-logic";
import { ValidationMessages } from "../framework/modules/business-logic/constants";
import { getConfiguredDBConnection } from "../framework/modules/business-logic/db-logic";
import { DBConnection } from "../framework/modules/commons/dbabstraction";
import { createErrorMessageSingle, createSuccessMessageSingle, RestReq, RestResponse } from "../framework/modules/communication/comm-structs";
import { Person } from "../framework/modules/data/usermanagement";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> 
{
    let returnResponse: RestResponse<Person>;
    let httpResponseStatus = 200;

    try 
    {
    // get the DB Connection
    let connection: DBConnection = getConfiguredDBConnection ();

    // we expect the body to be of type RestReq<GamingRoom>
    let restRequest: RestReq<Person> = req.body;
    
    // Lets find the person who is calling...
    let p: Person = getPersonInfoFromJwt(null,restRequest.requestBody);
    
    // okay, so create the account of the person, passing the DB Connection
    let ret = await updateAccountInfo(connection,p);
    if (ret == null || ret == undefined)
        throw ValidationMessages.USER_DOES_NOT_EXIST;

    returnResponse = createSuccessMessageSingle(ret.resource);
    
    } 
    catch (error) 
    {
        // Something did not go right, lets send the error message back..
        httpResponseStatus = 400;
        returnResponse = createErrorMessageSingle(error);
    }

    context.res = {
        status: httpResponseStatus,
        body: returnResponse
    };
  

};

export default httpTrigger;