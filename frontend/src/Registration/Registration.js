import Cookies from 'js-cookie'
import { isExpired, decodeToken } from "react-jwt";
import { Redirect, useHistory } from 'react-router-dom';

const axios = require('axios').default;

export default function Registration(props) {
    const token = Cookies.get('token');
    const decodedToken = decodeToken(token);
    const isMyTokenExpired = isExpired(token);
    let history = useHistory();

    const submit = (e) => {
        e.preventDefault();
        const login = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const password_confirmation = e.target.password.value;

        axios.post('auth/registration', {login, email, password, password_confirmation}).then(function (response) {
            Cookies.set('token', response.data.access_token, { expires: 1 })
            props.setToken(response.data.access_token)
            history.push('/');
        }).catch(function (error) {
            console.log(error);
        });
    }

    if (!isMyTokenExpired && decodedToken) {
        return <Redirect to='/'/>;
    } else {
        return (<div className="center">
            <form onSubmit={submit}>
                <h2>Register</h2>
                <input placeholder="Login" required type='text'
                    name="name"
                />
                <br/><br/>
                <input placeholder="E-mail" required type='text'
                    name="email"
                />
                <br/><br/>
                <input placeholder="Password" type="password" required
                    name="password"
                />
                <br/><br/>
                <input placeholder="Confirm password" type="password" required
                    name="password_confirmation"
                />
                <br/><br/>
                <div className="center">
                    <button type="submit">Register</button>
                </div>
            </form>
        </div>);
    }
};