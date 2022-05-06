import React from "react";
import "./Authenticate.css";
import Container from "@mui/material/Container";
import Navigation from "../../Components/Navigation/Navigation";
import logo from '../../assets/images/SVG/Logo_A.svg';
import { Login } from "./Login/Login";
import { Register } from "./Register/Register";
import { useNavigate } from "react-router-dom";

export const Authenticate = (props) => {
    let nav = useNavigate();
    let title = props.register ? 'Register' : 'Login';
    let toggle = props.register ? 'Login' : 'Register';
    let component = props.register ? <Register /> : <Login />;

    let toggleInstance = () => {
        nav(`/${toggle}`, { replace: true });
    }
    
    const showNewUserMessage = () => {
        let isNewUser = !!new URLSearchParams(window.location.search).get('newuser');
        if (isNewUser)
            return <p>You succesfully created your account. Please log in to continue.</p>
    }

    return (
        <>
            <Navigation logo />
            <Container className='authenticate' fixed>
                <div>
                    <img alt="Logo" src={logo} width="400px" height='500px' />
                    <div>
                        { showNewUserMessage() }
                        <h1>{title}</h1>
                        <hr />
                        {component}
                        <button onClick={toggleInstance} className='primary-stroke'>{toggle}</button>
                    </div>
                </div>
            </Container>
        </>
    );
}

export default Authenticate;
