import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import './profile.css'

import { serverURL } from '../config';
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
        axios
            .post('/user/update', formData)
            .then(() => window.location.reload());
    };

    const switchVisible = () =>  {
        if (document.getElementById('before')) {
          if (document.getElementById('before').style.display == 'none') {
            document.getElementById('before').style.display = 'block';
            document.getElementById('after').style.display = 'none';
          }
          else {
            document.getElementById('before').style.display = 'none';
            document.getElementById('after').style.display = 'block';
          }
        }
    }

    const updateLogin = (e)=> {
        e.preventDefault();
        const login = e.target.login.value;
        axios
        .post('/user/update', { login })
        .then(() => window.location.reload())
        .catch((error) => {
            console.log(error);
        });
    }

    useEffect(() => {
        axios
            .get('/user/profile')
            .then(({ data }) => {
                console.log(data);
                setUser({
                    ...data,
                    avatar:
                        data.avatar === `${serverURL}/` ? null : data.avatar,
                });
                setLoading(false);
            })
            .catch((error) => console.error(error));
    }, []);

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
              <>
              <main className="update_profile_page_box">
                <div className="row">
                  <div className="col-md-3">
                    <div className="row-width">
                      <div className="row">
                        <div className="col-sm-auto box_image">
                          {user.avatar ? (
                              <img
                                  className="rounded-circle image-size"
                                  src={user.avatar}
                              />
                          ) : (
                            <img
                                className="rounded-circle image-size"
                                src="./avatar.jpg"
                            />
                          )}
                        </div>
                        <div className="col-sm-9">
                          <p className="user-login">{user.login}</p>
                          <p className="user-email">{user.email}</p>
                        </div>

                        <div className="col-sm-12 margin-top">
                          <div className="row active-button box_padding">
                            <div className="col-sm-2 box_icon">
                              <div className="icon-font"><i className="bi bi-person-circle"></i></div>
                            </div>
                            <div className="col-sm-10 box_title">
                              Account
                            </div>
                          </div>
                        </div>

                        <div className="col-sm-12 m-t">
                          <div className="row box_padding">
                            <div className="col-sm-2 box_icon">
                              <div className="icon-font"><i className="bi bi-lock"></i></div>
                            </div>
                            <div className="col-sm-10 box_title">
                              Login and Security
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-9">
                    <div className="row-width">
                      <div className="row">
                        <div className="col-md-12 head-title">
                            Account
                        </div>
                        <div className="col-md-12 profile-photo">
                            Profile photo
                        </div>

                        <div className="col-md-12 m-b">
                          <div className="row">
                            <div className="col-md-2 box_avatar hr-line">
                              {user.avatar ? (
                                  <img
                                      className="rounded-circle avatar-size-upload"
                                      src={user.avatar}
                                  />
                              ) : (
                                <img
                                    className="rounded-circle avatar-size-upload"
                                    src="./avatar.jpg"
                                />
                              )}
                            </div>
                            <div className="col-md-7 box_upload hr-line">
                              <label for="upload-photo">Change photo</label>
                                <input type="file" onChange={onFileChange} id="upload-photo"  />
                                <button className="button-upload" onClick={onFileUpload}>Upload</button>
                              </div>
                            <div className="col-md-3">
                            </div>
                          </div>

                        </div>
                        <div className="col-md-12 profile-photo">
                            Login
                        </div>
                        <div className="col-md-12">
                          <div className="row" id="before">
                            <div className="col-md-8 input-text box_login hr-line">
                              {user.login}
                            </div>
                            <div className="col-md-1 box_upload hr-line">
                              <button className="button-upload" onClick={switchVisible}>Edit</button>
                            </div>

                          </div>
                          <div className="row" id="after">
                            <div className="col-md-9 input-text hr-line">
                              <form action="" onSubmit={updateLogin}>
                                <input type="text" name="login" className="form-control" placeholder="Input login..."/>
                                <button type='submit'>Save</button>
                              </form>
                            </div>
                            <div className="col-md-3">
                            </div>
                            
                          </div>

                        </div>
                        <div className="col-md-12 profile-photo margin-top">
                            Email
                        </div>
                        <div className="col-md-12">
                            <div className="row">
                              <div className="col-md-9 input-text">
                                {user.email}
                              </div>
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </main>

              </>
            )}
        </>
    );
};
