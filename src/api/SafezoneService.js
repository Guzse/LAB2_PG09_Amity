import { promiseConnectionError, SERVER_URI} from '../Global/Global';

export default class SafezoneService {
    
    async CreateSafezone(zoneName, description = '', maxMembers = 0) {
        try {
            return await fetch(SERVER_URI + `/api/safezone/`, {
                method: 'POST',
                headers: {
                    'x-access-token': window.localStorage.getItem("accessToken"), // get accessToken from storage to verify that the user is logged in
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({ // This object contains the parameters for the functions defined in the controllers
                    zoneName,
                    description,
                    maxMembers
                })
            });
        } catch (err) {
            return promiseConnectionError();
        }
    }
    async UpdateSafezone(zoneObject = {}) {
        try {
            return await fetch(SERVER_URI + `/api/safezone/`, {
                method: 'PUT',
                headers: {
                    'x-access-token': window.localStorage.getItem("accessToken"),
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify(zoneObject)
            });
        } catch (err) {
            return promiseConnectionError();
        }
    }

    async GetSafezone(id) {
        try {
            return await fetch(SERVER_URI + `/api/safezone/`, {
                method: 'GET',
                headers: {
                    'x-access-token': window.localStorage.getItem("accessToken"),
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'safezone-id': id
                }
            });
        } catch(err) {
            return promiseConnectionError(err);
        }
    }

    async CreateMeeting(zoneId, date) {
        try {
            return await fetch(process.env.REACT_APP_SERVER_URI + `/api/safezone/meeting`, {
                method: 'PUT',
                headers: {
                    'x-access-token': window.localStorage.getItem("accessToken"), // get accessToken from storage to verify that the user is logged in
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({ zoneId, date})
            });
        } catch (err) {
            return promiseConnectionError();
        }
    }
    async getMeeting(zoneId) {
        try {
            return await fetch(process.env.REACT_APP_SERVER_URI + `/api/safezone/meeting/` + zoneId, {
                method: 'GET',
                headers: {
                    'x-access-token': window.localStorage.getItem("accessToken"),
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            });
        } catch (err) {
            return promiseConnectionError(err);
        }
    }
}