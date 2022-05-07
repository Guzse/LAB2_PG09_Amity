import React from 'react';
import './IconWrapper.css';

export const IconWrapper = (props = { width: '40px', primary: false, secondary: false, background: false }) => {
    let type = "";
    if (props.primary) type = 'primary';
    if (props.secondary) type = 'secondary';
    if (props.background) type = 'background';

    const sanitizeProps = () => {
        const sanitized = {...props};
        delete sanitized.primary;
        delete sanitized.secondary;
        delete sanitized.background;
    }
    
    let clickable = '';
    if (props.onClick) clickable = 'clickable';

    return (
        <div style={{width: props.width, height: props.width}} className={`iconWrapper ${type} ${clickable}`} {...sanitizeProps()}>
            {props.children}
        </div>
    )
}

export default IconWrapper;
