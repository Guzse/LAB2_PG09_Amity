import React, { useState, useEffect, useRef } from 'react';
import './VideoCall.css';
import { trigger } from '../../../Global/Events';
import SocketService from '../../../api/SocketService';
import SimplePeer from 'simple-peer';
const Peer = SimplePeer;

export const VideoCall = (props = { active: false, zoneId: '' }) => {
    const triggerJoinMeeting = () => trigger("Clicked:JoinMeeting");

    const [peers, setPeers] = useState([]);
    const socketRef = useRef();
    const userVideo = useRef();
    const peersRef = useRef([]);
    const roomId = 'meeting_' + props.zoneId;
    const socketService = new SocketService();

    useEffect(() => {
        if (props.active) {
            console.log("connecting to socket");
            socketRef.current = socketService.connectToSocket(props.zoneId);
            navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: true }).then(stream => {
                userVideo.current.srcObject = stream;
                socketRef.current.emit("joinRoom", roomId);
                socketRef.current.on('allUsers', users => {
                    console.log("gathering all users", users);
                    const peers = [];
                    users.forEach(userId => {
                        const peer = createPeer(userId, socketRef.current.id, stream);
                        peersRef.current.push({
                            peerId: userId,
                            peer
                        });
                        peers.push(peer);
                    });
                    setPeers(peers);
                });

                socketRef.current.on("userJoin", payload => {
                    console.log("user joined", payload);
                    const peer = addPeer(payload.signal, payload.callerId, stream);
                    peersRef.current.push({
                        peerId: payload.callerId,
                        peer
                    });
    
                    setPeers(users => [...users, peer]);
                });
    
                socketRef.current.on('receivingReturnedSignal', payload => {
                    console.log("received return signal", payload);
                    const item = peersRef.current.find(p => p.peerId === payload.id);
                    item.peer.signal.on(payload.signal);
                });
            });
        }
    }, [props.active]);

    function createPeer(userToSignal, callerId, stream) {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream,
        });

        peer.on("signal", signal => {
            socketRef.current.emit("sendSignal", { userToSignal, callerId, signal });
        });

        return peer;
    }

    function addPeer(incomingSignal, callerId, stream) {
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream
        });

        peer.on("signal", signal => {
            socketRef.current.emit('returningSignal', { signal, callerId });
        });

        peer.signal(incomingSignal);

        return peer;
    }

    return (
        <div className='videoCall'>
            <div className='videoContainer'>
                <video muted ref={userVideo} autoPlay playsInline />
                {props.active && peers.map((peer, index) => {
                    return (
                        <Video key={index} peer={peer} />
                    )
                })}
            </div>
            <div className='videoControls'>
                <button
                    className='secondary-stroke'
                    disabled={props.active}
                    onClick={triggerJoinMeeting}>
                    Join Meeting
                </button>
            </div>
        </div>
    )
}

const Video = (props) => {
    const ref = useRef();

    useEffect(() => {
        props.peer.on("stream", stream => {
            ref.current.srcObject = stream;
        });
    }, []);

    return (
        <video playsInline autoPlay ref={ref} />
    )
}

const videoConstraints = {
    height: window.innerHeight / 2,
    width: window.innerWidth / 2
};