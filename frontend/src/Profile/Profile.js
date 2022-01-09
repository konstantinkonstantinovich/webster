import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

import Loader from '../Misc/Loader';

export default () => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const deleteUser = () => {
        axios
            .delete('/user/delete')
            .then(() => {
                Cookies.remove('token');
                window.location.replace('/');
            })
            .catch((error) => console.error(error));
    };

    const onFileChange = (event) => setSelectedFile(event.target.files[0]);

    const onFileUpload = () => {
        const formData = new FormData();
        formData.append('avatar', selectedFile, selectedFile.name);
        axios.post('/user/update', formData).then(() => setLoading(true));
    };

    useEffect(() => {
        axios
            .get('/user/profile')
            .then(({ data }) => {
                console.log(data);
                setUser({
                    ...data,
                    avatar:
                        data.avatar ===
                        'http://ucode-webster-fork.herokuapp.com/'
                            ? null
                            : data.avatar,
                });
                setLoading(false);
            })
            .catch((error) => console.error(error));
    }, [loading]);

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <div style={{ textAlign: 'center' }}>
                    {user.avatar ? (
                        <img
                            style={{
                                maxWidth: '25%',
                                border: '4px solid black',
                            }}
                            src={user.avatar}
                            alt={user.login}
                        />
                    ) : (
                        <p>No avatar. Upload?</p>
                    )}

                    <div className="avatar_upload">
                        <input type="file" onChange={onFileChange} />
                        <button onClick={onFileUpload}>Upload!</button>
                    </div>

                    <h3>Login: {user.login}</h3>
                    <h3>e-mail: {user.email}</h3>
                    <button
                        style={{ background: 'red', color: 'white' }}
                        onClick={deleteUser}
                    >
                        Delete account
                    </button>
                </div>
            )}
        </>
    );
};
