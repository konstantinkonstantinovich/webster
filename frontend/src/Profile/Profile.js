import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { useHistory } from 'react-router-dom';

const axios = require('axios');

export default function Profile(props) {
    let [avatar, setAvatar] = useState('')
    let [loading, setLoading] = useState(true);
    let [user, setUser] = useState(null);
    let [selectedFile, setSelectedFile] = useState(null);

    const history = useHistory();
    if (!Cookies.get('token')) {
        history.push('/')
    }

    const loadUser = (e) => {
        axios.get('auth/user').then(function (response) {
            setUser(response.data.user)
            setAvatar(response.data.user.avatar)
            setLoading(false)
        }).catch(function (error) {
            console.log(error);
            Cookies.remove('token')
            window.location.href = "/home"
        });
    }

    const deleteUser = () => {
        axios.delete('user/delete').then(function (response) {
            if (response.status === 200) {
                Cookies.remove('token')
                window.location.href = "/home" // TODO setToken from app.js for history
            }
        }).catch(function (error) {
            console.log(error);
        });
    }

    const onFileChange = event => {
        setSelectedFile(event.target.files[0])
    };

    const onFileUpload = () => {
        const formData = new FormData();
        formData.append(
            "avatar",
            selectedFile,
            selectedFile.name
        );
        axios.post("user/update", formData).then(() => {
            loadUser()
        })
    };

    useEffect(() => {
        loadUser();
    }, [props, avatar, loading]);

    if (!loading) {
        return (
          <>
            
            <div style={{textAlign: 'center'}}>
                {user.avatar ? <img style={{maxWidth: '25%',border: '4px solid black'}} src={"http://127.0.0.1:8000/" + user.avatar} alt=""/> : <p>No avatar. Upload?</p>}

                <div className='avatar_upload'>
                    <input type="file" onChange={onFileChange} />
                    <button onClick={onFileUpload}>Upload!</button>
                </div>

                <h3>Login: {user.login}</h3>
                <h3>e-mail: {user.email}</h3>
                <button style={{background: 'red', color: 'white'}} onClick={deleteUser}>Delete account</button>
            </div>
          </>
        );
    } else {
        return (
        <div className="center">
            <ClipLoader color="blue" loading={loading} size={100} />
        </div>);
    }
}
