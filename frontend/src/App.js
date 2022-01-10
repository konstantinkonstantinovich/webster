import { GuardProvider, GuardedRoute } from 'react-router-guards';
import { BrowserRouter, Switch } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

import Registration from './Registration/Registration';
import PageNotFound from './Misc/PageNotFound';
import Projects from './Projects/Projects';
import Profile from './Profile/Profile';
import { serverSslURL } from './config';
import Logout from './Logout/Logout';
import Forgot from './Login/Forgot';
import Header from './Misc/Header';
import Footer from './Misc/Footer';
import Loader from './Misc/Loader';
import Verification from './Misc/Verification';
import Login from './Login/Login';
import Board from './Board/Board';
import Home from './Home/Home';

import './Home/home.css';

axios.defaults.baseURL = `${serverSslURL}/api`;

axios.interceptors.request.use(
    (config) => {
        const token = Cookies.get('token');

        if (token) config.headers.authorization = `Bearer ${token}`;

        return config;
    },
    (error) => Promise.reject(error)
);

const AuthGuard = async (_to, _from, next) => {
    if (Cookies.get('token')) {
        try {
            await axios.get('/user/profile');

            return next();
        } catch {}
    }

    next.redirect('/login');
};

const NoAuthGuard = async (_to, _from, next) => {
    if (Cookies.get('token')) {
        try {
            await axios.get('/user/profile');

            return next.redirect('/');
        } catch {}
    }

    next();
};

export default () => {
    return (
        <div className="holy-grail">
            <main className="holy-grail-body body-content">
                <main className="body">
                    <BrowserRouter>
                        <Header />
                        <GuardProvider loading={Loader}>
                            <Switch>
                                <GuardedRoute
                                    path="/"
                                    exact
                                    component={Home}
                                    guards={[NoAuthGuard]}
                                />
                                <GuardedRoute
                                    path="/register"
                                    component={Registration}
                                    guards={[NoAuthGuard]}
                                />
                                <GuardedRoute
                                    path="/login"
                                    component={Login}
                                    guards={[NoAuthGuard]}
                                />
                                <GuardedRoute
                                    path="/forgot"
                                    component={Forgot}
                                    guards={[NoAuthGuard]}
                                />
                                <GuardedRoute
                                    path="/logout"
                                    component={Logout}
                                    guards={[AuthGuard]}
                                />
                                <GuardedRoute
                                    path="/projects/:id/board"
                                    component={Board}
                                    guards={[AuthGuard]}
                                />
                                <GuardedRoute
                                    path="/projects"
                                    component={Projects}
                                    guards={[AuthGuard]}
                                />
                                <GuardedRoute
                                    path="/verification/:remember_token"
                                    component={Verification}
                                />
                                <GuardedRoute
                                    path="/profile"
                                    component={Profile}
                                    guards={[AuthGuard]}
                                />
                                <GuardedRoute
                                    path="*"
                                    component={PageNotFound}
                                />
                            </Switch>
                        </GuardProvider>
                        <Footer />
                    </BrowserRouter>
                </main>
            </main>
        </div>
    );
};
