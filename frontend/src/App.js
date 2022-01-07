import Cookies from "js-cookie";
import { useState } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import Registration from './Registration/Registration'
import Login from "./Login/Login";
import Home from './Home/Home'


const axios = require('axios');
axios.defaults.baseURL = "http://127.0.0.1:8000/api"
axios.interceptors.request.use(
    (config) => {
        if (Cookies.get('token'))
            config.headers.authorization = `Bearer ${Cookies.get('token')}`

        return config
    },
    (error) => Promise.reject(error)
)

function App() {
    const [token, setToken] = useState(Cookies.get('token'));

    return (
        <div className="App">
        <Router>
        <Switch>
            <Route path="/login">
              <Login setToken={setToken}/>
            </Route>
            <Route path="/register">
              <Registration setToken={setToken}/>
            </Route>
            <Route path="/">
              <Home/>
            </Route>
          </Switch>
        </Router>
        </div>
    );
}

export default App;
