import { NavLink } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

import './login.css';

export default () => {
    const submit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        axios
            .post('/auth/login', { email, password })
            .then(({ data }) => {
                console.log(data);
                Cookies.set('token', data.access_token, { expires: 1 });
                window.location.replace('/');
            })
            .catch((error) => {
                if (error.response) {
                    const err = error.response.data;

                    Object.keys(err).forEach(function(key) {
                        if (err[key] != 'Unauthorized') {
                            alert(err[key])
                        }
                    })
                }
            });
    };

    return (
        <div className="center padding-in-block">
            <form onSubmit={submit}>
                <h2>Log in to your account</h2>
                <br />
                <input
                    placeholder="E-mail"
                    required
                    type="text"
                    name="email"
                    className="form-control"
                />
                <br />
                <input
                    placeholder="Password"
                    type="password"
                    required
                    name="password"
                    className="form-control"
                />
                <br />
                <div className="center">
                    <button className="btn btn-primary btn-width" type="submit">
                        Sign in
                    </button>
                </div>
                <br />

                <p className="text-center me-2"><NavLink to="/forgot">Reset Password</NavLink></p>
                <p className="text-center me-2">New to Webster? <NavLink to="/forgot">Sign up</NavLink></p>
            </form>
        </div>
    );
};
