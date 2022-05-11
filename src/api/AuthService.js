import { promiseConnectionError, SERVER_URI } from '../Global/Global';
export default class AuthService {
    async SignIn(username, password) {
        try {
            return await fetch(SERVER_URI + `/api/auth/signin`, {
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
            return promiseConnectionError();
        }
    }
    async SignUp(username, password, email) {
        try {
            return await fetch(SERVER_URI + `/api/auth/signup`, {
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
            return promiseConnectionError();
        }
    }
    async Verify() {
        try {
            return await fetch(SERVER_URI + `/api/auth/verify`, {
                method: 'GET',
                headers: {
                    'x-access-token': window.localStorage.getItem("accessToken"),
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            });
        } catch (err) {
            return promiseConnectionError();
        }
    }
}