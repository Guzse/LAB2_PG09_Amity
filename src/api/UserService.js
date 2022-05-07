import { promiseConnectionError } from '../Global/Global';

export default class UserService {
    async UpdateLastZone(zoneId) {
        try {
            return await fetch(process.env.REACT_APP_SERVER_URI + `/api/user/zone`, {
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
        } catch (err) {
            return promiseConnectionError();
        }
    }
}