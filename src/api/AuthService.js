import { checkValidResponse, getConnectionError, LOCAL_ACCESS_TOKEN, SERVER_URI } from '../Global';
export default class AuthService {
    constructor(reactNavigate = undefined) {
        this.reactNavigate = reactNavigate;
    }

    async SignIn(username, password) {
        try {
            return await fetch(SERVER_URI + `/api/auth/signin/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({
                    username,
                    password
                })
            });
        } catch (err) {
            return getConnectionError(err);
        }
    }
    async SignUp(username, password, email) {
        try {
            return await fetch(SERVER_URI + `/api/auth/signup/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({
                    username,
                    password,
                    email
                })
            });
        } catch (err) {
            return getConnectionError(err);
        }
    }
    async Verify() {
        try {
            const response = await fetch(SERVER_URI + `/api/auth/verify/`, {
                method: 'GET',
                headers: {
                    'x-access-token': window.localStorage.getItem(LOCAL_ACCESS_TOKEN),
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            });
            return await checkValidResponse(response, this.reactNavigate);
        } catch (err) {
            return getConnectionError(err);
        }
    }
}