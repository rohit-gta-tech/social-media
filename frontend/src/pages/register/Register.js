import React, { useRef } from 'react'
import './Register.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router'

const Register = () => {

    const username = useRef()
    const email = useRef()
    const password = useRef()
    const confirmPassword = useRef()
    const navigate = useNavigate()

     const handleSubmit = async (e) => {
         e.preventDefault()
         if(password.current.value !== confirmPassword.current.value) {
             password.current.setCustomValidity("Passwords don't match!!")
         } else {
             const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value
             }
             try {
                await axios.post("/auth/register", user)
                navigate("/login")
             } catch (error) {
                 console.log(error)
             }  
         }
     }

    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Social App</h3>
                    <span className="loginDesc">Connect with Friends and the world around you on Social App</span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleSubmit}>
                        <input placeholder="john.doe@mail.com" required type="email" className="loginInput" ref={email} />
                        <input placeholder="Enter username" required type="text" className="loginInput" ref={username} />
                        <input placeholder="password" required minLength="6" type="password" className="loginInput" ref={password} />
                        <input placeholder="confirm password" required minLength="6" type="password" className="loginInput" ref={confirmPassword} />
                        <button className="loginButton" type="submit">Sign Up</button>
                        <Link className="goToRegister" to="/login">
                            <button className="loginRegisterButton">Log Into Account</button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register
