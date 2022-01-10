import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import axios from 'axios';

export default function ResetPassword(params) {
    const { reset_token } = useParams()
    const history = useHistory();

    const submit = (e) => {
        e.preventDefault();
        const password = e.target.password.value;
        axios
        .post('/user/reset_password_link/' + reset_token, {password})
        .then(({ data }) => {
            history.push('/login');
        })
        .catch((error) => {
            console.log(error);
        });
    }


    return (
    <div className="center padding-in-block">
        <form onSubmit={submit}>
            <h2>Enter a new password for your account</h2>
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
                    Change password
                </button>
            </div>
            <br />
        </form>
    </div>)
};
