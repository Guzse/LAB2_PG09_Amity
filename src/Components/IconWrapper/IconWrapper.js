import React from 'react';
import './IconWrapper.css';

export const IconWrapper = (props = { width: '40px' }) => {
    let type = "";
    if (props.primary) type = 'primary';
    if (props.secondary) type = 'secondary';
    if (props.background) type = 'background';
    
    let clickable = '';
    if (props.onClick) clickable = 'clickable';

    return (
        <div style={{width: props.width, height: props.width}} className={`iconWrapper ${type} ${clickable}`} {...props}>
            {props.children}
        </div>
    )
}

export default IconWrapper;
