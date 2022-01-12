import { Button, CardGroup } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import axios from 'axios';

import CreateProject from './CreateProject';
import Loader from '../Misc/Loader';
import Project from './Project';

import './project.css';

export default (props) => {
    const [isModalShown, setIsModalShown] = useState(false);
    const [loading, setLoading] = useState(true);
    const [projects, setProjects] = useState([]);
    const [paginator, setPaginator] = useState([]);

    const appendProject = (project) =>
        setProjects((projects) => {
            if (projects.length === paginator.per_page) return projects;

            return [...projects, project];
        });

    const loadProjects = (url='/projects?page=1') => {
        axios
            .get(url)
            .then(({ data }) => {
                console.log(data);
                setProjects(data.data);
                setPaginator(data.links);
                setLoading(false);
            })
            .catch((error) => console.error(error));
    }

    useEffect(() => {
        loadProjects()
    }, []);

    let navArray = []
    paginator.forEach((nav, i) => {
        navArray.push(<button key={i} disabled={nav.active || !nav.url} dangerouslySetInnerHTML={{ __html: nav.label }} onClick={() => {loadProjects(nav.url)}}/>)
    })

    return (
        <div className="project-page">
            <div className="project-control-panel">
                <Button variant="primary" onClick={() => setIsModalShown(true)}>
                    Create new project
                </Button>
            </div>

            <div className="projects">
                <div className="projects-title">
                    <h2 className="projects-title-text">My designs</h2>
                </div>
                <div className="project-list">
                    {loading ? (
                        <Loader />
                    ) : (
                        <CardGroup>
                            {projects.map((project) => (
                                <Project key={project.key} {...project} />
                            ))}
                        </CardGroup>
                    )}
                </div>
            </div>

            <nav className="navigation_arr">{navArray}</nav>
            
            <CreateProject
                show={isModalShown}
                onHide={() => setIsModalShown(false)}
                appendProject={appendProject}
            />
        </div>
    );
};
