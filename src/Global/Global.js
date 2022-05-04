import $ from 'jquery';
import ErrorMessage from './ErrorMessage';

// Server calls want a "Promise", not just an object, to be returned.
// This function wraps a ConnectionError inside a Promise, then returns that instead.
export const promiseConnectionError = () => {
    let defered = $.Deferred();
    defered.resolve({
        _HTTP_STATUS: 500,
        message: ErrorMessage.unableToConnect,
    });
    return defered.promise();
}
