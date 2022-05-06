import React from 'react';
import './SidebarLeft.css';
import { HiUserGroup } from "react-icons/hi";
import { HiOutlinePlusCircle } from "react-icons/hi";

export const SidebarLeft = () => {
    return (
        <div className='sidebar-left'>
            <div className="serverlist">
                <HiUserGroup className="groupIcon" />
                <HiUserGroup className="groupIcon" />
                <HiUserGroup className="groupIcon" />
            </div>
            
            <HiOutlinePlusCircle className="plusIcon" />
        </div>
    )
}
