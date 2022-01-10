import { useParams } from "react-router";
import { Link } from "react-router-dom";
import axios from 'axios';

import Loader from './Loader';
import { useState } from "react";

export default function Verification(params) {
    const { remember_token } = useParams()
    const [loading, setLoading] = useState(true);

    axios
<<<<<<< HEAD
    .patch('/user/vefify_email', { remember_token })
=======
    .patch('/user/vefify_email/' + remember_token)
>>>>>>> 5bd9748ae553ada0fb6f5d785734c0a989ad25d4
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
            <h1 className='center'>Your account was successfully verified!</h1>
            <Link className='center' to='/login'>Start using Webster</Link>
            </>
        )}
    </>)
};
