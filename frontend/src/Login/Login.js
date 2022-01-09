import { NavLink, useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

import './login.css';

export default () => {
    const history = useHistory();

    const submit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        axios
            .post('/auth/login', { email, password })
            .then(({ data }) => {
                console.log(data);
                Cookies.set('token', data.access_token, { expires: 1 });
                setTimeout(() => history.push('/'), 300);
            })
            .catch((error) => console.error(error));
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
                <div>
                    <NavLink to="/forgot">Forgot password?</NavLink>
                </div>
                <div className="center text-block">
                    <span className="me-2">New to Webster?</span>
                    <span>
                        <NavLink to="/register">Sign up</NavLink>
                    </span>
                </div>
            </form>
        </div>
    );
};
