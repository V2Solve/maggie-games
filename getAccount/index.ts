import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { getPersonInfoFromJwt } from "../framework/modules/auth-logic/jwtauthlogic";
import { getAccountInfo } from "../framework/modules/business-logic/account-logic";
import { getConfiguredDBConnection } from "../framework/modules/business-logic/db-logic";
import { DBConnection } from "../framework/modules/commons/dbabstraction";
import { createErrorMessageSingle, createSuccessMessageSingle, RestResponse } from "../framework/modules/communication/comm-structs";
import { Person } from "../framework/modules/data/usermanagement";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> 
{
    let returnResponse: RestResponse<Person>;
    let httpResponseStatus = 200;

    try 
    {
    // get the DB Connection
    let connection: DBConnection = getConfiguredDBConnection ();
    
    // Lets find the person who is calling...
    let p: Person = getPersonInfoFromJwt(null);
    
    // okay, so create the account of the person, passing the DB Connection
    let ret: Person = await getAccountInfo(connection,p);

    returnResponse = createSuccessMessageSingle(ret);
    
    } 
    catch (error) 
    {
        // Something did not go right, lets send the error message back..
        httpResponseStatus = 400;
        returnResponse = createErrorMessageSingle(JSON.stringify(error));
    }

    context.res = {
        status: httpResponseStatus,
        body: returnResponse
    };

};

export default httpTrigger;

