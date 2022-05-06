import React from 'react';
import * as Icon from 'react-icons/hi';

export const LabelInput = (props = { label: '', name: '' }) => {
    const placeholder = (props.type === "password") ? "●●●●●" : "";
    const sanitizeProps = (props) => {
        let sanitized = { ...props };
        if (props.icon) delete sanitized.icon;
        if (props.label) delete sanitized.label;
        return sanitized;
    }

    return (
        <div className='labelInputContainer'>
            {props.label && <label for={props.name}>{props.label}</label>}
            {(props.icon) && Icon[props.icon]}
            <input type='text' placeholder={placeholder} {...sanitizeProps(props)}/>
        </div>
    )
}
