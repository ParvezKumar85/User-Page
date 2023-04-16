import React, { useEffect, useState } from 'react'
import "./index.css"
import { useNavigate } from 'react-router-dom'
import { auth } from '../../config/firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'


const Navbar = (props) => {
    const navigate = useNavigate()
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <div className='col-7 logoname' onClick={() => navigate("/")}>
                        <h2 className="navbar-brand">User Admin</h2>
                    </div>
                    <button className="navbar-toggler " type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav  me-auto mb-2 mb-lg-0">
                            <li className="nav-item" onClick={() => navigate("/")}>
                                <a className={props.Home ? "active nav-link" : "nav-link"}>Home</a>
                            </li>

                            <li className="nav-item" onClick={() => navigate("/CreatePost")}>
                                <a className={props.CreatePost ? "active nav-link" : "nav-link"}>Create Post</a>
                            </li>

                            <li className="nav-item" onClick={() => navigate("/Profile")}>
                                <a className={props.Profile ? "active nav-link" : "nav-link"}>Profile</a>
                            </li>



                            <li className="nav-item pl-0 " onClick={()=>navigate("/Login")}>
                                <a className="nav-link" >Logout</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>


    )
}

export default Navbar