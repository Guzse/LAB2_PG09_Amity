import socketIOClient from 'socket.io-client';

export default class SocketService {

    connectToSocket = (zoneId) => {
        return socketIOClient(process.env.REACT_APP_SERVER_URI, {
            extraHeaders: {
                "x-access-token": window.localStorage.getItem('accessToken'),
                "zone-id": zoneId
            }
        });
    }

    userJoin() {
        
    }

}