import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/form.css";
import avatar from "../Images/user.jpeg";
import { useFormik } from 'formik';
import convertToBase64 from "../helper/convert";
import toast, { Toaster } from "react-hot-toast";
// import { usernameValidate } from "../helper/Validate";
import instance from "../Utils/axios";

export default function Profile() {

    const Navigate = useNavigate();
    const [file,setFile] = useState();
    
    const onUpload = async (e) =>{
        const base64 = await convertToBase64(e.target.files[0]);
        setFile(base64);
    }
    const formik = useFormik({
        initialValues: {
            username: "",
            description: ""
        },
        // validate : usernameValidate,
        onSubmit: async values => {
            values = await Object.assign(values, { profile: file || "" });
            console.log(values); // store values inside mongoDB;
            // alert("Data has been submmited successfully");
            instance.post('/profile', {
                name: values.username,
                description: values.description,
                profilePhoto: values.profile
            }, { headers: { Authorization: localStorage.getItem('token')}});
            toast.success("Data has been submitted successfully");
            setTimeout(() => {
                 Navigate('/Chat');
            }, 3000);
        }
    });
    return (
        <div className="back">
            <Toaster position="top-center"></Toaster>
            <form onSubmit={formik.handleSubmit}>
                <div className="div-center">
                    <div className="content">
                        <h3 className="heading text-center">Register</h3>
                        <label htmlFor="profile">
                            <img className="profile_img_register" src={file || avatar} alt="avatar" />
                        </label>
                        <input onChange={onUpload} type="file" id="profile" name="profile"/>
                        <div className="form-group">
                        <input {...formik.getFieldProps('username')} type="text" className="form-control" id="username" placeholder="Username" />
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