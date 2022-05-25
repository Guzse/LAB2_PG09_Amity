import React, { useEffect, useState } from 'react';
import Regex from '../../Global/Regex';
import DefaultIcon from './DefaultIcons';
import './SmartIcon.css';

export const SmartIcon = (props = { src: '', title: '', active: false }) => {
    const [picture, setPicture] = useState(props.src);
    const [title, setTitle] = useState(props.title);

    useEffect(() => {
        setPicture(props.src);
        setTitle(props.title);
    }, [props.src, props.title]);

    const className = 'smartIcon' + (props.active ? ' active ' : ' ') + (props.className ? props.className : '');

    useEffect(() => {
        if (props.src === '') {
            if (title.length === 0){
                setPicture(DefaultIcon.TAG);
            } 
            else{
                const sign = title[0].toUpperCase();
                if (Regex.alphaOnly.test(sign)) {
                    setPicture(DefaultIcon[sign]);
                }
                else setPicture(DefaultIcon.TAG);
            }
        }
    })

    return (
        <div {...props} className={className} >
            <img alt={title} src={picture}/>
        </div>
    )
}
