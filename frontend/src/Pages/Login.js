import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import app from '../Utils/firebase';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import '../CSS/pages.css';
import '../CSS/responsive.css';
import { Select, countryCode } from '../Components/Select';

const auth = getAuth(app);
let i = 0;
let cc = "";
let phoneNumber;


function Login() {
    const [num, setNum] = useState('');

    const [showVerify, setShowVerify] = useState(true);

    const Navigate = useNavigate();

    const styles = {
        otpField: {
            border: '1px solid #ccc',
            boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
            padding: '5px',
            textAlign: 'center',
            width: '50px',
            height: '50px',
            margin: '5px'
        }
    };

    const [otp, setOtp] = useState(new Array(6).fill(""));

    const handleOtpField = (element, index) => {
        if (isNaN(element.value)) return false;

        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

        //Focus next input
        if (element.nextSibling) {
            element.nextSibling.focus();
        }
    };

    function handleChange(e) {
        setNum(e.target.value);
    }

    function handlePhoneNo(e) {
        e.preventDefault();
        //bug in init
        if (num) {
            onOtpSend();
        }
        else {
            alert("Please Enter Valid Number!");
        }
    }

    function reCaptchaVerifier() {

        window.recaptchaVerifier = new RecaptchaVerifier('recaptchaContainer', {
            'size': 'invisible',
            'callback': (response) => {
                console.log("You are inside the recaptcha verifiier");
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                // onOtpSend();
            }
        }, auth);
    }

    function onOtpSend() {
        reCaptchaVerifier();
        while (countryCode.charAt(i) !== " ") {
            cc += countryCode.charAt(i);
            i++;
        }
        phoneNumber = cc + num;
        const appVerifier = window.recaptchaVerifier;

        signInWithPhoneNumber(auth, phoneNumber, appVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                setShowVerify(false);
            }) //sms sent & change ui
            .catch((error) => {
                // Error; SMS not sent
            });
    }

    function onConfirm() {
        let enteredOtp = otp.join("");
        const code = enteredOtp;
        window.confirmationResult.confirm(code).then((result) => {
            // User signed in successfully.
            // const user = result.user;
            alert('Verification Done');
            const mobileNumber = {
                phoneNumber: cc + num
            };
            axios.post('http://localhost:5000/', mobileNumber)
                .then((response) => {
                    localStorage.setItem("token", response.data.token);
                    //Toast
                    Navigate('/profile');
                })
                .catch((err) => {
                    console.log(err);
                });
            // ...
        }).catch((error) => {
            alert('Invalid Otp');
            setShowVerify(true);
            // User couldn't sign in (bad verification code?)
            // ...
        });
    }
    return (
        <div className="wrapper">
            <div id="recaptchaContainer"></div>
            <div className="row Welcome">
                <div className="intro">
                    <div className="d-flex flex-column  justify-content-center gradient-custom-2 h-100">

                        <div className="text-white px-3 py-4 p-md-5">
                            <h4 class="mb-4">We are more than just a company</h4>
                            <p class="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </p>
                        </div>

                    </div>

                </div>
                <div className="login">
                    <div className="text-center">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                            style={{ width: '185px' }} alt="logo" />
                        <h4 className="mt-1 mb-5 pb-1">Welcome to chatVBT</h4>
                    </div>
                    {showVerify ? (
                        <div className="verify">
                            <div className="column">
                                <Select />
                            </div>
                            <input id='form1' type='number'
                                name='mobno' onChange={handleChange}
                                placeholder='Enter Mobile No..'
                            />
                            <div className='btn-container'>
                                <button type='submit' onClick={handlePhoneNo} >Send Otp</button>
                            </div>
                        </div>
                    )
                        :
                        (
                            <div className="row">
                                <div className="col text-center">
                                    {otp.map((data, index) => {
                                        return (
                                            <input
                                                className="otp-field"
                                                type="text"
                                                name="otp"
                                                maxLength="1"
                                                key={index}
                                                value={data}
                                                style={styles.otpField}
                                                onChange={e => handleOtpField(e.target, index)}
                                                onFocus={e => e.target.select()}
                                            />
                                        );
                                    })}
                                    <div className='btn-container'>
                                        <button
                                            className="btn btn-secondary mr-2"
                                            onClick={e => setOtp([...otp.map(v => "")])}
                                        >Clear
                                        </button>
                                        <button
                                            className="btn btn-primary"
                                            onClick={onConfirm}
                                        >Verify OTP</button>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
};
export default Login;