import { Button, CardGroup } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import CreateProject from './CreateProject';
import Loader from '../Misc/Loader';
import Project from './Project';

import './project.css';

export default (props) => {
    const [isModalShown, setIsModalShown] = useState(false);
    const [loading, setLoading] = useState(true);
    const [projects, setProjects] = useState([]);
    const [paginator, setPaginator] = useState([]);
    const [search, setSearch] = useState('');

    const appendProject = (project) =>
        setProjects((projects) => {
            if (projects.length === paginator.per_page) return projects;

            return [...projects, project];
        });

    const loadProjects = (url = '/projects?page=1') => {
        axios
            .get(url)
            .then(({ data }) => {
                console.log(data);
                setProjects(data.data);
                setPaginator(data.links);
                setLoading(false);
            })
            .catch((error) => console.error(error));
    };

    const searchProjects = (url) => {
      axios
          .get('/projects?page=1&search=' + encodeURIComponent(search))
          .then(({ data }) => {
              console.log(data);
              setProjects(data.data);
              setPaginator([]);
              setLoading(false);
          })
          .catch((error) => console.error(error));
  };

    useEffect(() => {
        loadProjects();
    }, []);

    let navArray = [];
    paginator.forEach((nav, i) => {
        navArray.push(
            <button
                key={i}
                disabled={nav.active || !nav.url}
                dangerouslySetInnerHTML={{ __html: nav.label }}
                onClick={() => {
                    loadProjects(nav.url);
                }}
            />
        );
    });

    return (
        <>
            <div className="container">
                <div className="row mt-5">
                    <div className="col-md-3">
                        <div className="row-width">
                            <div className="row">
                                <div className="col-sm-12 margin-top">
                                    <div className="row active-button box_padding">
                                        <div className="col-sm-2 box_icon">
                                            <div className="icon-font">
                                                <i className="bi bi-house-door"></i>
                                            </div>
                                        </div>
                                        <div className="col-sm-10 box_title">
                                            Main
                                        </div>
                                    </div>
                                </div>

                                <div className="col-sm-12 m-t">
                                    <div className="row box_padding">
                                        <div className="col-sm-2 box_icon">
                                            <div className="icon-font">
                                                <i className="bi bi-grid"></i>
                                            </div>
                                        </div>
                                        <div className="col-sm-10 box_title">
                                            All projects
                                        </div>
                                    </div>
                                </div>

                                <div className="col-sm-12 m-t">
                                    <div className="row box_padding customButton pointer">
                                        <div className="col-sm-2 box_icon">
                                            <div className="icon-font">
                                                <i className="bi bi-pencil-square"></i>
                                            </div>
                                        </div>
                                        <div
                                            className="col-sm-10 box_title "
                                            onClick={() =>
                                                setIsModalShown(true)
                                            }
                                        >
                                            New project
                                        </div>
                                    </div>
                                </div>

                                <div className="col-sm-12 m-t">
                                    <div className="row box_padding">
                                        <div className="col-sm-2 box_icon">
                                            <div className="icon-font">
                                                <i className="bi bi-trash"></i>
                                            </div>
                                        </div>
                                        <div className="col-sm-10 box_title">
                                            Basket
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-9">
                        <div className="row-width">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="serch-content">
                                        <img
                                            src="./search_image.jpg"
                                            className="rounded-5 img-fluid"
                                        />
                                        <div className="box-for-head">
                                            What will your design look like
                                            today?
                                        </div>
                                        <div className="search-box">
                                            <input onChange={(e)=>{setSearch(e.target.value)}}
                                                className="form-control me-2"
                                                type="search"
                                                placeholder="Search"
                                                aria-label="Search"
                                            />
                                            <button onClick={searchProjects}
                                                className="btn btn-outline-success"
                                                type="submit"
                                            >
                                                Search
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-12">
                                    <h2 className="mt-4">Designs</h2>

                                    {loading ? (
                                        <Loader />
                                    ) : (
                                        <div className="cards-list">
                                            {projects.map((project) => (
                                                <div
                                                    className="card 1"
                                                    key={project.id}
                                                >
                                                    <div className="card_image">
                                                        {' '}
                                                        <img
                                                            src={
                                                                project.preview
                                                            }
                                                        />{' '}
                                                    </div>
                                                    <div className="card_title">
                                                        <p>
                                                            <Link
                                                                className="title-black"
                                                                to={`/projects/${project.id}/board`}
                                                            >
                                                                {project.title}
                                                            </Link>
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    <div className="projects-title text-center mt-2">
                                        <nav className="navigation_arr">
                                            {navArray ? navArray : null}
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <CreateProject
                show={isModalShown}
                onHide={() => setIsModalShown(false)}
                appendProject={appendProject}
            />
        </>
    );
};
