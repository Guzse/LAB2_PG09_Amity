import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../../api/AuthService';
import { Regex } from '../../Global/Regex';
import './Register.css';
import $ from 'jquery';

export const Register = () => {
    const [input, setInput] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');
    const authService = new AuthService();



    const handleSubmit = (e) => {
        e.preventDefault();
        let valid = validateInput();
        if (valid)
            authService.SignUp(input.username, input.password, input.password)
                .then((err, res) => {
                    console.log({ err, res });
                });

    }

    const handleChange = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        setInput(prev => ({
            ...prev,
            [key]: value
        }));
    }

    const validateInput = () => {
        const elEmail = $('input[name="email"]')[0];
        const elPasswordConfirm = $('input[name="confirmPassword"]')[0];

        if (!Regex.email.test(input.email)) {
            setError(prev => 'Please enter a valid email address.');
            elEmail.setCustomValidity(error);
            return false;
        }
        if (input.password !== input.confirmPassword) {
            debugger;
            setError(prev => 'Passwords must match.');
            elPasswordConfirm.setCustomValidity(error);
            return false;
        }
        setError(prev => '');
        elEmail.setCustomValidity('');
        elPasswordConfirm.setCustomValidity('');
        return true;
    }

    return (
        <form onSubmit={handleSubmit} className='formRegister'>
            <div className="labelInputContainer">
                <label>Username </label>
                <input
                    placeholder="John Doe"
                    type="text"
                    name="username"
                    onChange={handleChange}
                    required />
            </div>

            <div className="labelInputContainer">
                <label>Email</label>
                <input
                    placeholder="user@email.com"
                    type="text"
                    name="email"
                    onChange={handleChange}
                    required />
            </div>

            <div className="labelInputContainer">
                <label>Password </label>
                <input
                    placeholder='&#9679;&#9679;&#9679;&#9679;&#9679;'
                    type="password"
                    name="password"
                    onChange={handleChange}
                    required />
            </div>

            <div className="labelInputContainer">
                <label>Confirm password</label>
                <input
                    placeholder='&#9679;&#9679;&#9679;&#9679;&#9679;'
                    type="password"
                    name="confirmPassword"
                    onChange={handleChange}
                    required />
            </div>
            <div className='checkboxContainer'>
                <input type="checkbox" name="termsService" required />
                <label>I have read the <Link to="/service">Terms of Service</Link></label>
            </div>
            <div className='error'>{error}</div>
            <button type='submit' className='primary'>Register</button>
        </form>
    )
}
