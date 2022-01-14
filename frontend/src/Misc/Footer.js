import { NavLink } from 'react-router-dom';
import './misc.css';

export default () => {
    return (
        <footer>
            <p className="text-center mt-3">
                <small className="text-muted">&copy; <NavLink to="/">Webster.com</NavLink>, 2022</small>
            </p>
        </footer>
    );
};
