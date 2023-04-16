import React, { useState, } from 'react'
import avatar from "./../img/avatar.svg"
import illustration from "./../img/illustration.svg"
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword ,sendEmailVerification} from "firebase/auth";
import { auth } from '../../config/firebase';
import "./style.css"
const Login = () => {

    const navigate = useNavigate()
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [message, setmessage] = useState("")
    const [messagetype, setmessagetype] = useState("")
    var regex = /^[\w\-\.\+]+\@[a-zA-Z0-9\. \-]+\.[a-zA-z0-9]{2,4}$/;

    var match = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

    const handleSubmit = (event) => {
        event.preventDefault();
        if (email === "") {
            setmessage("Email Address Required!")
            setmessagetype("error")
            setTimeout(() => {
                setmessagetype("")
            }, 2000);
        }
        else if (!email.match(regex)) {
            setmessage("Please Enter Valid Email Address")
            setmessagetype("error")
            setTimeout(() => {
                setmessagetype("")
            }, 2000);
        }
        else if (password === "") {
            setmessage("Password Required!")
            setmessagetype("error")
            setTimeout(() => {
                setmessagetype("")
            }, 2000);
        }
        else if (!password.match(match)) {
            setmessage("Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character")
            setmessagetype("error")
            setTimeout(() => {
                setmessagetype("")
            }, 2000);
        } else {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    if (userCredential.user.emailVerified === false) {
                        sendEmailVerification(userCredential.user)
                        navigate("/EmailVerfication")
                    }
                    setmessage("Success")
                    setmessagetype("Success")
                    setTimeout(() => {
                        setmessagetype("")
                    navigate("/")

                    }, 2000);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setmessage(errorMessage)
                    setmessagetype("error")
                    setTimeout(() => {
                        setmessagetype("")
                    }, 2000);
                });
        }
    };



    return (
        <div className='signup-div'>
            <main>
                <div class="login-container">
                    <img src={avatar} alt="" class="img-avatar" />
                    <h1 class="title">Sign in</h1>

                    <form onSubmit={handleSubmit}>
                        <div class="input-box">
                            <input type="text" class="input" placeholder="Email Address" value={email} onChange={(e) => setemail(e.target.value)} />
                            <i class='bx bxs-envelope bx-sm'></i>
                        </div>

                        <div class="input-box">
                            <input type="password" class="input" placeholder="Password" value={password} onChange={(e) => setpassword(e.target.value)} />
                            <i class='bx bxs-lock-alt bx-sm'></i>
                        </div>
                        <div className='link-div'>
                            <a href="#" class="forgot-password" onClick={() => navigate("/ForgotPassword")}>Forgot Password?</a>
                            <a href="#" onClick={() => navigate("/Signup")}>Sign Up</a>
                        </div>
                        {messagetype !== "" && <div className='alert-div'>
                            <div class={messagetype === "error" ? "alert alert-danger" : "alert alert-success"} role="alert">
                                {message}
                            </div>
                        </div>}
                        <input type="submit" class="btn" value="Sign in" />
                    </form>
                </div>
            </main >
            <section class="illustration-container">
                <img src={illustration} />
                <div class="circle"> </div>
            </section>
        </div >
    )
}

export default Login




