import ErrorMessage from './ErrorMessage';

export const SERVER_URI = process.env.REACT_APP_SERVER_URI;
export const LOCAL_CAMERA_ID = 'CameraId';
export const LOCAL_MICROPHONE_ID = 'MicrophoneId';
export const ACCESS_TOKEN_DENIED = 'Access token denied';
export const EVENT__CLICK_JOIN_MEETING = 'Clicked:JoinMeeting';
export const EVENT__CLICK_LEAVE_MEETING = 'Clicked:LeaveMeeting';
export const EVENT__SOCKET_ZONE_RECONNECT = 'Socket:Zone:Reconnect';
export const EVENT_SAFEZONE_UPDATE = "Safezone:Update";

export const getConnectionError = (error = undefined) => {
    return {
        _HTTP_STATUS: 500,
        message: ErrorMessage.unableToConnect,
        error: error,
        json: () => { throw new Error(ErrorMessage.unableToConnect); }
    };
}

/**
 * Handles common errors with responses from the server, and returns the response if everything is fine.
 * @param {Response} response 
 * @returns Valid response object
 */
export const checkValidResponse = async (response) => {
    if (response.status === 401) {
        const res = await response.json();
        console.log(`badToken: ${res.message === ACCESS_TOKEN_DENIED}`)
        if (res.message === ACCESS_TOKEN_DENIED)
            window.location.href = '/login';
    }
    return response;
}

/**
 * @returns {String[]} Partitioned path
 */
 export const segmentPathName = () => {
    return window.location.pathname.split("?")[0].split("/");
}