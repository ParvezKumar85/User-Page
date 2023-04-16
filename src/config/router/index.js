import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Approval, BlogDetails, CreatePost, EmailVerfication, ForgotPassword, Home, Login, Profile, Signup } from '../../pages'


const RouterNavigate = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/Profile' element={<Profile />} />
                <Route path='/CreatePost' element={<CreatePost />} />
                <Route path='/Login' element={<Login />} />
                <Route path='/Signup' element={<Signup />} />
                <Route path='/EmailVerfication' element={<EmailVerfication />} />
                <Route path='/Approval' element={<Approval />} />
                <Route path='/ForgotPassword' element={<ForgotPassword />} />
                <Route path='/Post-Details/:id' element={<BlogDetails/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default RouterNavigate