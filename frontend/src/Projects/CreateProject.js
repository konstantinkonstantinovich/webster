import { Modal, Form, Button } from 'react-bootstrap';

export default (props) => {
    const onSubmit = (e) => e.preventDefault();

    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Create new ✨awesome✨ project!
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={onSubmit}>
                    <Form.Group className="mb-3" controlId="formTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="Enter title" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Preview</Form.Label>
                        <Form.Control type="file" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formPublic">
                        <Form.Check type="checkbox" label="Public" />
                    </Form.Group>
                    <Button
                        variant="primary"
                        type="submit"
                        className="pull-right"
                    >
                        Create
                    </Button>
                </Form>
            </Modal.Body>
            {/* <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer> */}
        </Modal>
    );
};
