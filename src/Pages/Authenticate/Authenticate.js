import React from "react";
import "./Authenticate.css";
import Container from "@mui/material/Container";
import Navigation from "../../Components/Navigation/Navigation";
import logo from '../../assets/images/SVG/Logo_A.svg';
import { Login } from "../../Components/Login/Login";
import { Register } from "../../Components/Register/Register";
import { useNavigate } from "react-router-dom";

export const Authenticate = (props) => {
    let nav = useNavigate();
    let title = props.register ? 'Register' : 'Login';
    let toggle = props.register ? 'Login' : 'Register';
    let component = props.register ? <Register /> : <Login />;

    let toggleInstance = () => {
        nav(`/${toggle}`, { replace: true });
    }

    return (
        <>
            <Navigation logo />
            <Container className='authenticate' fixed>
                <div>
                    <img alt="Logo" src={logo} width="400px" height='500px' />
                    <div>
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
