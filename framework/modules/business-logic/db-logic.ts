import { CosmoDBConnection } from "../commons/cosmodbconnection";
import { DBConnection } from "../commons/dbabstraction";

export function getConfiguredDBConnection (): DBConnection
{
    let dbUri = process.env["maggie-games-db-uri"];
    let dbKey = process.env["maggie-games-db-key"];

    let connection: DBConnection = new CosmoDBConnection(dbUri,dbKey);
    return connection;
}