import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';

import CreateProject from './CreateProject';
import Loader from '../Misc/Loader';
import Project from './Project';

import './project.css';

export default () => {
    const [isModalShown, setIsModalShown] = useState(false);
    const [loading, setLoading] = useState(true);
    const [projects, setProjects] = useState([]);
    const [paginator, setPaginator] = useState({}); // TODO: pagination fields from response

    useEffect(() => {
        axios
            .get('/projects')
            .then(({ data }) => {
                console.log(data);
                setProjects(data.data);
                delete data.data;
                setPaginator(data);
                setLoading(false);
            })
            .catch((error) => console.error(error));
    }, []);

    return (
        <div className="project-page">
            <div className="project-control-panel">
                <Button variant="primary" onClick={() => setIsModalShown(true)}>
                    Launch vertically centered modal
                </Button>
            </div>
            <div className="project-list">
                {loading ? (
                    <Loader />
                ) : (
                    projects.map((project) => <Project {...project} />)
                )}
            </div>
            <CreateProject
                show={isModalShown}
                onHide={() => setIsModalShown(false)}
            />
        </div>
    );
};
