import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Select from 'react-select';
import { addReviewIdToBook, getAllReviews, listNewReview } from '../../../utils/axios-instance';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux"

const ReviewPage = () => {
    const { bookId } = useParams()
    const navigate = useNavigate()
    const userName = useSelector((state) => state.role.user.name)
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        const fetchAllReviewForId = async () => {
            try {
                const response = await getAllReviews()
                if (response.success) {
                    console.log(response)
                    setReviews(response.data)
                } else {
                    console.error("Failed to fetch the Products Data", response.error)
                }
            } catch (error) {
                console.error("Error while Fetching products", error)
            }
        }

        fetchAllReviewForId()
    }, [])
    const ratingOptions = [
        { value: 1, label: '⭐' },
        { value: 2, label: '⭐⭐' },
        { value: 3, label: '⭐⭐⭐' },
        { value: 4, label: '⭐⭐⭐⭐' },
        { value: 5, label: '⭐⭐⭐⭐⭐' }
    ];

    const handleSubmit = async (values) => {
        try {
            const lastId = reviews.length > 0 ? parseInt(reviews[reviews.length - 1].id) + 1 : 1;
            const timestamp = new Date().toISOString();
            const finalReviwObj = { reviewerName: userName, bookId: bookId, id: lastId.toString(), timestamp: timestamp, ...values }
            const response = await listNewReview(finalReviwObj)
            const addIdToBookData = await addReviewIdToBook(bookId, lastId.toString())
            console.log(finalReviwObj)
            navigate(`/books/${bookId}`)
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <Container className="my-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <h2 className="mb-4 playfair-display-mygooglefont">Leave a Review!</h2>
                    <Formik
                        initialValues={{ rating: '', content: '' }}
                        onSubmit={handleSubmit}
                    >
                        {({ values, handleSubmit, setValues }) => (
                            <Form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="rating" className="form-label">Rating</label>
                                    <Select
                                        id="rating"
                                        name="rating"
                                        value={ratingOptions.find(option => option.value === values.rating)}
                                        options={ratingOptions}
                                        onChange={(option) => {
                                            setValues({
                                                ...values,
                                                rating: option.value
                                            });
                                        }}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="content" className="form-label">Content</label>
                                    <Field
                                        id="content"
                                        name="content"
                                        as="textarea"
                                        className="form-control"
                                        placeholder="Write your review here..."
                                    />
                                </div>
                                <Button type="submit" variant="primary">Submit Review</Button>
                            </Form>
                        )}
                    </Formik>
                </Col>
            </Row>
        </Container>
    );
};

export default ReviewPage;

