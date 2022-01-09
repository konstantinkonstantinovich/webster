import { NavLink } from 'react-router-dom';
import './misc.css';

export default () => {
    return (
        <footer сlassName="page-footer font-small">
            <div сlassName="footer-copyright text-center py-3">
                © 2022 Copyright:
                <NavLink to="/">Webster.com</NavLink>
            </div>
        </footer>
    );
};
