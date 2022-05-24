import React, { useEffect, useState } from 'react';
import SafezoneService from '../../../api/SafezoneService';
import { LabelInput } from '../../LabelInput/LabelInput';

export const UserList = (props = {zoneId: ''}) => {
    const safezoneService = new SafezoneService();
    const [users, setUsers] = useState();

    useEffect(async () => {
        const members = await safezoneService.getUsersInZone(props.zoneId);
        console.log('members', members);
    }, [props.zoneId]);

    return (
        <div className="userList">
            <LabelInput className="search" type="text" placeholder="Search.." />
            <ul>

            </ul>
        </div>
    )
}

const LiUser = () => {
    return (
        <li>
            
        </li>
    )
}