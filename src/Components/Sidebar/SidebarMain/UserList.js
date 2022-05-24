import React from 'react';
import "./SidebarMain.css";
import { LabelInput } from '../../LabelInput/LabelInput';

export const UserList = () => {
    return (
        <div className="userList">
            <LabelInput className="search" type="text" placeholder="Search.." />
            <ul>
                
            </ul>
        </div>
    )
}