import { Person } from "../data/usermanagement";
import { createAPerson } from "../testing/account-logic-testing";


export function getPersonInfoFromJwt (jwt: string,body: any): Person
{
    if (jwt != null || jwt != undefined)
    {
        // Do some logic for getting the person information out from the JWT
    }
    else if (body != null || body != undefined)
    {
        let p: Person = body;
        return p;
    }
    else
    {
        return createAPerson ();
    }
}