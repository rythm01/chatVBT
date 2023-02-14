import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import app from './firebase';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const auth = getAuth(app);

function Login() {
    const [num, setNum] = useState('');

    const Navigate = useNavigate();

    function handleChange(e) {
        setNum(e.target.value);
    }

    function handleClick(e) {
        e.preventDefault();
        if (num) {
            const mobileNumber = {
                mobNo: num
            };
            axios.post('http://localhost:5000/', mobileNumber)
                .then(() => {
                    onSignInSubmit();
                    // Navigate('/otp');
                });
        }
        else {
            alert("INvlaid")
        }
    }

    function reCaptchaVerifier() {

        window.recaptchaVerifier = new RecaptchaVerifier('recaptchaContainer', {
            'size': 'invisible',
            'callback': (response) => {
                console.log("You are inside the recaptcha verifiier");
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                onSignInSubmit();
            }
        }, auth);
    }

    function onSignInSubmit() {
        reCaptchaVerifier();
        const phoneNumber = '+91' + num;
        const appVerifier = window.recaptchaVerifier;

        signInWithPhoneNumber(auth, phoneNumber, appVerifier)
            .then((confirmationResult) => {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                const code = prompt("Enter the otp");
                window.confirmationResult = confirmationResult;
                // alert("Otp sended");
                console.log(confirmationResult);
                window.confirmationResult.confirm(code).then((result) => {
                    // User signed in successfully.
                    const user = result.user;
                    console.log(user);
                    alert('Verification Done');
                    Navigate('/otp');
                    // ...
                }).catch((error) => {
                    alert('Invalid Otp');
                    // User couldn't sign in (bad verification code?)
                    // ...
                });
                // ...
            }).catch((error) => {
                // Error; SMS not sent
                // ...
            });
    }

    return (
        <div>
            <h1>Hello</h1>
            <div id="recaptchaContainer"></div>
            <div className="container">
                <label htmlFor="mobno">Enter your mobile no</label>
                <input type="number" name='mobno' onChange={handleChange} />
                <button type='submit' onClick={handleClick}>Proceed</button>
            </div>
        </div>
    );
};

export default Login;
