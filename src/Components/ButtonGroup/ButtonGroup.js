import React from 'react';
import './ButtonGroup.css';

export const ButtonGroup = (props) => {
  return (
    <div className='buttonGroup'>
        {props.children}
    </div>
  )
}
