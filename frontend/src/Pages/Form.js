import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/form.css";
import avatar from "../Images/user.jpeg";
import { Toaster } from "react-hot-toast";
import { useFormik } from 'formik';
import convertToBase64 from "../helper/convert";

export default function Form() {

    const Navigate = useNavigate();
    const [file, setFile] = useState();
    const onUpload = async (e) => {
        const base64 = await convertToBase64(e.target.files[0]);
        setFile(base64);
    }
    const formik = useFormik({
        initialValues: {
            username: "local-123",
            description: "Hey There I'm Using ChatVBT"
        },
        onSubmit: async values => {
            values = await Object.assign(values, { profile: file || "" });
            console.log(values); // store values inside mongoDB;
            alert("Data has been submmited successfully");
            Navigate('/ChatPage');
        }
    });
    return (
        <div className="back">
            <Toaster position="top-center" reverseOrder="false" />
            <form onSubmit={formik.handleSubmit}>
                <div className="div-center">
                    <div className="content">
                        <h3 className="heading text-center">Register</h3>
                        <p>----------------------------------------------------</p>
                        <label htmlFor="profile">
                            <img className="profile_img_register" src={file || avatar} alt="avatar" />
                        </label>
                        <input onChange={onUpload} type="file" id="profile" name="profile" />
                        <p>----------------------------------------------------</p>
                        <div className="form-group">
                            <input {...formik.getFieldProps('username')} type="text" className="form-control" id="username" required placeholder="Username" />
                            <textarea {...formik.getFieldProps('description')} type="text" id="01" cols="30" rows="3" placeholder="Enter something..."></textarea>
                        </div>
                        <div className="btn-container">
                            <button type="submit">Lets-Go!</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}