import React from 'react';
import "./SidebarMain.css";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { HiOutlineUser } from "react-icons/hi";
import { HiOutlineCog } from "react-icons/hi";
import { LabelInput } from "../../LabelInput/LabelInput";
import IconWrapper from '../../IconWrapper/IconWrapper';

export const SidebarMain = (props = {
    onClickProfile: () => { },
    onClickSettings: () => { },
    onClickUser: () => { }
}

) => {
    return (
        <>
            <UserList />
            <MeetingPlanner/>
            <ProfileSettings onClickProfile onClickSettings />
        </>
    )
}

const UserList = () => {
    return (
        <div className="userList">
            <LabelInput className="search" type="text" placeholder="Search.." />
        </div>
    )
}

const MeetingPlanner = () => {

    const onClickEdit = () => {

    }

    return (
        <div className="meetingPlanner">
            <div>Next meetup</div>
            <IconWrapper width="20px" onClick={onClickEdit}>
                <HiOutlinePencilAlt />
            </IconWrapper>
            <p>Friday January 10, 19:00</p>
        </div>
    )
}

const ProfileSettings = ({onClickProfile = () => {}, onClickSettings = () => {}}) => {
    return (
        <div className="profileSettings">
            <div className='profile'>
                <IconWrapper background width="40px" onClick={onClickProfile}>
                    <HiOutlineUser />
                </IconWrapper>
                <div className='username'>{window.localStorage.getItem("username")}</div>
            </div>
            <IconWrapper width="40px" onClick={onClickSettings}>
                <HiOutlineCog className="settingIcon"/>
            </IconWrapper>
        </div>
    )
}
