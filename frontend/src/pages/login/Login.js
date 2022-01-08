import React, { useRef, useContext } from 'react'
import './Login.css'
import { loginCall } from '../../apiCalls'
import { AuthContext } from '../../context/AuthContext'
import { CircularProgress } from '@material-ui/core'
import { Link } from 'react-router-dom'

const Login = () => {

    const email = useRef()
    const password = useRef()

    const { isFetching, dispatch } = useContext(AuthContext)

    const handleSubmit = (e) => {
        e.preventDefault()
        loginCall({ email: email.current.value, password: password.current.value }, dispatch)
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
                        <input placeholder="john.doe@mail.com" type="email" required className="loginInput" ref={email} />
                        <input placeholder="password" required minLength="6" type="password" className="loginInput" ref={password} />
                        <button className="loginButton" type="submit" disabled={isFetching}>{isFetching ? <CircularProgress size="20px" color="inherit" /> : "Log In" }</button>
                        <span className="loginForgot">Forgot Password?</span>
                        <Link className="goToRegister" to="/register">
                            <button className="loginRegisterButton">{isFetching ? <CircularProgress size="20px" color="inherit" /> : "Create a New Account" }</button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
