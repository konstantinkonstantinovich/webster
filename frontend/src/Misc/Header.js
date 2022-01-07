import Cookies from "js-cookie";
import { useEffect, useState } from "react";
const axios = require('axios').default;

export default function Header(props) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios.get('auth/user').then(function (response) {
            setUser(response.data.user);
        }).catch(function (error) {
            return; // not logged in
        });
    }, [props.token]);

    const logout = () => {
        axios.get('auth/logout').then(function (response) {
            setUser(null);
            props.setToken(null);
            Cookies.remove('token');
            window.location.href = "/"
        }).catch(function (error) {
            console.log(error);
        });
    }

    const goHome = () => {
        window.location.href = "/"
    }

    if (user) {
        return (
        <header>
            <h1 onClick={goHome} className='pointer'>Webster</h1>
            <span>Welcome, {user.login} <b onClick={logout} className="pointer">Logout</b></span>
        </header>)
    } else {
        return (
        <header>
            <h1 onClick={goHome} className='pointer'>Webster</h1>
            <span><a href="/login">Login</a> or <a href="/register">Register</a></span>
        </header>)
    }
};