import Cookies from "js-cookie";
import { useState } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import './Home/home.css'

import Registration from './Registration/Registration'
import Login from "./Login/Login";
import Home from './Home/Home'
import Header from './Misc/Header'
import Footer from './Misc/Footer'


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
      <>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous"/>

        <div className="holy-grail">
          <Header token={token} setToken={setToken}/>
          <main className="holy-grail-body body-content">
            <main className="container">
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
            </main>
          </main>
          <Footer/>
        </div>
      </>
    );
}

export default App;
