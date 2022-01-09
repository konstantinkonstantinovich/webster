import { useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

export default () => {
    useEffect(() => {
        axios
            .get('/auth/logout')
            .then(() => {
                Cookies.remove('token');
                window.location.replace('/');
            })
            .catch((e) => console.error(e));
    }, []);

    return <></>;
};
