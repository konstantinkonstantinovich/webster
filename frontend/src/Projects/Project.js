import { Card } from 'react-bootstrap';

export default ({ preview, title }) => {
    return (
        <Card className="project">
            <Card.Img variant="top" src={preview} alt={title} />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
            </Card.Body>
        </Card>
    );
};
