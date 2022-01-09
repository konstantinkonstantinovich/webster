import { NavLink, Redirect, useHistory } from 'react-router-dom';
import axios from 'axios';
import './login.css';

export default () => {
    const history = useHistory();

    const submit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;

        axios
            .post('/user/forgot_password', { email })
            .then(({ data }) => {
                console.log(data);
                history.push('/login');
            })
            .catch((error) => console.error(error));
    };

    return (
        <>
            <div className="center padding-in-block">
                <form onSubmit={submit}>
                    <h3>We will send a password reset link to this email</h3>
                    <br />
                    <input
                        placeholder="E-mail"
                        required
                        type="text"
                        name="email"
                        className="form-control"
                    />
                    <br />
                    <div className="center">
                        <button
                            className="btn btn-primary btn-width"
                            type="submit"
                        >
                            Reset password
                        </button>
                    </div>
                    <br />
                    <div className="center text-block">
                        <span className="me-2">New to Webster?</span>
                        <span>
                            <NavLink to="/register">Sign up</NavLink>
                        </span>
                    </div>
                </form>
            </div>
        </>
    );
};
