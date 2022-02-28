import { DBConnection, SearchResults, StoredDoc } from "../commons/dbabstraction";
import { GamingRoom } from "../data/gamebasics";
import { Person } from "../data/usermanagement";
import { CONTAINER_NAMES, DBNAMES, ValidationMessages } from "./constants";



export async function getRoomInformation (conn: DBConnection, room: GamingRoom): Promise<GamingRoom>
{
    let query = "select * from gr where gr.uniqueId.creator.username = '" + room.uniqueId.creator.username + "' and gr.uniqueid.roomName = '" + room.uniqueId.roomName + "'";
    let sr: SearchResults<StoredDoc<GamingRoom>> = await conn.searchObjects(query,DBNAMES.MANAGEMENT,CONTAINER_NAMES.GAMING_ROOM,null);
    if (sr.results == null || sr.results.length <= 0) return null;

    return sr.results[0].resource;
}

export async function createGamingRoom (conn: DBConnection, room: GamingRoom): Promise<GamingRoom>
{
    // Lets check to see if the gaming room exists for the person
    let query = "select * from gr where gr.resource.uniqueId.creator.username = '" + room.uniqueId.creator.username + "' and gr.resource.uniqueId.roomName = '" + room.uniqueId.roomName + "'";
    let sr: SearchResults<StoredDoc<GamingRoom>> = await conn.searchObjects(query,DBNAMES.MANAGEMENT,CONTAINER_NAMES.GAMING_ROOM,null);
    if (sr.results != null && sr.results.length > 0)
    throw ValidationMessages.ROOM_ALREADY_EXISTS;
    // Cool, so the room does not exits. Lets create it..

    let ret: StoredDoc<GamingRoom> = await conn.storeObject(room,DBNAMES.MANAGEMENT,CONTAINER_NAMES.GAMING_ROOM);
    return ret.resource;
}


/**
 * Returns gaming rooms owned by the persons
 * @param conn 
 * @param p 
 * @returns 
 */
export async function getOwnedGamingRooms (conn: DBConnection, p: Person): Promise<SearchResults<StoredDoc<GamingRoom>>>
{
    // Lets check to see if the gaming room exists for the person
    let query = "select * from gr where gr.uniqueId.creator.username = '" + p.username + "'";
    let sr: SearchResults<StoredDoc<GamingRoom>> = await conn.searchObjects(query,DBNAMES.MANAGEMENT,CONTAINER_NAMES.GAMING_ROOM,null);
    return sr;
}


/**
 * Returns gaming rooms owned by the persons
 * @param conn 
 * @param p 
 * @returns 
 */
 export async function getEveryOneInRoom (conn: DBConnection, room: GamingRoom): Promise<SearchResults<Person>>
 {
     // first lets get Room Information
     let gr: GamingRoom = await getRoomInformation(conn,room);
     
     if (gr == null)
        throw ValidationMessages.ROOM_NOT_FOUND;

     // Okay now that we have the room.
     let allPeople = new Array<Person>();
     if (gr.admins != null && gr.admins != undefined)
     {
        for (let admin of gr.admins)
        {
            allPeople.push(admin);
        }
     }

     if (gr.members != null && gr.members != undefined)
     {
        for (let member of gr.members)
        {
            allPeople.push(member);
        }
     }

     let sr = new SearchResults<Person>(allPeople,null);
     return sr;
 }


 /**
 * Returns game room Members
 * @param conn 
 * @param p 
 * @returns 
 */
  export async function getGameRoomMembers (conn: DBConnection, room: GamingRoom): Promise<SearchResults<Person>>
  {
      // first lets get Room Information
      let gr: GamingRoom = await getRoomInformation(conn,room);
      
      if (gr == null)
         throw ValidationMessages.ROOM_NOT_FOUND;
 
      // Okay now that we have the room.
      let allPeople = new Array<Person>();

      if (gr.members != null && gr.members != undefined)
      {
         for (let member of gr.members)
         {
             allPeople.push(member);
         }
      }
 
      let sr = new SearchResults<Person>(allPeople,null);
      return sr;
  }

/**
 * Returns game room Admins
 * @param conn 
 * @param p 
 * @returns 
 */
 export async function getGameRoomAdmins (conn: DBConnection, room: GamingRoom): Promise<SearchResults<Person>>
 {
     // first lets get Room Information
     let gr: GamingRoom = await getRoomInformation(conn,room);
     
     if (gr == null)
        throw ValidationMessages.ROOM_NOT_FOUND;

     // Okay now that we have the room.
     let allPeople = new Array<Person>();

     if (gr.admins != null && gr.admins != undefined)
     {
        for (let admin of gr.admins)
        {
            allPeople.push(admin);
        }
     }

     let sr = new SearchResults<Person>(allPeople,null);
     return sr;
 }