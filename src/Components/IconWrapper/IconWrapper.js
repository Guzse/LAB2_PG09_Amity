import React, { useEffect, useState } from 'react';
import './IconWrapper.css';

export const IconWrapper = (props = { width: '40px', primary: false, secondary: false, background: false }) => {
    const [type, setType] = useState("");

    useEffect(() => {
        if (props.primary) setType('primary');
        if (props.secondary) setType('secondary');
        if (props.background) setType('background');
    }, [props]);

    const sanitizeProps = () => {
        const sanitized = {...props};
        delete sanitized.primary;
        delete sanitized.secondary;
        delete sanitized.background;
        delete sanitized.className;
        return sanitized;
    }
    
    let clickable = '';
    if (props.onClick) clickable = 'clickable';
    // console.log(`%ctype: ${type}`, "color: pink");
    return (
        <div style={{width: props.width, height: props.width}} className={`iconWrapper ${type || ''} ${clickable || ''} ${props.className || ''}`} {...sanitizeProps()}>
            {props.children}
        </div>
    )
}

export default IconWrapper;
