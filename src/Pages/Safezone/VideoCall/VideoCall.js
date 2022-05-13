import React, { useState, useEffect, useRef } from 'react';
import { SERVER_URI } from '../../../Global/Global';
import './VideoCall.css';
import { trigger } from '../../../Global/Events';
import io from "socket.io-client";
import SimplePeer from 'simple-peer';
const Peer = SimplePeer;

export const VideoCall = (props = { active: false, zoneId: '' }) => {
    const triggerJoinMeeting = () => trigger("Clicked:JoinMeeting");

    const [peers, setPeers] = useState([]);
    const socketRef = useRef();
    const userVideo = useRef();
    const peersRef = useRef([]);
    const roomId = 'meeting_' + props.zoneId;

    useEffect(() => {
        socketRef.current = io.connect(SERVER_URI, {
            jsonp: false,
            forceNew: true,
            extraHeaders: {
                "x-access-token": window.localStorage.getItem('accessToken'),
                "zone-id": props.zoneId
            }
        });
    }, []);

    useEffect(() => {
        if (props.active) {
            navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: true }).then(stream => {
                userVideo.current.srcObject = stream;
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
                    })
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

                    setPeers(users => [...users, peerObj]);
                });

                socketRef.current.on("receiving returned signal", payload => {
                    const item = peersRef.current.find(p => p.peerID === payload.id);
                    item.peer.signal(payload.signal);
                });

                socketRef.current.on('user left', id => {
                    const peerObj = peersRef.current.find(p => p.peerID === id);
                    if (peerObj) 
                        peerObj.peer.destroy();
                    
                    const peers = peersRef.current.filter(p => p.peerID !== id);
                    peersRef.current = peers;
                    setPeers(peers);
                });
            });
        }
    }, [props.active]);

    function createPeer(userToSignal, callerID, stream) {
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

    function addPeer(incomingSignal, callerID, stream) {
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
                    return (
                        <>
                            <Video key={peer.peerID} peer={peer.peer} />
                        </>

                    )
                })}
            </div>
            <div className='videoControls'>
                {
                    props.active && <>

                    </>
                }
                {
                    !props.active && <>
                        <button
                            className='secondary-stroke'
                            disabled={props.active}
                            onClick={triggerJoinMeeting}>
                            Join Meeting
                        </button>
                    </>
                }
            </div>\
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

const videoConstraints = {
    height: window.innerHeight / 2,
    width: window.innerWidth / 2
};