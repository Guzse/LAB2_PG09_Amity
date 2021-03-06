import React, { useEffect, useState } from 'react';
import SafezoneService from '../../../api/SafezoneService';
import { EVENT_SAFEZONE_USERS_UPDATE } from '../../../Global';
import { trigger } from '../../../Global/Events';
import { LabelInput } from '../../LabelInput/LabelInput';
import { SmartIcon } from '../../SmartIcon/SmartIcon';

export const UserList = (props = {zoneId: ''}) => {
    const safezoneService = new SafezoneService();
    const [users, setUsers] = useState([]);

    useEffect(async () => {
        if (props.zoneId) {
            const response = (await safezoneService.getUsersInZone(props.zoneId));
            /** @type {Array<Object>} */
            const members = await response.json() || [];
            setUsers(members);
            trigger(EVENT_SAFEZONE_USERS_UPDATE, members);
        } 
    }, [props.zoneId]);

    return (
        <div className="userList">
            <LabelInput className="search" type="text" placeholder="Search.." />
            <ul>
                {
                    users.map(user => <LiUser user={user} key={user.userId} />)
                }
            </ul>
        </div>
    )
}

const LiUser = (props = {user: {username: '', email: '', userId: '', roles: []}}) => {
    return (
        <li>
            <SmartIcon src={''} title={ props.user.username } />
            <p>{props.user.username}</p>
        </li>
    )
}