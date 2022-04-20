import Resources from "./Resources"
export default class AuthService {
    authUrl = `${Resources.ServerUrl}/auth`
    static async SignIn(username, password) {
        const response = await fetch(`${this.authUrl}/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        });
        return response.json();
    }
}