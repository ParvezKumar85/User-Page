import React, { useState, } from 'react'
import avatar from "./../img/avatar.svg"
import illustration from "./../img/illustration.svg"
import { useNavigate } from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import app from '../../config/firebase';
import { db, auth } from '../../config/firebase';

const ForgotPassword = () => {
    const navigate = useNavigate()
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [message, setmessage] = useState("")
    const [messagetype, setmessagetype] = useState("")
    var regex = /^[\w\-\.\+]+\@[a-zA-Z0-9\. \-]+\.[a-zA-z0-9]{2,4}$/;

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    return (
        <div className='signup-div'>
            <main>
                <div class="login-container">
                    <img src={avatar} alt="" class="img-avatar" />
                    <h1 class="title">Forgot Password</h1>

                    <form onSubmit={handleSubmit}>
                        <div class="input-box">
                            <input type="text" class="input" placeholder="Email Address" value={email} onChange={(e) => setemail(e.target.value)} />
                            <i class='bx bxs-envelope bx-sm'></i>
                        </div>

                        <div className='link-div'>
                            <a onClick={() => navigate("/Login")}>Sign in</a>
                        </div>
                        {messagetype !== "" && <div className='alert-div'>
                            <div class={messagetype === "error" ? "alert alert-danger" : "alert alert-success"} role="alert">
                                {message}
                            </div>
                        </div>}
                        <input type="submit" class="btn" value="Forgot Password" />
                    </form>
                </div>
            </main >
            <section class="illustration-container">
                <img src={illustration} />
                <div class="circle"> </div>
            </section>
        </div >)
}

export default ForgotPassword