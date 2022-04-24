export default class AuthService {
    async SignIn(username, password) {
        const response = await fetch(process.env.REACT_APP_SERVER_URI + `/auth/signin`, {
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
        return response.json();
    }
}