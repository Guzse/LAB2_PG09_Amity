import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../../api/AuthService';
import { Regex } from '../../Global/Regex';
import './Register.css';
import $ from 'jquery';
import { LabelInput } from '../LabelInput/LabelInput';

export const Register = () => {
    const [input, setInput] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const authService = new AuthService();

    const handleSubmit = (e) => {
        e.preventDefault();
        let valid = validateInput();
        if (valid)
            authService.SignUp(input.username, input.password, input.email)
                .then((res) => {
                    if (res.status === 200)
                        navigate('/login?newuser=true');
                    res.json().then(res => {
                        setError(prev => res.message);
                        if (res.key) {
                            $(`input[name="${res.key}"]`)[0].setCustomValidity(res.message);
                        }

                    })
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
        const elUsername = $('input[name="username"]')[0];
        if (!Regex.email.test(input.email)) {
            setError(prev => 'Please enter a valid email address.');
            elEmail.setCustomValidity(error);
            return false;
        }
        if (input.password !== input.confirmPassword) {
            setError(prev => 'Passwords must match.');
            elPasswordConfirm.setCustomValidity(error);
            return false;
        }
        setError(prev => '');
        elEmail.setCustomValidity('');
        elPasswordConfirm.setCustomValidity('');
        elUsername.setCustomValidity('');
        return true;
    }

    return (
        <form onSubmit={handleSubmit} className='formRegister'>
            <LabelInput 
                label='Username' 
                placeholder="John Doe"
                name="username"
                onChange={handleChange}
                onBlur={validateInput}
                required />
                <LabelInput
                    label="Email"
                    placeholder="user@email.com"
                    name="email"
                    onChange={handleChange}
                    onBlur={validateInput}
                    required />
                <LabelInput
                    label='Password'
                    type="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={validateInput}
                    required />
                <LabelInput
                    label="Repeat Password"
                    type="password"
                    name="confirmPassword"
                    onChange={handleChange}
                    onBlur={validateInput}
                    required />
            <div className='checkboxContainer'>
                <input type="checkbox" name="termsService" required />
                <label>I have read the <Link to="/service">Terms of Service</Link></label>
            </div>
            <div className='error'>{error}</div>
            <button type='submit' className='primary'>Register</button>
        </form>
    )
}
