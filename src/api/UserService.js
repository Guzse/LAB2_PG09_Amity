import { checkValidResponse, getConnectionError, LOCAL_ACCESS_TOKEN, SERVER_URI } from '../Global';

export default class UserService {
    constructor(reactNavigate = undefined) {
        this.reactNavigate = reactNavigate;
    }
    accessToken = localStorage.getItem(LOCAL_ACCESS_TOKEN);
    headers = {
        'x-access-token':  this.accessToken,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    };

    async UpdateLastZone(zoneId) {
        try {
            const response = await fetch(SERVER_URI + `/api/user/zone/`, {
                method: 'PUT',
                headers: this.headers,
                body: JSON.stringify({
                    lastZone: zoneId
                })
            });
            return await checkValidResponse(response, this.reactNavigate);
        } catch (err) {
            return await getConnectionError(err);
        }
    }
    async GetUserSafezones() {
        try {
            const response = await fetch(SERVER_URI + `/api/safezoneUser/`, {
                method: 'GET',
                headers: this.headers,
            });
            return await checkValidResponse(response, this.reactNavigate);
        } catch (err) {
            return await getConnectionError(err);
        }
    }
}