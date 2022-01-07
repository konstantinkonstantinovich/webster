import Cookies from 'js-cookie'
import { isExpired, decodeToken } from "react-jwt";
import { Redirect, useHistory } from 'react-router-dom';

const axios = require('axios').default;

export default function Login(props) {
    const token = Cookies.get('token');
    const decodedToken = decodeToken(token);
    const isMyTokenExpired = isExpired(token);
    let history = useHistory();

    const submit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        axios.post('auth/login', {email, password}).then(function (response) {
            console.log(response);
            Cookies.set('token', response.data.access_token, { expires: 1 })
            props.setToken(response.data.access_token)
            history.push('/');
        }).catch(function (error) {
            if (error?.response?.data?.message) {
                console.log("fail");
            }
        });
    }

    if (!isMyTokenExpired && decodedToken) {
        return <Redirect to='/'/>;
    } else {
        return (
        <div className="center">
            <form onSubmit={submit}>
                <h2>Login</h2>
                <input placeholder="E-mail" required type='text'
                    name="email"
                />
                <br/><br/>
                <input placeholder="Password" type="password" required
                    name="password"
                />
                <br/><br/>
                <div className="center">
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>);
    }
};