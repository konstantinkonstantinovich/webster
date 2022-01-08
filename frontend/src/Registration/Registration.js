import Cookies from 'js-cookie'
import { isExpired, decodeToken } from "react-jwt";
import { Redirect, useHistory } from 'react-router-dom';
import './registration.css'

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
        return (
          <>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous"/>
            <div className="center padding-in-block">
              <form onSubmit={submit}>
                  <h2>Get started with Webster</h2>
                  <br/>
                  <input placeholder="Login" required type='text'
                      name="name" className="form-control"
                  />
                  <br/>
                  <input placeholder="E-mail" required type='text'
                      name="email" className="form-control"
                  />
                  <br/>
                  <input placeholder="Password" type="password" required
                      name="password" className="form-control"
                  />
                  <br/>
                  <input placeholder="Confirm password" type="password" required
                      name="password_confirmation" className="form-control"
                  />
                  <br/>
                  <div className="center">
                      <button className="btn btn-primary btn-width" type="submit">Sign up</button>
                  </div>
                  <br/>
                  <div className="center text-block">
                    <span class="me-2">Already signed up?</span>
                    <span><a href="/login">Log in</a></span>
                  </div>
              </form>
          </div>
        </>
      );
    }
};
