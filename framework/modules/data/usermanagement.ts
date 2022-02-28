export enum ACCOUNTSTATUS
{
    "UNREGISTERED" = "UnRegistered",
    "REGISTERED" = "Registered",
    "TERMS_ACCEPTED" = "Terms_Accepted"
}

export enum EMAILSTATUS
{
    "VERIFIED" = "Verified",
    "UN_VERIFIED" = "UnVerified"
}

/**
 * A key indicating the uniqueness of the IDP.
 */
export class IdpUniqueness
{
    idp: string;            // The IDP name..
    uniqueId: string;       // The user subject unique to the IDP.
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
    idp: IdpUniqueness;

    email:  string;
    emailStatus: EMAILSTATUS = EMAILSTATUS.UN_VERIFIED;

    accountStatus: ACCOUNTSTATUS = ACCOUNTSTATUS.REGISTERED;

    lastAccepted: Date; // The date when the user last accepted the terms and conditions.
    
    phone: string;

    location: Location = new Location('x','x');

    constructor (username: string,idp: IdpUniqueness,email: string,phone: string,loc: Location)
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