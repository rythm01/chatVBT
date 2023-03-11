import React from "react";
import { useNavigate } from 'react-router-dom';

export default function ChatPage() {
    const Navigate = useNavigate();
    function handleSignout() {
        // Remove the user's ID and access token
        localStorage.removeItem('userId');
        localStorage.removeItem('accessToken');
        Navigate('/');
    }
    return (
     <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',height:'100vh'}}>
     <div className="text-center">Welcome To ChatVBT</div>
     <button style={{margin:'5px'}} type='submit' onClick={handleSignout}>SignOut</button>
     </div>
    )
};