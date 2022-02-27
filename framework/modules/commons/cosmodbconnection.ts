import { CosmosClient, Item, ItemDefinition, ItemResponse, PatchRequestBody } from "@azure/cosmos";
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
        let objectToStore = new StoredDoc<T>(object);
        
        let obj: ItemResponse<StoredDoc<T>> = await container.items.create<StoredDoc<T>>(objectToStore);

        if (obj != null)
        {
            objectToStore.id = obj.item.id;
            return new Promise<StoredDoc<T>> ((resolve)=>{
                resolve(objectToStore);
            })
        }
        else
        {
            return new Promise<StoredDoc<T>> ((reject)=>{
                reject(objectToStore);
            })
        }
    }

    async updateObject<T> (object: StoredDoc<T>, dbName: string, containerName: string): Promise<StoredDoc<T>>
    {
        let {database}  = await this.cosmoDbClient.databases.createIfNotExists ({ id: dbName });
        let {container} = await database.containers.createIfNotExists({ id: containerName });
        
        let obj: ItemResponse<ItemDefinition> = await container.items.upsert(object);
        
        if (obj == null)
           throw "Object not found in db: " + object.resource;

        if (obj != null)
        {
            object.id = obj.item.id;
            return new Promise<StoredDoc<T>> ((resolve)=>{
                resolve(object);
            })
        }
        else
        {
            return new Promise<StoredDoc<T>> ((reject)=>{
                reject(object);
            })
        }
    }

       
    async searchObjects<T> (q: any,dbName: string, containerName: string, pagingInfo: PagingInfo): Promise<SearchResults<StoredDoc<T>>> 
    {
        let {database}  = await this.cosmoDbClient.databases.createIfNotExists ({ id: dbName });
        let {container} = await database.containers.createIfNotExists({ id: containerName });

        let querySpec = {
            query: q
        };

        const { resources: results } = await container.items.query(querySpec).fetchAll();
        let arr = new Array<StoredDoc<T>>();

        for (let rec of results)
        {
            arr.push(rec);
        }

        let sr = new SearchResults<StoredDoc<T>>(arr,pagingInfo);
        return sr;
    }
    
}