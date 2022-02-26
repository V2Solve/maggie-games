import { DBConnection, PagingInfo, SearchResults, StoredDoc } from "../commons/dbabstraction";
import { Person } from "../data/usermanagement";

export async function createAccount (conn: DBConnection,person: Person): Promise<Person>
{
    let ret: StoredDoc<Person> = await conn.storeObject<Person>(person,"management","users")
    return ret.resource;
}


/**
 * This function will search in the database for this user, if found, it will return the object, if not,
 * it will throw an Error..
 * @param connection 
 * @param p 
 */
export async function getAccountInfo(conn: DBConnection, p: Person): Promise<Person>
{
    let pagingInfo = new PagingInfo(1,1);
    let query = "select * from c where c.email = '" + p.email + "' and c.idp = '"+p.idp+ "'"
    let ret: SearchResults<Person> = await conn.searchObjects<Person>(query,"management","users",pagingInfo);
    if (ret.results == null || ret.results == undefined ||  ret.results.length <= 0)
    {
        throw new Error("Person with details: " + JSON.stringify(p) + " not found.");
    }

    return ret.results[0];
}
