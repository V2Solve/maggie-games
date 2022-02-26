import { AzureFunction, Context, HttpRequest, HttpRequestHeaders } from "@azure/functions"
import { getPersonInfoFromJwt } from "../framework/modules/auth-logic/jwtauthlogic";
import { createAccount } from "../framework/modules/business-logic/account-logic";
import { CosmoDBConnection } from "../framework/modules/commons/cosmodbconnection";
import { DBConnection } from "../framework/modules/commons/dbabstraction";
import { Person } from "../framework/modules/data/usermanagement";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');

    // Lets read the cosmodb credentials and create the DB account..
    let dbUri = process.env["maggie-games-db-uri"];
    let dbKey = process.env["maggie-games-db-key"];

    let connection: DBConnection = new CosmoDBConnection(dbUri,dbKey);
    
    // Lets find the person who is calling...
    let p: Person = getPersonInfoFromJwt(null);
    // okay, so create the account of the person.
    
    //
    let ret: Person = await createAccount(connection,p);

    const responseMessage = JSON.stringify(ret);

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };

};



export default httpTrigger;