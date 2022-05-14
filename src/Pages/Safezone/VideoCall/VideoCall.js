import React, { useState, useEffect, useRef } from 'react';
import { SERVER_URI, LOCAL_CAMERA_ID, LOCAL_MICROPHONE_ID } from '../../../Global/Global';
import './VideoCall.css';
import { trigger } from '../../../Global/Events';
import io from "socket.io-client";
import SimplePeer from 'simple-peer';
import { ButtonGroup } from '../../../Components/ButtonGroup/ButtonGroup';
import { HiVideoCamera, HiMicrophone } from "react-icons/hi";
import { ButtonToggle } from '../../../ButtonToggle/ButtonToggle';

const Peer = SimplePeer;

export const VideoCall = (props = { active: false, zoneId: '' }) => {
    const triggerJoinMeeting = () => trigger("Clicked:JoinMeeting");
    const triggerLeaveMeeting = () => trigger("Clicked:LeaveMeeting");

    const [peers, setPeers] = useState([]);
    
    /** @type {[Array<MediaDeviceInfo>, function]} */
    const [camDevices, setCamDevices] = useState([]);
    /** @type {[Array<MediaDeviceInfo>, function]} */
    const [micDevices, setMicDevices] = useState([]);
    /** @type {[MediaDeviceInfo, function]} */
    const [camera, setCamera] = useState({});
    /** @type {[MediaDeviceInfo, function]} */
    const [microphone, setMicrophone] = useState({});

    const socketRef = useRef();
    const userVideo = useRef();
    const peersRef = useRef([]);

    const roomId = 'meeting_' + props.zoneId;

    useEffect(async () => {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const micDevices = [];
        const camDevices = [];

        const localCamId = localStorage.getItem(LOCAL_CAMERA_ID);
        const localMicId = localStorage.getItem(LOCAL_MICROPHONE_ID);
        console.table({localCamId, localMicId});
        
        devices.forEach((device) => {
            if (device.kind === 'videoinput') {
                camDevices.push(device);
                if (device.deviceId === localCamId) setCamera(device);
            }
            else if (device.kind === 'audioinput') {
                micDevices.push(device);
                if (device.deviceId === localMicId) setMicrophone(device);
            }
        });

        socketRef.current = io.connect(SERVER_URI, {
            jsonp: false,
            forceNew: true,
            extraHeaders: {
                "x-access-token": window.localStorage.getItem('accessToken'),
                "zone-id": props.zoneId
            }
        });

        setCamDevices(camDevices);
        setMicDevices(micDevices);
    }, []);

    useEffect(async () => {
        if (props.active) {
            try {
                console.log("getUserMedia", { camera, microphone});
                const stream = await navigator.mediaDevices.getUserMedia({ 
                    video: {
                        height: window.innerHeight / 2,
                        width: window.innerWidth / 2,
                        deviceId: camera.deviceId
                    }, 
                    audio: {
                        deviceId: microphone.deviceId
                    } });
                userVideo.current.srcObject = stream;
                console.log("joined", { socketRef }, SERVER_URI);

                socketRef.current.emit("join room", roomId);

                socketRef.current.on("all users", users => {
                    const peers = [];
                    users.forEach(userID => {
                        const peer = createPeer(userID, socketRef.current.id, stream);
                        peersRef.current.push({
                            peerID: userID,
                            peer,
                        })
                        peers.push({
                            peerID: userID,
                            peer,
                        });
                    });
                    // console.log("All Peers", { peers });
                    setPeers(peers);
                })

                socketRef.current.on("user joined", payload => {
                    const peer = addPeer(payload.signal, payload.callerID, stream);
                    peersRef.current.push({
                        peerID: payload.callerID,
                        peer,
                    });

                    const peerObj = {
                        peer,
                        peerID: payload.callerID,
                    }

                    // console.log("new peer", { peerObj });

                    setPeers(users => [...users, peerObj]);
                });

                socketRef.current.on("receiving returned signal", payload => {
                    const item = peersRef.current.find(p => p.peerID === payload.id);
                    item.peer.signal(payload.signal);
                    // console.log("receiving return signal");
                });

                socketRef.current.on('user left', id => {
                    const peerObj = peersRef.current.find(p => p.peerID === id);
                    // console.log("user left", { peerObj });
                    if (peerObj)
                        peerObj.peer.destroy();

                    const peers = peersRef.current.filter(p => p.peerID !== id);
                    peersRef.current = peers;
                    setPeers(peers);
                });
            } catch (err) {
                console.trace(err);
            }
        }
        return () => {
            console.log("UseEffect Unload");
        }
    }, [props.active, camera, microphone]);

    const handleCamChange = (e) => {
        const key = e.target.value;
        localStorage.setItem(LOCAL_CAMERA_ID, key);
        const device = camDevices.filter(cam => cam.deviceId === key)[0];
        console.log('camera', { device, key, camDevices});
        setCamera(device || camera);
    }

    const handleMicChange = async (e) => {
        const key = e.target.value;
        localStorage.setItem(LOCAL_MICROPHONE_ID, key);
        const device = micDevices.filter(mic => mic.deviceId === key)[0];
        console.log('microphone', { device, key, micDevices});
        setMicrophone(device || microphone);
    }

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

    return (
        <div className='videoCall'>
            <div className='videoContainer' active={props.active ? 1 : 0}>
                {props.active && peers.map((peer) => {
                    console.log(peer);
                    return (
                        <>
                            <Video key={peer.peerID} peer={peer.peer} />
                        </>

                    )
                })}
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
                    <select className='secondary' value={camera.deviceId} onChange={ e => handleCamChange(e) }>
                        {
                            camDevices.map((device, index) => {
                                return <option key={device.deviceId} value={device.deviceId}>
                                    { device.label || `Camera ${index + 1}` }
                                </option>
                            })
                        }
                    </select>
                </ButtonGroup>
                <ButtonGroup>
                    <ButtonToggle className='iconButton' falseClass='secondary' trueClass='error-stroke' onToggle={value => console.log(value)}><HiMicrophone /></ButtonToggle>
                    <select className='secondary' value={microphone.deviceId} onChange={ e => handleMicChange(e) } >
                        {
                            micDevices.map((device, index) => {
                                return <option key={device.deviceId} value={device.deviceId}>
                                    { device.label || `Microphone ${index + 1}` }
                                </option>
                            })
                        }
                    </select>
                </ButtonGroup>
            </div>
            {props.active && <video className='cameraView' muted ref={userVideo} autoPlay playsInline />}
        </div>
    )
}

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
