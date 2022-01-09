import { useEffect, useState } from 'react';
import Loader from '../Misc/Loader';
import Project from './Project';
import axios from 'axios';

export default () => {
    const [loading, setLoading] = useState(true);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        axios
            .get('/projects')
            .then(({ data }) => {
                console.log(data);
                setProjects(data);
                setLoading(false);
            })
            .catch((error) => console.error(error));
    }, []);

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                projects.map((project) => <Project {...project} />)
            )}
        </>
    );
};
