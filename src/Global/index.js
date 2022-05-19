import ErrorMessage from './ErrorMessage';

export const promiseConnectionError = (error = undefined) => {
    return {
        _HTTP_STATUS: 500,
        message: ErrorMessage.unableToConnect,
        error: error
    };
}

/**
 * @returns {String[]} Partitioned path
 */
 export const routeSegments = () => {
    return window.location.pathname.split("?")[0].split("/");
}

export const SERVER_URI = process.env.REACT_APP_SERVER_URI;
export const LOCAL_CAMERA_ID = 'CameraId';
export const LOCAL_MICROPHONE_ID = 'MicrophoneId';
export const EVENT__CLICK_JOIN_MEETING = 'Clicked:JoinMeeting';
export const EVENT__CLICK_LEAVE_MEETING = 'Clicked:LeaveMeeting';
export const EVENT__SOCKET_ZONE_RECONNECT = 'Socket:Zone:Reconnect';
export const EVENT_SAFEZONE_UPDATE = "safezone:update";
