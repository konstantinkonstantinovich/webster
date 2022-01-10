import { NavLink } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

import './registration.css';

export default () => {
    const submit = (e) => {
        e.preventDefault();
        const login = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const password_confirmation = e.target.password_confirmation.value;

        axios
            .post('/auth/registration', {
                login,
                email,
                password,
                password_confirmation,
            })
            .then(({ data }) => {
                Cookies.set('token', data.access_token, {
                    expires: 1,
                });
                window.location.replace('/');
            })
            .catch((error) => {
                if (error.response) {
                    const err = JSON.parse(error.response.data);

                    Object.keys(err).forEach(function(key) {
                        alert(err[key])
                    })
                }
            });
    };

    return (
        <div className="center padding-in-block">
            <form onSubmit={submit}>
                <h2>Get started with Webster</h2>
                <br />
                <input
                    placeholder="Login"
                    required
                    type="text"
                    name="name"
                    className="form-control"
                />
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
                <input
                    placeholder="Confirm password"
                    type="password"
                    required
                    name="password_confirmation"
                    className="form-control"
                />
                <br />
                <div className="center">
                    <button className="btn btn-primary btn-width" type="submit">
                        Sign up
                    </button>
                </div>
                <br />
                <p className="text-center me-2">Already signed up? <NavLink to="/login">Log in</NavLink></p>
            </form>
        </div>
    );
};
