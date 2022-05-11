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
