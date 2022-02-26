import { Person } from "../data/usermanagement";
import { createAPerson } from "../testing/account-logic-testing";


export function getPersonInfoFromJwt (jwt: string): Person
{
    if (jwt != null || jwt != undefined)
    {
        // Do some logic for getting the person information out from the JWT
    }
    else
    {
        // return a dummy Person
        return createAPerson ();
    }
}