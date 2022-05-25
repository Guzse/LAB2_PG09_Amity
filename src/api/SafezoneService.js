import { checkValidResponse, getConnectionError, LOCAL_ACCESS_TOKEN, SERVER_URI} from '../Global';

export default class SafezoneService {
    constructor(reactNavigate = undefined) {
        this.reactNavigate = reactNavigate;
    }

    accessToken = localStorage.getItem(LOCAL_ACCESS_TOKEN);
    headers = {
        'x-access-token':  this.accessToken,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    };

    async CreateSafezone(zoneName, description = '', maxMembers = 0) {
        try {
            const response = await fetch(SERVER_URI + `/api/safezone/`, {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify({ // This object contains the parameters for the functions defined in the controllers
                    zoneName,
                    description,
                    maxMembers
                })
            });
            return await checkValidResponse(response, this.reactNavigate);
        } catch (err) {
            return getConnectionError(err);
        }
    }
    async UpdateSafezone(zoneObject = {}) {
        try {
            const response = await fetch(SERVER_URI + `/api/safezone/`, {
                method: 'PUT',
                headers: this.headers,
                body: JSON.stringify(zoneObject)
            });
            return await checkValidResponse(response, this.reactNavigate);
        } catch (err) {
            return getConnectionError(err);
        }
    }

    async GetSafezone(id) {
        try {
            const response = await fetch(SERVER_URI + `/api/safezone/`, {
                method: 'GET',
                headers: {
                    ...this.headers,
                    'safezone-id': id
                },
            });
            return await checkValidResponse(response, this.reactNavigate);
        } catch(err) {
            return getConnectionError(err);
        }
    }

    async CreateMeeting(zoneId, date) {
        try {
            const response = await fetch(process.env.REACT_APP_SERVER_URI + `/api/safezone/meeting`, {
                method: 'PUT',
                headers: this.headers,
                body: JSON.stringify({ zoneId, date})
            });
            return await checkValidResponse(response, this.reactNavigate);
        } catch (err) {
            return getConnectionError(err);
        }
    }
    async getMeeting(zoneId) {
        try {
            const response = await fetch(process.env.REACT_APP_SERVER_URI + `/api/safezone/meeting/` + zoneId, {
                method: 'GET',
                headers: this.headers,
            });
            return await checkValidResponse(response, this.reactNavigate);
        } catch (err) {
            return getConnectionError(err);
        }
    }

    async sendMessage(zoneId, content) {
        console.log(content);
        try {
            return await fetch(process.env.REACT_APP_SERVER_URI + `/api/message`, {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify({ zoneId, content, dateSend:Date.now() })
            });
        } catch (err) {
            return getConnectionError();
        }
    }

    async getMessages(zoneId) {
        try {
            const response = await fetch(process.env.REACT_APP_SERVER_URI + `/api/message/` + zoneId, {
                method: 'GET',
                headers: this.headers,
            });
            return await checkValidResponse(response, this.reactNavigate);
        } catch (err) {
            return await getConnectionError(err);
        }
    }

    async getUsersInZone(zoneId) {
        try {
            const response = await fetch(process.env.REACT_APP_SERVER_URI + `/api/safezoneUser/zone/${zoneId}`, {
                method: 'GET',
                headers: this.headers,
            });
            return await checkValidResponse(response, this.reactNavigate);
        } catch (err) {
            return await getConnectionError(err);
        }
    }
}