import { Resource } from "@azure/cosmos";

export class PagingInfo
{
    startingPageNo: number;
    records: number;    // The number of records to Return.
    totalRecords: number;   // The total number of records that are in the collection - optional;

    constructor (sp: number,records: number)
    {
        this.startingPageNo = sp;
        this.records = records;
    }
}

export class SearchResults<T>
{
    pagingInfo: PagingInfo;
    results: Array<T>;

    constructor(results: Array<T>,pagingInfo?: PagingInfo)
    {
        this.results = results;
        this.pagingInfo = pagingInfo;
    }
}

export class StoredDoc<T>
{
    id: string;
    resource: T;

    constructor (resource: T)
    {
        this.resource = resource;
    }
}

export interface DBConnection
{
    /**
     * Should store the object in to the Database with the given dbName and the given Container Name;
     * @param object 
     * @param dbName 
     * @param containerName 
     * @returns theUpdateObject that was stored
     */
    storeObject<T> (object: T,dbName: string,containerName: string): Promise<StoredDoc<T>>

    /**
     * Should update the object in to the Database with the given dbName and the given Container Name;
     * @param object 
     * @param dbName 
     * @param containerName 
     * @returns theUpdateObject that was stored
     */
    updateObject<T> (object: StoredDoc<T>, dbName: string, containerName: string): Promise<StoredDoc<T>>


    /**
     * searches the Object and returns the search results as per the Query
     * @param query 
     * @param pagingInfo 
     */
    searchObjects<T> (query: any,dbName: string, containerName: string,pagingInfo: PagingInfo): Promise<SearchResults<StoredDoc<T>>>
}