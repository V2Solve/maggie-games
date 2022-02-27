import { DBConnection, PagingInfo, SearchResults, StoredDoc } from "../commons/dbabstraction";
import { Person } from "../data/usermanagement";
import { CONTAINER_NAMES, DBNAMES, ValidationMessages } from "./constants";

export async function createAccount (conn: DBConnection,person: Person): Promise<StoredDoc<Person>>
{
    let personFound = await getAccountInfo (conn,person);

    if (personFound != null && personFound != undefined)
    {
        throw ValidationMessages.USER_ALREADY_EXIST;
    }
    
    let ret: StoredDoc<Person> = await conn.storeObject<Person>(person,DBNAMES.MANAGEMENT,CONTAINER_NAMES.USERS)
    return ret;
}


/**
 * This function will search in the database for this user, if found, it will return the object, if not,
 * it will throw an Error..
 * @param connection 
 * @param p 
 */
export async function getAccountInfo(conn: DBConnection, p: Person): Promise<StoredDoc<Person>>
{
    let pagingInfo = new PagingInfo(1,1);
    let query = "select * from c where c.resource.idp.uniqueId = '" + p.idp.uniqueId + "' and c.resource.idp.idp = '"+p.idp.idp+ "'"
    let ret: SearchResults<StoredDoc<Person>> = await conn.searchObjects<Person>(query,DBNAMES.MANAGEMENT,CONTAINER_NAMES.USERS,pagingInfo);

    if (ret.results == null || ret.results == undefined ||  ret.results.length <= 0)
    {
        return null;
    }

    return ret.results[0];
}


/**
 * This function will search in the database for this user, if found, it will return the object, if not,
 * it will throw an Error..
 * @param connection 
 * @param p 
 */
 export async function updateAccountInfo(conn: DBConnection, p: Person): Promise<StoredDoc<Person>>
 {
     let sp: StoredDoc<Person> = await getAccountInfo (conn,p);
     if (sp == null || sp == undefined)
        throw ValidationMessages.USER_DOES_NOT_EXIST;

     // Okay lets put updated object into it
     sp.resource = p;

     let retp = await conn.updateObject(sp,DBNAMES.MANAGEMENT,CONTAINER_NAMES.USERS);
     return retp;
 }
 