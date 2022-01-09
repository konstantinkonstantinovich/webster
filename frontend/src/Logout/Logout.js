import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

export default () => {
    const history = useHistory();

    useEffect(() => {
        axios
            .post('/auth/logout')
            .then(() => {
                Cookies.remove('token');
                setTimeout(() => history.push('/'), 250);
            })
            .catch((e) => console.error(e));
    }, []);

    return <></>;
};
