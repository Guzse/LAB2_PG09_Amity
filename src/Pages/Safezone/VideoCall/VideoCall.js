import React, { useState, useEffect, useRef, forwardRef } from 'react';
import { SERVER_URI, LOCAL_CAMERA_ID, LOCAL_MICROPHONE_ID, EVENT__CLICK_JOIN_MEETING, EVENT__CLICK_LEAVE_MEETING } from '../../../Global';
import './VideoCall.css';
import { trigger } from '../../../Global/Events';
import SimplePeer from 'simple-peer';
import { ButtonGroup } from '../../../Components/ButtonGroup/ButtonGroup';
import { HiVideoCamera, HiMicrophone } from "react-icons/hi";
import { ButtonToggle } from '../../../ButtonToggle/ButtonToggle';

const Peer = SimplePeer;

/**
 * @param {React.MutableRefObject<Socket>} ref
 * @param {{active: Boolean, zoneId: String}} props */
export const VideoCall = forwardRef((props, ref) => {
    const triggerJoinMeeting = () => trigger(EVENT__CLICK_JOIN_MEETING);
    const triggerLeaveMeeting = () => trigger(EVENT__CLICK_LEAVE_MEETING);
    // const triggerSocketReconnect = () => trigger(EVENT__SOCKET_ZONE_RECONNECT);

    /** @type {[number, function]} */
    const [roomSize, setRoomSize] = useState(0);
    /** @type {[Array<MediaDeviceInfo>, function]} */
    const [camDevices, setCamDevices] = useState([]);
    /** @type {[Array<MediaDeviceInfo>, function]} */
    const [micDevices, setMicDevices] = useState([]);
    /** @type {[MediaDeviceInfo, function]} */
    const [camera, setCamera] = useState({});
    /** @type {[MediaDeviceInfo, function]} */
    const [microphone, setMicrophone] = useState({});
    const socketRef = ref;

    /** @type {React.MutableRefObject<MediaStream} */
    const userVideo = useRef();
    /** @type {React.MutableRefObject<Array<{peerID: string, peer: Peer, connected: Boolean}>>} */
    const peersRef = useRef([]);

    const roomId = 'meeting_' + props.zoneId;

    useEffect(async () => {
        const devices = await navigator.mediaDevices.enumerateDevices();
        /** @type {MediaDeviceInfo[]} */
        const micDevices = [];
        /** @type {MediaDeviceInfo[]} */
        const camDevices = [];
        const localCamId = localStorage.getItem(LOCAL_CAMERA_ID);
        const localMicId = localStorage.getItem(LOCAL_MICROPHONE_ID);

        devices.forEach((device) => {
            if (device.kind === 'videoinput') {
                if (!device.groupId || !camDevices.find(cam => cam.groupId === device.groupId))
                    camDevices.push(device);
                if (device.deviceId === localCamId) setCamera(device);
            }
            else if (device.kind === 'audioinput') {
                if (!device.groupId || !micDevices.find(mic => mic.groupId === device.groupId))
                    micDevices.push(device);
                if (device.deviceId === localMicId) setMicrophone(device);
            }
        });

        console.groupCollapsed("%cDevices", "color: cyan");
        console.table(camDevices);
        console.table(micDevices);
        console.groupEnd();
        setCamDevices(camDevices);
        setMicDevices(micDevices);
    }, [ref]);

    const handleCamChange = (e) => {
        const key = e.target.value;
        localStorage.setItem(LOCAL_CAMERA_ID, key);
        const device = camDevices.filter(cam => cam.deviceId === key)[0];
        // console.log('camera', { device, key, camDevices });
        setCamera(device || camera);
    }

    const handleMicChange = async (e) => {
        const key = e.target.value;
        localStorage.setItem(LOCAL_MICROPHONE_ID, key);
        const device = micDevices.filter(mic => mic.deviceId === key)[0];
        // console.log('microphone', { device, key, micDevices });
        setMicrophone(device || microphone);
    }

    useEffect(async () => {
        if (props.active) {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: {
                        height: window.innerHeight / 2,
                        width: window.innerWidth / 2,
                        deviceId: camera.deviceId
                    },
                    audio: {
                        deviceId: microphone.deviceId
                    }
                });
                userVideo.current.srcObject = stream;
                console.log(`%cJoined socket at ${SERVER_URI}, connected=${socketRef.current.connected}`, 'color: pink');
                socketRef.current.emit("join room", roomId);
                socketRef.current.on("all users", users => {
                    users.forEach(userID => {
                        const peer = createPeer(userID, socketRef.current.id, stream);
                        const peerObj = {
                            peerID: userID,
                            connected: true,
                            peer,
                        };
                        if (!peersRef.current.find(p => p.peerID === userID))
                            peersRef.current.push(peerObj);
                    });
                    setRoomSize(peersRef.current.filter(p => p.connected).length);
                    console.log(`%cNew Room Members: ${peersRef.current.filter(p => p.connected).length}; %o`, 'color: cyan', { peersRef: peersRef.current });
                })
                socketRef.current.on("user joined", payload => {
                    const peer = addPeer(payload.signal, payload.callerID, stream);
                    const peerObj = {
                        peerID: payload.callerID,
                        connected: true,
                        peer,
                    };
                    if (!peersRef.current.find(p => p.peerID === payload.callerID))
                        peersRef.current.push(peerObj);
                    setRoomSize(peersRef.current.filter(p => p.connected).length);
                    console.log(`%cSomeone Joined. Members: ${peersRef.current.filter(p => p.connected).length}; %o`, 'color: cyan', { peersRef: peersRef.current });
                });
                socketRef.current.on("receiving returned signal", payload => {
                    /** @type {Peer} */
                    const item = peersRef.current.find(p => p.peerID === payload.id);
                    item.peer.signal(payload.signal);
                    // console.log("%creceiving return signal", 'color: lightgreen');
                });
                socketRef.current.on('user left', id => {
                    const peerObj = peersRef.current.find(p => p.peerID === id);
                    // console.log('%cOldPeer%o', 'color: yellow', peerObj);
                    if (peerObj) {
                        peerObj.peer.destroy();
                        peerObj.connected = false;
                    }
                    // const peers = peersRef.current.filter(p => p.peerID !== id);
                    // peersRef.current = peers;
                    setRoomSize(peersRef.current.filter(p => p.connected).length);
                    console.log(`%cSomeone Left. Members: ${peersRef.current.length}`, 'color: cyan');
                });
            } catch (err) {
                console.trace(err);
            }
        }
        else if (socketRef && socketRef.current && socketRef.current.connected) {
            socketRef.current.emit("leave room");
            peersRef.current.forEach(peerObj => {
                peerObj.peer.destroy();
                peerObj.connected = false;
                // console.log('%cOldPeer%o', 'color: yellow', peerObj);
            });
            // peersRef.current = [];
            setRoomSize(peersRef.current.filter(p => p.connected).length);
        }
    }, [props.active, camera, microphone, peersRef.current]);
    
    const createPeer = (userToSignal, callerID, stream) => {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream,
        });
        peer.on("signal", signal => {
            socketRef.current.emit("sending signal", { userToSignal, callerID, signal })
        })
        return peer;
    }

    const addPeer = (incomingSignal, callerID, stream) => {
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream,
        })
        peer.on("signal", signal => {
            socketRef.current.emit("returning signal", { signal, callerID })
        })
        peer.signal(incomingSignal);
        return peer;
    }

    const videoList = peersRef.current.map((peer) => {
        if (peer.connected)
            return <Video key={peer.peerID} peer={peer.peer} />;
        return <></>;
    });

    if (props.active) {
        console.groupCollapsed("%cRender Function", 'color: crimson');
        console.log(`%cVideo Elements:   ${videoList.length}`, 'color: orange');
        console.log(`%cRoom Size:        ${roomSize}`, 'color: orange');
        if (peersRef.current.length > 0) console.table(peersRef.current);
        console.groupEnd();
    }

    const selectCam = () => {
        if (camDevices.length < 2) {
            return <></>
        } else if (camDevices.length === 2) {
            return <></>
        } else {
            return <select className='secondary' value={camera.deviceId} onChange={e => handleCamChange(e)}>
                {
                    camDevices.map((device, index) => {
                        return <option key={device.deviceId} value={device.deviceId}>
                            {device.label || `Camera ${index + 1}`}
                        </option>
                    })
                }
            </select>
        }
    }

    const selectMic = () => {
        if (micDevices.length < 2) return <></>;
        return <select className='secondary' value={microphone.deviceId} onChange={e => handleMicChange(e)} >
            {
                micDevices.map((device, index) => {
                    return <option key={device.deviceId} value={device.deviceId}>
                        {device.label || `Microphone ${index + 1}`}
                    </option>
                })
            }
        </select>;
    }

    return (
        <div className='videoCall'>
            <div className='videoContainer' active={props.active ? 1 : 0}>
                {props.active && videoList}
            </div>
            <div className='videoControls'>
                {
                    props.active ?
                        (
                            <button
                                className='error'
                                disabled={!props.active}
                                onClick={triggerLeaveMeeting}>
                                Leave Meeting
                            </button>
                        ) : (
                            <button
                                className='secondary-stroke'
                                disabled={props.active}
                                onClick={triggerJoinMeeting}>
                                Join Meeting
                            </button>
                        )
                }
                <ButtonGroup>
                    <ButtonToggle className='iconButton' falseClass='secondary' trueClass='error-stroke' onToggle={value => console.log(value)}><HiVideoCamera /></ButtonToggle>
                    { /* selectCam() */ }
                </ButtonGroup>
                <ButtonGroup>
                    <ButtonToggle className='iconButton' falseClass='secondary' trueClass='error-stroke' onToggle={value => console.log(value)}><HiMicrophone /></ButtonToggle>
                    { selectMic() }
                </ButtonGroup>
            </div>
            {props.active && <video className='cameraView' muted ref={userVideo} autoPlay playsInline />}
        </div>
    )
});

const Video = (props) => {
    const ref = useRef();

    useEffect(() => {
        props.peer.on("stream", stream => {
            ref.current.srcObject = stream;
        })
    }, []);

    return (
        <video playsInline autoPlay ref={ref} />
    )
}
