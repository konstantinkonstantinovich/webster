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
          <>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous"/>
            <div className="center">
                <form onSubmit={submit}>
                    <h2>Log in to your account</h2>
                    <br/>
                    <input placeholder="E-mail" required type='text'
                        name="email" className="form-control"
                    />
                    <br/>
                    <input placeholder="Password" type="password" required
                        name="password" className="form-control"
                    />
                    <br/>
                    <div className="center">
                        <button className="btn btn-primary btn-width" type="submit">Submit</button>
                    </div>
                </form>
            </div>
          </>
       );
    }
};
