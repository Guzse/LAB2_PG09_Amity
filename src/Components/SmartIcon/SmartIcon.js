import React, { useEffect, useState } from 'react';
import Regex from '../../Global/Regex';
import DefaultIcon from './DefaultIcons';
import './SmartIcon.css';

export const SmartIcon = (props = { src: '', title: '' }) => {
    const [picture, setPicture] = useState(props.src);
    const [title, setTitle] = useState(props.title);

    useEffect(() => {
        setPicture(props.src);
        setTitle(props.title);
    }, [props.src, props.title]);

    useEffect(() => {
        if (props.src === '') {
            const sign = title[0].toUpperCase();
            if (Regex.alphaOnly.test(sign)) {
                setPicture(DefaultIcon[sign]);
            }
            else setPicture(DefaultIcon.TAG);
        }
    })

    return (
        <div className='smartIcon'>
            <img alt={title} src={picture}/>
        </div>
    )
}
