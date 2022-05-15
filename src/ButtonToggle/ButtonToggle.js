import React, {useState} from 'react';

export const ButtonToggle = (props = {
    falseClass: 'primary',
    trueClass: 'primary-stroke',
    onToggle: (value) => undefined
}) => {
    const [value, setValue] = useState(false);
    const classes = (value ? props.trueClass : props.falseClass) + " " + (props.className ? props.className : "");
    const toggleValue = () => {

        setValue(prev => {
            props.onToggle(!prev);
            return !prev;
        });
    }
    const sanitizeProps = () => {
        const sanitized = {...props};
        delete sanitized.falseClass;
        delete sanitized.trueClass;
        delete sanitized.onToggle;
        return sanitized;
    }
    return (
        <button {...sanitizeProps()} className={classes} onClick={toggleValue} />
    )
}
