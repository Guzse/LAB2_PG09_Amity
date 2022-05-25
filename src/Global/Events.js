function on(eventType, listener) {
    document.addEventListener(eventType, listener);
}

function off(eventType, listener) {
    document.removeEventListener(eventType, listener);
}

function once(eventType, listener) {
    on(eventType, handleEventOnce);

    function handleEventOnce(event) {
        listener(event);
        off(eventType, handleEventOnce);
    }
}

/**
 * Broadcasts an event across the application.
 * @param {String} eventType 
 * @param {{}} data 
 */
function trigger(eventType, data) {
    const event = new CustomEvent(eventType, { detail: data });
    document.dispatchEvent(event);
}

export { on, once, off, trigger };