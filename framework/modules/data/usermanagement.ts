export enum ACCOUNTSTATUS
{
    "REGISTERED",
    "REGISTERED_ACCEPTED"
}

export enum EMAILSTATUS
{
    "VERIFIED",
    "UN_VERIFIED"
}


export class Person
{
    nativeId: string;   // A native ID if needed for the underlying system.

    /**
     * User Name Unique Across the System.
     */
    username: string;

    /**
     * The Identity Provider
     */
    idp: string;

    email:  string;
    emailStatus: EMAILSTATUS = EMAILSTATUS.UN_VERIFIED;

    accountStatus: ACCOUNTSTATUS = ACCOUNTSTATUS.REGISTERED;

    lastAccepted: Date; // The date when the user last accepted the terms and conditions.
    
    phone: string;

    location: Location = new Location('x','x');

    constructor (username: string,idp: string,email: string,phone: string,loc: Location)
    {
        this.username = username;
        this.idp = idp;
        this.email = email;
        this.phone = phone;
        this.location.country = loc.country;
        this.location.zip = loc.zip;
    }



}


export class Location
{
    country: string;
    zip: string;

    constructor (country: string, zip: string)
    {
        this.country = country;
        this.zip = zip;
    }
}