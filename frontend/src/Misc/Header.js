import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import './misc.css';
const axios = require('axios').default;

export default function Header(props) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios.get('auth/user').then(function (response) {
            setUser(response.data.user);
        }).catch(function (error) {
            return; // not logged in
        });
    }, [props.token]);

    const logout = () => {
        axios.get('auth/logout').then(function (response) {
            setUser(null);
            props.setToken(null);
            Cookies.remove('token');
            window.location.href = "/"
        }).catch(function (error) {
            console.log(error);
        });
    }

    const goHome = () => {
        window.location.href = "/"
    }

    if (user) {
      return (
        <>
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous"/>
          <header className="navbar navbar-light navbar-expand-lg nav-border">
            <div className="container-fluid">
              <a onClick={goHome} className="navbar-brand" href="#">Webster</a>
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <a className="nav-link-my active-my" aria-current="page" href="#">Home</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link-my" aria-current="page" href="#">Projects</a>
                  </li>
                </ul>
              </div>
              <div className="d-flex">
                <span className="navbar-text me-3">Welcome, {user.login} </span>
                <div className="me-3">
                  <img src={"http://127.0.0.1:8000/" + user.avatar} className="rounded-circle image-size"/>
                </div>
                <button onClick={logout} className="btn btn-outline-success">Logout</button>
              </div>
            </div>
          </header>
        </>
      )
    } else {
      return (
        <>
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous"/>
          <header className="navbar navbar-light navbar-expand-lg nav-border">
            <div className="container-fluid">
              <a onClick={goHome} className="navbar-brand" href="#">Webster</a>
              <div className="d-flex">
                <a href="/login" className="btn btn-outline-primary me-2">Login</a>
                <a href="/register" onClick={logout} className="btn btn-outline-success">Register</a>
              </div>
            </div>
          </header>
        </>
      )
    }
};
