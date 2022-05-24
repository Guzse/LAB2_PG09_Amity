import ErrorMessage from './ErrorMessage';

export const SERVER_URI = process.env.REACT_APP_SERVER_URI;
export const LOCAL_ACCESS_TOKEN = 'AccessToken';
export const LOCAL_USERNAME = 'Username';
export const LOCAL_EMAIL = 'Email';
export const LOCAL_CAMERA_ID = 'CameraId';
export const LOCAL_MICROPHONE_ID = 'MicrophoneId';
export const LOCAL_SIDEBAR_VISIBLE = 'SidebarVisible'

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
 * @param {import('react-router-dom').NavigateFunction} reactNavigate
 * @returns Valid response object
 */
export const checkValidResponse = async (response, reactNavigate = undefined) => {
    if (response.status === 401) {
        window.localStorage.removeItem(LOCAL_ACCESS_TOKEN);
        if (reactNavigate)
            reactNavigate('login');
        else window.location.href = '/login';
    }
    //response.json = () => json;
    return response;
}

/**
 * @returns {String[]} Partitioned path
 */
export const segmentPathName = () => {
    return window.location.pathname.split("?")[0].split("/").slice(1);
}

/**
 * Checks whether the screen is smaller than 420px or not.
 * @returns Boolean
 */
export const screenWidthSmall = () => window.screen.width <= 420;
