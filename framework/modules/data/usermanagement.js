"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Location = exports.Person = void 0;
class Person {
    constructor(username, idp, email, phone, loc) {
        this.location = new Location('x', 'x');
        this.username = username;
        this.idp = idp;
        this.email = email;
        this.phone = phone;
        this.location.country = loc.country;
        this.location.zip = loc.zip;
    }
}
exports.Person = Person;
class Location {
    constructor(country, zip) {
        this.country = country;
        this.zip = zip;
    }
}
exports.Location = Location;
const body = {
    "person": {
        "username": "Saurin Magiawala",
        "email": "Saurinya@gmail.com",
        "idp": "Microsoft",
        "phone": "938383333",
        "location": {
            "country": "USA",
            "zip": "30005"
        }
    }
};
//# sourceMappingURL=usermanagement.js.map