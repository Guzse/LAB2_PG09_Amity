import { checkValidResponse, getConnectionError, SERVER_URI } from '../Global';

export default class UserService {
    async UpdateLastZone(zoneId) {
        try {
            const response = await fetch(SERVER_URI + `/api/user/zone/`, {
                method: 'PUT',
                headers: {
                    'x-access-token': window.localStorage.getItem("accessToken"),
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({
                    lastZone: zoneId
                })
            });
            return await checkValidResponse(response);
        } catch (err) {
            return await getConnectionError(err);
        }
    }
    async GetUserSafezones() {
        try {
            const response = await fetch(SERVER_URI + `/api/safezoneUser/`, {
                method: 'GET',
                headers: {
                    'x-access-token': window.localStorage.getItem("accessToken"),
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            });
            return await checkValidResponse(response);
        } catch (err) {
            return await getConnectionError(err);
        }
    }
}