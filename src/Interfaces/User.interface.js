
export class User {
    constructor(param = {username: '', email: '', roles: [], lastZone: '' }) {
        this.username = param.username;
        this.email = param.email;
        this.lastZone = param.lastZone;
        this.roles = param.roles;
    }
    /** @type {String} */
    username;
    /** @type {String} */
    email;
    /** @type {Array[Role]} */
    roles;
    /** @type {String} */
    lastZone;
}

export class Role {
    /** @type {String} */
    type;
    /** @type {String} */
    ref;
}