import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Container, Row, Col, Button } from 'react-bootstrap';

const FormComponent = ({ initialValues, validationSchema, onSubmit, fields }) => {
    console.log(initialValues);
    return (

        <Container>
            {/* <h1 className="text-center mt-5 mb-4">Register New Book</h1> */}
            <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ errors, touched }) => (
                    <Form>
                        {fields.map((field, index) => (
                            <Row className="mb-3" key={index}>
                                <Col md={6}>
                                    <div>
                                        <label htmlFor={field.name}>{field.label}</label>
                                        {field.type === 'checkbox' ? (
                                            <div>
                                                <Field
                                                    type={field.type}
                                                    name={field.name}
                                                    className="form-check-input"
                                                />
                                                <label className="form-check-label" htmlFor={field.name}>
                                                    {field.label}
                                                </label>
                                            </div>
                                        ) : field.as === 'select' ? (
                                            <Field
                                                name={field.name}
                                                as={field.as}
                                                className="form-control"
                                                component="select"
                                                onChange={field.onChange}
                                            >
                                                <option value="">Select {field.label}</option>
                                                {field.options.map((option, index) => (
                                                    <option key={index} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </Field>
                                        ) : (
                                            <Field
                                                name={field.name}
                                                type={field.type}
                                                as={field.as}
                                                rows={field.rows}
                                                className="form-control"
                                            />
                                        )}
                                        {errors[field.name] && touched[field.name] && (
                                            <div className="text-danger">{errors[field.name]}</div>
                                        )}
                                    </div>
                                </Col>
                            </Row>
                        ))}
                        <div className="text-center">
                            <Button variant="primary" type="submit">Submit</Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </Container>
    );
};

export default FormComponent;
