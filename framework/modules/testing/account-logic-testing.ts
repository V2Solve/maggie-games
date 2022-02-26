import { Location, Person } from "../data/usermanagement";

export function createAPerson () : Person
{
    let userName = "testUser";
    let idp = "gmail";
    let email = "saurinya@gmail.com"
    let phone = "2489109078"
    let loc = new Location("USA","30005");
    let p = new Person (userName,idp,email,phone,loc);
    return p;
}