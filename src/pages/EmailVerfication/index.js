import React, { useState } from 'react'
import avatar from "./../img/avatar.svg"
import illustration from "./../img/illustration.svg"
import { useNavigate } from "react-router-dom"
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, onAuthStateChanged } from "firebase/auth";
import { auth } from '../../config/firebase';

const EmailVerfication = () => {

  const [emailtext, setemailtext] = useState("")
  const [user, setuser] = useState("")
  const navigate = useNavigate()
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setuser(user)
      if (user.emailVerified) {
        navigate("/")
      } else {
        setemailtext(user.email)
      }
    } else {
      navigate("/Login")
    }
  })
  return (
    <div className='signup-div'>
      <main>
        <div class="login-container ">
          <img src={avatar} alt="" class="img-avatar" />
          <h1 class="title">Email Verification</h1>

          <h3 className='title'>{ emailtext}</h3>

        </div>
      </main >
      <section class="illustration-container">
        <img src={illustration} />
        <div class="circle"> </div>
      </section>
    </div >
  )
}

export default EmailVerfication