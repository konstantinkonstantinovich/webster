import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

export default ({ id, preview, title }) => {
    console.log(title);
    return (
        <Card style={{ cursor: 'pointer' }}>
            <div className="card-preview">
                {preview && <img src={preview} alt={title} />}
                <Card.Body></Card.Body>
            </div>

            <Card.Title>
                <Link to={`/projects/${id}/board`}>{title}</Link>
            </Card.Title>

            <Card.Text>project</Card.Text>
        </Card>
    );
};
