import { DBConnection, StoredDoc } from "../commons/dbabstraction";
import { Person } from "../data/usermanagement";

export async function createAccount (conn: DBConnection,person: Person): Promise<Person>
{
    let ret: StoredDoc<Person> = await conn.storeObject(person,"management","users")
    return ret.resource;
}