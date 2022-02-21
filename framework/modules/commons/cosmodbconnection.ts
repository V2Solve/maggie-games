import { CosmosClient, ItemResponse } from "@azure/cosmos";
import { resolve } from "dns";
import { DBConnection, PagingInfo, SearchResults, StoredDoc } from "./dbabstraction";

export class CosmoDBConnection implements DBConnection
{
    endpoint: string;    // The URL for cosmodb connection
    key: string;    // The key for the cosmodb Connection;

    cosmoDbClient: CosmosClient = null;

    constructor(endpoint: string,key: string)
    {
        this.endpoint = endpoint;
        this.key = key;
        this.cosmoDbClient = new CosmosClient({endpoint,key});
    }

    async storeObject<T> (object: T, dbName: string, containerName: string): Promise<StoredDoc<T>>
    {
        let {database}  = await this.cosmoDbClient.databases.createIfNotExists ({ id: dbName });
        let {container} = await database.containers.createIfNotExists({ id: containerName });
        
        let obj: ItemResponse<T> = await container.items.create<T>(object);
        
        if (obj != null)
        {
            return new Promise<StoredDoc<T>> ((resolve)=>{
                resolve(new StoredDoc(object,obj.item.id));
            })
        }
        else
        {
            return new Promise<StoredDoc<T>> ((reject)=>{
                reject(new StoredDoc(object,"-"));
            })
        }
    }
    
    async searchObjects<T>(query: any, pagingInfo: PagingInfo): Promise<SearchResults<T>> 
    {
        throw new Error("Method not implemented.");
    }
    
}