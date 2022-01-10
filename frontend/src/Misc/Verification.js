import { useParams } from "react-router";
import { Link } from "react-router-dom";
import axios from 'axios';

import Loader from './Loader';
import { useState } from "react";

export default function Verification(params) {
    const { remember_token } = useParams()
    const [loading, setLoading] = useState(true);

    axios
    .patch('/user/vefify_email/' + remember_token)
    .then(({ data }) => {
        setLoading(false);
        console.log(remember_token)
    })
    .catch((error) => {
        console.log(error);
    });

    return (<>
        {loading ? (
            <Loader />
        ) : (
            <>
              <div className="message-block">
                <span className="center icon-size"><i className="bi bi-check-circle"></i></span>
                <h1 className='center'>Your account was successfully verified!</h1>
                <Link className='center' to='/login'>Start using Webster</Link>
              </div>
            </>
        )}
    </>)
};
