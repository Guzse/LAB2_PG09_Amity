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
    async SignUp(username, password, email) {
        try {
            const response = await fetch(process.env.REACT_APP_SERVER_URI + `/auth/signup`, {
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
            return response.json();
        } catch(err) {
            return {
                message: 'Unable to connect to server. Please check your internet connection or try again later.',
            }
        }
    }
}