import { Modal, Form, Button, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

const validationSchema = yup.object().shape({
    title: yup.string(),
    public: yup.boolean().required(),
});

export default ({ show, onHide, appendProject }) => {
    const [preview, setPreview] = useState(null);

    useEffect(() => setPreview(null), [show]);

    const onSubmit = (values) => {
        console.log(values);
        console.log(preview);

        const formData = new FormData();

        formData.append('title', values.title);
        formData.append('public', values.public);
        formData.append('preview', preview);

        axios
            .post('/projects/new', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then(({ data }) => {
                console.log(data);
                appendProject(data);
                onHide();
            })
            .catch((e) => console.error(e));
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
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
                <Formik
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                    initialValues={{
                        title: 'untitled',
                        preview: null,
                        public: true,
                    }}
                >
                    {({ values, handleSubmit, handleChange }) => (
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formTitle">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="title"
                                    onChange={handleChange}
                                    placeholder="Enter title"
                                />
                            </Form.Group>
                            <Form.Group
                                className="mb-3"
                                controlId="formPreview"
                            >
                                <Form.Label>Preview</Form.Label>
                                <Form.Control
                                    type="file"
                                    name="preview"
                                    onChange={(e) => {
                                        setPreview(
                                            Array.from(e.target.files).at(0)
                                        );
                                        handleChange(e);
                                    }}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formPublic">
                                <Form.Check
                                    type="checkbox"
                                    name="public"
                                    label="Public"
                                    checked={values.public}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Button
                                variant="primary"
                                type="submit"
                                className="center"
                            >
                                Create
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Modal.Body>
            {/* <Modal.Footer>
                <Button onClick={onHide}>Close</Button>
            </Modal.Footer> */}
        </Modal>
    );
};
