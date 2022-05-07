import React from 'react';
import './VideoCall.css';

export const VideoCall = () => {
    return (
        <div className='videoCall'>
            <div className='videoContainer'>
            </div>
            <div className='videoControls'>
                <button className='primary-stroke'>Join Meeting</button>
            </div>
        </div>
    )
}
