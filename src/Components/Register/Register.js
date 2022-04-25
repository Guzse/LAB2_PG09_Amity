import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../../api/AuthService';
import { Regex } from '../../Global/Regex';
import './Register.css';

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
        authService.SignUp(e);
    }

    const handleChange = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        setInput(prev => ({
            ...prev,
            [key]: value
        }));
        validateInput(e);
    }

    const validateInput = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        setError(prev => {
            switch (key) {
                case "email":
                    if (!Regex.email.test(value))
                        setError(prev => 'Please enter a valid email address.');
                    else setError(prev => '');
                    break;
                case "confirmPassword":
                    if (input.password && input.password != value)
                        setError(prev => 'Passwords must match.');
                    break;
            }
        });
        console.log(error);
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
                    onBlur={validateInput}
                    required />
            </div>

            <div className="labelInputContainer">
                <label>Email</label>
                <input
                    placeholder="user@email.com"
                    type="text"
                    name="email"
                    onChange={handleChange}
                    onBlur={validateInput}
                    required />
            </div>

            <div className="labelInputContainer">
                <label>Password </label>
                <input
                    placeholder='&#9679;&#9679;&#9679;&#9679;&#9679;'
                    type="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={validateInput}
                    required />
            </div>

            <div className="labelInputContainer">
                <label>Confirm password</label>
                <input
                    placeholder='&#9679;&#9679;&#9679;&#9679;&#9679;'
                    type="password"
                    name="passwordConfirm"
                    onChange={handleChange}
                    onBlur={validateInput}
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
