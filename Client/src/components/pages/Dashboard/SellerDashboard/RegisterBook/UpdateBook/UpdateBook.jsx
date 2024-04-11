import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { Container, Row, Col, Button, Form as BootstrapForm } from 'react-bootstrap';
import * as Yup from 'yup';
import { getBookById, getCategory, getSubcategoriesByCategoryId, updateBookData } from '../../../../../../utils/axios-instance';
import { useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';
import Swal from 'sweetalert2'


const UpdateBook = () => {
    const { bookId } = useParams()
    const navigate = useNavigate()
    const [fetchedBookData, setFetchedBookData] = useState(null)
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState('');
    const [disableSubcategory, setDisableSubcategory] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getCategory();
                setCategories(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        const fetchBookById = async () => {
            try {
                const response = await getBookById(bookId);
                setFetchedBookData(response.data)
                setSelectedCategoryId(response.data.categoryId);
                const responseSubcategories = await getSubcategoriesByCategoryId(response.data.categoryId);
                setSubcategories(responseSubcategories.data);
                setDisableSubcategory(false);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
        fetchBookById();
    }, [bookId]);

    const updateBookDataBySeller = async (values) => {
        const updatedSellerData = { id: bookId.toString(), ...values }
        const response = await updateBookData(bookId, updatedSellerData)
        console.log(response)
        Swal.fire({
            title: "Book Updated Sucessfully!",
            icon: "success"
        });
        navigate("/seller")
    };

    const initialValues = fetchedBookData ?
        {
            name: fetchedBookData.name,
            author: fetchedBookData.author,
            description: fetchedBookData.description,
            price: fetchedBookData.price,
            releaseDate: fetchedBookData.releaseDate,
            image: fetchedBookData.image,
            categoryId: fetchedBookData.categoryId,
            subCategoryId: fetchedBookData.subCategoryId,
            recentlyLaunched: fetchedBookData.recentlyLaunched === 'yes' ? 'yes' : 'no',
            category: fetchedBookData.category,
            subcategoryName: fetchedBookData.subcategoryName,
            soldBy: fetchedBookData.soldBy,
            AdditionalBookDetails: {
                BestSeller: fetchedBookData.AdditionalBookDetails.BestSeller === 'yes' ? true : false,
                BestSellerOfTheWeek: fetchedBookData.AdditionalBookDetails.BestSellerOfTheWeek === 'yes' ? true : false,
                NationalPoetryMonth: fetchedBookData.AdditionalBookDetails.NationalPoetryMonth === 'yes' ? true : false,
                InternationalBookerPrizeLonglist: fetchedBookData.AdditionalBookDetails.InternationalBookerPrizeLonglist === 'yes' ? true : false,
                BooksThatMakeYouSmarter: fetchedBookData.AdditionalBookDetails.BooksThatMakeYouSmarter === 'yes' ? true : false,
                CarolShieldsPrizeForFictionLonglist: fetchedBookData.AdditionalBookDetails.CarolShieldsPrizeForFictionLonglist === 'yes' ? true : false,
            }
        } : {
            name: '',
            author: '',
            description: '',
            price: '',
            releaseDate: '',
            image: '',
            categoryId: '',
            subCategoryId: '',
            recentlyLaunched: false,
            AdditionalBookDetails: {
                BestSeller: false,
                BestSellerOfTheWeek: false,
                NationalPoetryMonth: false,
                InternationalBookerPrizeLonglist: false,
                BooksThatMakeYouSmarter: false,
                CarolShieldsPrizeForFictionLonglist: false,
            }
        }

    console.log(fetchedBookData)

    const handleCategoryChange = async (selectedOption, { setFieldValue }) => {
        setSelectedCategoryId(selectedOption.value);
        setFieldValue('categoryId', selectedOption.value);
        setFieldValue('category', selectedOption.label);

        try {
            const response = await getSubcategoriesByCategoryId(selectedOption.value);
            setSubcategories(response.data);
            setDisableSubcategory(false);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubcategoryChange = async (selectedOption, { setFieldValue }) => {
        setFieldValue('subCategoryId', selectedOption.value);
        setFieldValue('subcategoryName', selectedOption.label);
    };

    return (
        <Container>
            <h1 className="text-center mt-5 mb-4 playfair-display-mygooglefont">Update Existing Book</h1>
            <Formik
                enableReinitialize
                initialValues={initialValues}
                onSubmit={updateBookDataBySeller}
            >
                {({ values, setFieldValue }) => (
                    <Form>
                        <Row className="mb-3">
                            <Col md={6}>
                                <BootstrapForm.Group>
                                    <BootstrapForm.Label>Name</BootstrapForm.Label>
                                    <Field name="name" type="text" className="form-control" />
                                </BootstrapForm.Group>
                            </Col>
                            <Col md={6}>
                                <BootstrapForm.Group>
                                    <BootstrapForm.Label>Author</BootstrapForm.Label>
                                    <Field name="author" type="text" className="form-control" />
                                </BootstrapForm.Group>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col md={6}>
                                <BootstrapForm.Group>
                                    <BootstrapForm.Label>Description</BootstrapForm.Label>
                                    <Field name="description" as="textarea" rows={4} className="form-control" />
                                </BootstrapForm.Group>
                            </Col>
                            <Col md={6}>
                                <BootstrapForm.Group>
                                    <BootstrapForm.Label>Price</BootstrapForm.Label>
                                    <Field name="price" type="number" className="form-control" />
                                </BootstrapForm.Group>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col md={6}>
                                <BootstrapForm.Group>
                                    <BootstrapForm.Label>Release Date</BootstrapForm.Label>
                                    <Field name="releaseDate" type="date" className="form-control" />
                                </BootstrapForm.Group>
                            </Col>
                            <Col md={6}>
                                <BootstrapForm.Group>
                                    <BootstrapForm.Label>Image URL</BootstrapForm.Label>
                                    <Field name="image" type="url" className="form-control" />
                                </BootstrapForm.Group>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col md={6}>
                                <BootstrapForm.Group>
                                    <BootstrapForm.Check
                                        type="checkbox"
                                        id="recentlyLaunched"
                                        label="Recently Launched"
                                        name="recentlyLaunched"
                                        as={Field}
                                        checked={values.recentlyLaunched}
                                        onChange={() => setFieldValue('recentlyLaunched', !values.recentlyLaunched)}
                                    />
                                </BootstrapForm.Group>
                            </Col>
                            <Col md={6}>
                                <BootstrapForm.Group>
                                    <BootstrapForm.Check
                                        type="checkbox"
                                        id="BestSeller"
                                        label="Best Seller"
                                        name="AdditionalBookDetails.BestSeller"
                                        as={Field}
                                        checked={values.AdditionalBookDetails.BestSeller}
                                        onChange={() => setFieldValue('AdditionalBookDetails.BestSeller', !values.AdditionalBookDetails.BestSeller)}
                                    />
                                </BootstrapForm.Group>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col md={6}>
                                <BootstrapForm.Group>
                                    <BootstrapForm.Check
                                        type="checkbox"
                                        id="BestSellerOfTheWeek"
                                        label="Best Seller Of The Week"
                                        name="AdditionalBookDetails.BestSellerOfTheWeek"
                                        as={Field}
                                        checked={values.AdditionalBookDetails.BestSellerOfTheWeek}
                                        onChange={() => setFieldValue('AdditionalBookDetails.BestSellerOfTheWeek', !values.AdditionalBookDetails.BestSellerOfTheWeek)}
                                    />
                                </BootstrapForm.Group>
                            </Col>
                            <Col md={6}>
                                <BootstrapForm.Group>
                                    <BootstrapForm.Check
                                        type="checkbox"
                                        id="NationalPoetryMonth"
                                        label="National Poetry Month"
                                        name="AdditionalBookDetails.NationalPoetryMonth"
                                        as={Field}
                                        checked={values.AdditionalBookDetails.NationalPoetryMonth}
                                        onChange={() => setFieldValue('AdditionalBookDetails.NationalPoetryMonth', !values.AdditionalBookDetails.NationalPoetryMonth)}
                                    />
                                </BootstrapForm.Group>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col md={6}>
                                <BootstrapForm.Group>
                                    <BootstrapForm.Check
                                        type="checkbox"
                                        id="InternationalBookerPrizeLonglist"
                                        label="International Booker Prize Longlist"
                                        name="AdditionalBookDetails.InternationalBookerPrizeLonglist"
                                        as={Field}
                                        checked={values.AdditionalBookDetails.InternationalBookerPrizeLonglist}
                                        onChange={() => setFieldValue('AdditionalBookDetails.InternationalBookerPrizeLonglist', !values.AdditionalBookDetails.InternationalBookerPrizeLonglist)}
                                    />
                                </BootstrapForm.Group>
                            </Col>
                            <Col md={6}>
                                <BootstrapForm.Group>
                                    <BootstrapForm.Check
                                        type="checkbox"
                                        id="BooksThatMakeYouSmarter"
                                        label="Books That Make You Smarter"
                                        name="AdditionalBookDetails.BooksThatMakeYouSmarter"
                                        as={Field}
                                        checked={values.AdditionalBookDetails.BooksThatMakeYouSmarter}
                                        onChange={() => setFieldValue('AdditionalBookDetails.BooksThatMakeYouSmarter', !values.AdditionalBookDetails.BooksThatMakeYouSmarter)}
                                    />
                                </BootstrapForm.Group>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col md={6}>
                                <BootstrapForm.Group>
                                    <BootstrapForm.Check
                                        type="checkbox"
                                        id="CarolShieldsPrizeForFictionLonglist"
                                        label="Carol Shields Prize For Fiction Longlist"
                                        name="AdditionalBookDetails.CarolShieldsPrizeForFictionLonglist"
                                        as={Field}
                                        checked={values.AdditionalBookDetails.CarolShieldsPrizeForFictionLonglist}
                                        onChange={() => setFieldValue('AdditionalBookDetails.CarolShieldsPrizeForFictionLonglist', !values.AdditionalBookDetails.CarolShieldsPrizeForFictionLonglist)}
                                    />
                                </BootstrapForm.Group>
                            </Col>
                        </Row>
                        <Button type='submit'>Update</Button>
                    </Form>
                )}
            </Formik>
        </Container>
    );
};

export default UpdateBook;
