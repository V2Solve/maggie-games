import { AzureFunction, Context, HttpRequest, HttpRequestHeaders } from "@azure/functions"
import { getPersonInfoFromJwt } from "../framework/modules/auth-logic/jwtauthlogic";
import { createAccount } from "../framework/modules/business-logic/account-logic";
import { getConfiguredDBConnection } from "../framework/modules/business-logic/db-logic";
import { CosmoDBConnection } from "../framework/modules/commons/cosmodbconnection";
import { DBConnection } from "../framework/modules/commons/dbabstraction";
import { createErrorMessageSingle, createSuccessMessageSingle, RestResponse } from "../framework/modules/communication/comm-structs";
import { Person } from "../framework/modules/data/usermanagement";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

    context.log('HTTP trigger function processed a request.');
    let returnResponse: RestResponse<Person>;

    try 
    {
    // get the DB Connection
    let connection: DBConnection = getConfiguredDBConnection ();
    
    // Lets find the person who is calling...
    let p: Person = getPersonInfoFromJwt(null);
    
    // okay, so create the account of the person.
    let ret: Person = await createAccount(connection,p);

    returnResponse = createSuccessMessageSingle(ret);
    
    } 
    catch (error) 
    {
        returnResponse = createErrorMessageSingle(JSON.stringify(error));
    }

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: returnResponse
    };
};



export default httpTrigger;