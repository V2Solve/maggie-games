import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { getPersonInfoFromJwt } from "../framework/modules/auth-logic/jwtauthlogic";
import { getAccountInfo } from "../framework/modules/business-logic/account-logic";
import { ValidationMessages } from "../framework/modules/business-logic/constants";
import { getConfiguredDBConnection } from "../framework/modules/business-logic/db-logic";
import { createGamingRoom } from "../framework/modules/business-logic/gaming-room-logic";
import { DBConnection } from "../framework/modules/commons/dbabstraction";
import { createErrorMessageSingle, createSuccessMessageSingle, RestReq, RestResponse } from "../framework/modules/communication/comm-structs";
import { GamingRoom } from "../framework/modules/data/gamebasics";
import { ACCOUNTSTATUS, Person } from "../framework/modules/data/usermanagement";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> 
{
    let restRequest : RestReq<GamingRoom> = null;
    let returnResponse: RestResponse<GamingRoom>;
    let httpResponseStatus = 200;

    try 
    {
    // get the DB Connection
    let connection: DBConnection = getConfiguredDBConnection ();
    
    // we expect the body to be of type RestReq<GamingRoom>
    let restRequest: RestReq<GamingRoom> = req.body;

    // Lets find the person who is calling...
    let p: Person = getPersonInfoFromJwt(null,restRequest.requestBody.uniqueId.creator);

    // Let us see if the person has an Account..
    let sp = await getAccountInfo(connection,p);

    if (sp == null)
    throw ValidationMessages.USER_DOES_NOT_EXIST;

    if (sp.resource.accountStatus != ACCOUNTSTATUS.TERMS_ACCEPTED)
    throw ValidationMessages.ACCOUNT_TERMS_NOT_ACCEPTED;

    restRequest.requestBody.uniqueId.creator = sp.resource;   // Lets update the Creator Information.

    let gr: GamingRoom = await createGamingRoom(connection,restRequest.requestBody);

    returnResponse = createSuccessMessageSingle(gr);
    
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