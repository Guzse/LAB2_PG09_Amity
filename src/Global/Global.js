import $ from 'jquery';
import ErrorMessage from './ErrorMessage';

// Server calls want a "Promise", not just an object, to be returned.
// This function wraps a ConnectionError inside a Promise, then returns that instead.
export const promiseConnectionError = (error = undefined) => {
    let deferred = $.Deferred();
    deferred.resolve({
        _HTTP_STATUS: 500,
        message: ErrorMessage.unableToConnect,
        error: error
    });
    return deferred.promise();
}

export const SERVER_URI = process.env.REACT_APP_SERVER_URI;
export const LOCAL_CAMERA_ID = 'CameraId';
export const LOCAL_MICROPHONE_ID = 'MicrophoneId';
export const EVENT__CLICK_JOIN_MEETING = 'Clicked:JoinMeeting';
export const EVENT__CLICK_LEAVE_MEETING = 'Clicked:LeaveMeeting';
export const EVENT__SOCKET_ZONE_RECONNECT = 'Socket:Zone:Reconnect';
