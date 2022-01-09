import { Button, CardGroup } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import axios from 'axios';

import CreateProject from './CreateProject';
import Loader from '../Misc/Loader';
import Project from './Project';

import './project.css';

export default () => {
    const [isModalShown, setIsModalShown] = useState(false);
    const [loading, setLoading] = useState(true);
    const [projects, setProjects] = useState([]);
    const [paginator, setPaginator] = useState({
        next_page_url: null,
        current_page: 1,
        per_page: 10,
        total: 0,
    });

    const appendProject = (project) =>
        setProjects((projects) => {
            if (projects.length === paginator.per_page) return projects;

            return [...projects, project];
        });

    useEffect(() => {
        axios
            .get('/projects')
            .then(({ data }) => {
                console.log(data);
                setProjects(data.data);
                setPaginator(data);
                setLoading(false);
            })
            .catch((error) => console.error(error));
    }, []);

    return (
        <div className="project-page">
            <div className="project-control-panel">
                <Button variant="primary" onClick={() => setIsModalShown(true)}>
                    Create new project
                </Button>
            </div>
            <div className="project-list">
                {loading ? (
                    <Loader />
                ) : (
                    <CardGroup>
                        {projects.map((project) => (
                            <Project {...project} />
                        ))}
                    </CardGroup>
                )}
            </div>
            <CreateProject
                show={isModalShown}
                onHide={() => setIsModalShown(false)}
                appendProject={appendProject}
            />
        </div>
    );
};
