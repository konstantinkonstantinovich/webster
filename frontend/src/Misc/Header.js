import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Gravatr from 'react-gravatar';
import axios from 'axios';

import { serverURL } from '../config';

import './misc.css';

export default () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios
            .get('/user/profile')
            .then(({ data }) =>
                setUser({
                    ...data,
                    avatar:
                        data.avatar === `${serverURL}/` ? null : data.avatar,
                })
            )
            .catch((error) => console.error(error));
    }, []);

    return (
        <header className="navbar navbar-light navbar-expand-lg nav-border">
            <div className="container-fluid">
                <NavLink to="/" className="navbar-brand">
                    Webster
                </NavLink>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink
                                to="/"
                                className="nav-link-my active-my"
                                aria-current="page"
                            >
                                Home
                            </NavLink>
                        </li>
                        {user && (
                            <li className="nav-item">
                                <NavLink
                                    to="/projects"
                                    className="nav-link-my"
                                    aria-current="page"
                                >
                                    Projects
                                </NavLink>
                            </li>
                        )}
                    </ul>
                </div>
                <div className="d-flex">
                    {user ? (
                        <>
                            <NavLink
                                to="/profile"
                                className="navbar-text me-3 pointer"
                            >
                                Welcome{user.login ? `, ${user.login}` : ''}
                            </NavLink>
                            <NavLink to="/profile" className=" me-3 pointer">
                                {user.avatar ? (
                                    <img
                                        src={user.avatar}
                                        className="rounded-circle image-size"
                                    />
                                ) : (
                                    <Gravatr
                                        email={user.email}
                                        className="rounded-circle image-size"
                                    />
                                )}
                            </NavLink>
                            <NavLink
                                to="/logout"
                                className="btn btn-outline-success"
                            >
                                Logout
                            </NavLink>
                        </>
                    ) : (
                        <>
                            <NavLink
                                to="/login"
                                className="btn btn-outline-primary me-2"
                            >
                                Login
                            </NavLink>
                            <NavLink
                                to="/register"
                                className="btn btn-outline-success"
                            >
                                Sign up
                            </NavLink>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};
