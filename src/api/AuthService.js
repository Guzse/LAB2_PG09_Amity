import { promiseConnectionError} from '../Global/Global';

export default class AuthService {
    async SignIn(username, password) {
        try {
            return await fetch(process.env.REACT_APP_SERVER_URI + `/auth/signin`, {
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
            return await fetch(process.env.REACT_APP_SERVER_URI + `/auth/signup`, {
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
        } catch(err) {
            return promiseConnectionError();
        }
    }
    async Verify() {
        try {
            return await fetch(process.env.REACT_APP_SERVER_URI + `/auth/verify`, {
                method: 'GET',
                headers: {
                    'x-access-token': window.localStorage.getItem("accessToken"),
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            });
        } catch(err) {
            return promiseConnectionError();
        }
    }
}