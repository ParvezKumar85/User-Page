import React, { useState, } from 'react'
import avatar from "./../img/avatar.svg"
import illustration from "./../img/illustration.svg"
import { useNavigate } from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import "./signup.css"
import app from '../../config/firebase';
import { db, auth } from '../../config/firebase';
const Signup = () => {
    const navigate = useNavigate()
    const [fullname, setfullname] = useState("")
    const [Mobileno, setMobileno] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [repassword, setrepassword] = useState("")
    const [message, setmessage] = useState("")
    const [messagetype, setmessagetype] = useState("")
    var regex = /^[\w\-\.\+]+\@[a-zA-Z0-9\. \-]+\.[a-zA-z0-9]{2,4}$/;

    var match = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

    const handleSubmit = (event) => {
        event.preventDefault();

        if (fullname === "") {
            setmessage("Frist Name Required!")
            setmessagetype("error")
            setTimeout(() => {
                setmessagetype("")
            }, 2000);
        }
        else if (Mobileno === "") {
            setmessage("Mobile Number Required!")
            setmessagetype("error")
            setTimeout(() => {
                setmessagetype("")
            }, 2000);
        } else if (Mobileno.length < 11) {
            setmessage("Please Enter 11 digit Mobile No.")
            setmessagetype("error")
            setTimeout(() => {
                setmessagetype("")
            }, 2000);
        }
        else if (email === "") {
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
        }
        else if (repassword === "") {
            setmessage("Confirm Password Required!")
            setmessagetype("error")
            setTimeout(() => {
                setmessagetype("")
            }, 2000);
        }
        else if (password !== repassword) {
            setmessage("Confirm Password do not match")
            setmessagetype("error")
            setTimeout(() => {
                setmessagetype("")
            }, 2000);
        }
        else {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    console.log(auth.currentUser)
                    sendEmailVerification(auth.currentUser)
                        .then((res) => {
                            const docData = {
                                FullName: fullname,
                                Mobilenumber: Mobileno,
                                Email: email,
                                Password: password,
                                uid: userCredential.user.uid,
                                stats: "Pending",
                                Profile: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR30SfNCE6e-sM7qSa8Z9CwrktkRgrjbHKyeSh3VyZDrsXLDVW0uHVcjmeki6bBSwQnqWo&usqp=CAU"
                            };
                            console.log(userCredential)
                            setDoc(doc(db, "users", userCredential.user.uid), docData).then(() => {
                                navigate("/EmailVerfication")
                            })
                            setmessage("success")
                            setmessagetype("success")
                        });
                })
        }
    };


    return (
        <div className='signup-div'>
            <main>
                <div class="login-container">
                    <img src={avatar} alt="" class="img-avatar" />
                    <h1 class="title">Sign Up</h1>

                    <form onSubmit={handleSubmit}>
                        <div class="input-box">
                            <input type="text" class="input" placeholder="Full Name" value={fullname} onChange={(e) => setfullname(e.target.value)} />
                            <i class='bx bxs-user-circle bx-sm'></i>
                        </div>

                        <div class="input-box">
                            <input type="text" class="input" placeholder="Mobile Number" value={Mobileno} onChange={(e) => setMobileno(e.target.value)} />
                            <i class='bx bxs-phone bx-sm'></i>
                        </div>

                        <div class="input-box">
                            <input type="text" class="input" placeholder="Email Address" value={email} onChange={(e) => setemail(e.target.value)} />
                            {/* <i class="fa-solid fa-envelope"></i> */}
                            <i class='bx bxs-envelope bx-sm'></i>
                        </div>

                        <div class="input-box">
                            <input type="password" class="input" placeholder="Password" value={password} onChange={(e) => setpassword(e.target.value)} />
                            <i class='bx bxs-lock-alt bx-sm'></i>
                        </div>

                        <div class="input-box">
                            <input type="password" class="input" placeholder="Re Password" value={repassword} onChange={(e) => setrepassword(e.target.value)} />
                            <i class='bx bxs-lock-alt bx-sm'></i>
                        </div>

                        <a href="#" class="forgot-password mb-2" onClick={() => navigate("/Login")}>Sign in</a>
                        {messagetype !== "" && <div className='alert-div'>
                            <div class={messagetype === "error" ? "alert alert-danger" : "alert alert-success"} role="alert">
                                {message}
                            </div>
                        </div>}
                        <input type="submit" class="btn" value="Sign Up" />
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

export default Signup