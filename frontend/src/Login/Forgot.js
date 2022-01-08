import Cookies from 'js-cookie'
import { isExpired, decodeToken } from "react-jwt";
import { Redirect, useHistory } from 'react-router-dom';
import './login.css'

const axios = require('axios').default;

export default function Login(props) {
    const token = Cookies.get('token');
    const decodedToken = decodeToken(token);
    const isMyTokenExpired = isExpired(token);
    let history = useHistory();

    const submit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;

        axios.post('user/forgot_password', {email}).then(function (response) {
            console.log(response);
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
          <>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous"/>
            <div className="center padding-in-block">
                <form onSubmit={submit}>
                    <h3>We will send a password reset link to this email</h3>
                    <br/>
                    <input placeholder="E-mail" required type='text'
                        name="email" className="form-control"
                    />
                    <br/>
                    <div className="center">
                        <button className="btn btn-primary btn-width" type="submit">Reset password</button>
                    </div>
                    <br/>
                    <div className="center text-block">
                      <span className="me-2">New to Webster?</span>
                      <span><a href="/register">Sign up</a></span>
                    </div>
                </form>
            </div>
          </>
       );
    }
};
