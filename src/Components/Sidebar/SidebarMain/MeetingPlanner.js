import React, { useState } from 'react';
import { HiOutlinePencilAlt } from "react-icons/hi";
import IconWrapper from '../../IconWrapper/IconWrapper';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';
import { trigger } from '../../../Global/Events';
import DialogContent from '@mui/material/DialogContent';
import SafezoneService from '../../../api/SafezoneService';
import { EVENT_SAFEZONE_UPDATE } from '../../../Global';

export const MeetingPlanner = (props = { zone: {}, date: undefined, setZone: () => undefined }) => {

    const [open, setOpenMeet] = React.useState(false);

    const handleClickOpenMeet = () => {
        setOpenMeet(true);
    };

    const handleCloseMeet = () => {
        setOpenMeet(false);
    };

    function parseDate() {
        if (!props.date) return '';
        return (new Date(props.date)).toLocaleDateString("nl", {
            weekday: 'long', // long, short, narrow
            month: 'long', // numeric, 2-digit, long, short, narrow
            day: 'numeric', // numeric, 2-digit
            hour: 'numeric', // numeric, 2-digit
            minute: 'numeric', // numeric, 2-digit
        });
    }



    return (
        <>
            <div className="meetingPlanner">
                <div>Next meetup</div>
                <IconWrapper width="20px" onClick={handleClickOpenMeet}>
                    <HiOutlinePencilAlt />
                </IconWrapper>
                <p className='meetingTime'>{parseDate()}</p>
            </div>
            <MeetingDialog zoneId={props.zone._id} open={open} onClose={handleCloseMeet} />
        </>
    )
}

const MeetingDialog = (props = { open: false, onClose: () => undefined, zoneId: "" }) => {
    const [date, setDate] = useState();

    const navigate = useNavigate();
    const safezoneService = new SafezoneService(navigate);

    async function handleSubmit(e) {
        e.preventDefault();
        const response = await safezoneService
            .CreateMeeting(props.zoneId, date);
        const newDate = await response.json();
        console.log({ date: newDate });
        trigger(EVENT_SAFEZONE_UPDATE, { meetingDate: newDate.meetingDate });
        return newDate;
    }

    return (
        <Dialog onClose={props.onClose} open={props.open}>
            <DialogTitle>Create meeting</DialogTitle>
            <DialogContent>
                <form className="createMeeting" onSubmit={handleSubmit}>
                    <hr />
                    <div className="Date-container">
                        <label htmlFor="date">Date:</label>
                        <input type="datetime-local" name="date" onChange={e => setDate(new Date(e.target.value))} required />
                    </div>

                    <div className="button-container">
                        <button onClick={props.onClose} className="primary-stroke " >Remove</button>
                        <button onClick={props.onClose} className="primary-stroke " >Cancel</button>
                        <button onClick={props.onClose} type="submit" className="primary-stroke register create" >Accept</button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

