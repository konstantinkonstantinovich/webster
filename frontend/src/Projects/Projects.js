import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { useHistory } from 'react-router-dom';
import Project from "./Project";

const axios = require('axios').default;
export default function Projects(params) {
    let [loading, setLoading] = useState(true);
    let [projects, setProjects] = useState([]);
    const history = useHistory();

    const loadProjects = () => {
        axios.get('auth/user').then(function (response) {
            axios.get('projects').then(function (response) {
                setProjects(response.data)
                setLoading(false)
            }).catch(function (error) {
                history.push('/');
            });
        }).catch(function (error) {
            history.push('/');
        });
    }

    useEffect(() => {
        loadProjects();
    }, []);


    if (loading) {
        return (<div className="center">
            <ClipLoader color="blue" loading={loading} size={100} />
        </div>);
    } else {
        return (<>
            {projects.map((project)=> <Project {...project}/>)}
        </>);
    }
};
