import React, { useEffect, useState } from 'react';
import SafezoneService from '../../../api/SafezoneService';
import { on } from '../../../Global/Events';
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
            on()
        } 
    }, [props.zoneId]);

    return (
        <div className="userList">
            <LabelInput className="search" type="text" placeholder="Search.." />
            <ul>
                {
                    users.map(user => <LiUser user={user} />)
                }
            </ul>
        </div>
    )
}

const LiUser = (props = {user: {username: '', email: '', userId: '', roles: []}}) => {
    console.log(props.user.roles)
    return (
        <li>
            <SmartIcon src={''} title={ props.user.username } />
            <p>{props.user.username}</p>
        </li>
    )
}