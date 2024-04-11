import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { Container, Row, Col, Button, Form as BootstrapForm } from 'react-bootstrap';
import * as Yup from 'yup';
import { getBooks, getCategory, getSubcategoriesByCategoryId, registerNewBook } from '../../../../../utils/axios-instance';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const RegisterBook = () => {
    const navigate = useNavigate()
    const sellerId = useSelector((state) => state.role.seller.id);
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState('');
    const [booksDataForId, setBooksDataForId] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getCategory();
                setCategories(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        const fetchBooks = async () => {
            try {
                const response = await getBooks('books');
                console.log(response.data)
                setBooksDataForId(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchBooks()
        fetchData();
    }, []);

    const handleCategoryChange = async (selectedOption, { setFieldValue }) => {
        setSelectedCategoryId(selectedOption.value);
        const selectedCategory = categories.find(category => category.id === selectedOption.value);
        setFieldValue('categoryId', selectedOption.value);
        setFieldValue('category', selectedCategory ? selectedCategory.name : '');

        try {
            const response = await getSubcategoriesByCategoryId(selectedOption.value);
            setSubcategories(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubcategoryChange = async (selectedOption, { setFieldValue }) => {
        setFieldValue('subCategoryId', selectedOption.value);
        setFieldValue('subcategoryName', selectedOption.label);
    };

    const validationSchema = Yup.object({
        // categoryId: Yup.string().required('Required'),
        // subCategoryId: Yup.string().required('Required'),
    });

    const handleSubmit = async (values, { resetForm }) => {
        console.log(booksDataForId.length)
        const lastId = booksDataForId.length > 0 ? parseInt(booksDataForId[booksDataForId.length - 1].id) + 1 : 1;
        values.id = lastId.toString();
        values.soldBy = sellerId;

        const listNewBook = await registerNewBook(values)
        Swal.fire({
            title: "Listed New Book!",
            icon: "success"
        });
        navigate("/seller")
        resetForm();
    };

    return (
        <Container>
            <h1 className="text-center mt-5 mb-4 playfair-display-mygooglefont">Register New Book</h1>
            <Formik
                initialValues={{
                    name: '',
                    author: '',
                    description: '',
                    price: '',
                    releaseDate: '',
                    image: '',
                    categoryId: '',
                    category: '',
                    subCategoryId: '',
                    subcategoryName: '',
                    recentlyLaunched: 'no', // Set default value
                    AdditionalBookDetails: {
                        BestSeller: 'no', // Set default value
                        BestSellerOfTheWeek: 'no', // Set default value
                        NationalPoetryMonth: 'no', // Set default value
                        InternationalBookerPrizeLonglist: 'no', // Set default value
                        BooksThatMakeYouSmarter: 'no', // Set default value
                        CarolShieldsPrizeForFictionLonglist: 'no', // Set default value
                    }
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ values, errors, touched, setFieldValue }) => (
                    <Form>
                        <Row className="mb-3">
                            <Col md={6}>
                                <BootstrapForm.Group>
                                    <BootstrapForm.Label>Name</BootstrapForm.Label>
                                    <Field name="name" type="text" className="form-control" />
                                    {/* {errors.name && touched.name && <div className="text-danger">{errors.name}</div>} */}
                                </BootstrapForm.Group>
                            </Col>
                            <Col md={6}>
                                <BootstrapForm.Group>
                                    <BootstrapForm.Label>Author</BootstrapForm.Label>
                                    <Field name="author" type="text" className="form-control" />
                                    {/* {errors.author && touched.author && <div className="text-danger">{errors.author}</div>} */}
                                </BootstrapForm.Group>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col md={6}>
                                <BootstrapForm.Group>
                                    <BootstrapForm.Label>Description</BootstrapForm.Label>
                                    <Field name="description" as="textarea" rows={4} className="form-control" />
                                    {/* {errors.description && touched.description && <div className="text-danger">{errors.description}</div>} */}
                                </BootstrapForm.Group>
                            </Col>
                            <Col md={6}>
                                <BootstrapForm.Group>
                                    <BootstrapForm.Label>Price</BootstrapForm.Label>
                                    <Field name="price" type="number" className="form-control" />
                                    {/* {errors.price && touched.price && <div className="text-danger">{errors.price}</div>} */}
                                </BootstrapForm.Group>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col md={6}>
                                <BootstrapForm.Group>
                                    <BootstrapForm.Label>Release Date</BootstrapForm.Label>
                                    <Field name="releaseDate" type="date" className="form-control" />
                                    {/* {errors.releaseDate && touched.releaseDate && <div className="text-danger">{errors.releaseDate}</div>} */}
                                </BootstrapForm.Group>
                            </Col>
                            <Col md={6}>
                                <BootstrapForm.Group>
                                    <BootstrapForm.Label>Image URL</BootstrapForm.Label>
                                    <Field name="image" type="url" className="form-control" />
                                    {/* {errors.image && touched.image && <div className="text-danger">{errors.image}</div>} */}
                                </BootstrapForm.Group>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col md={6}>
                                <BootstrapForm.Group>
                                    <BootstrapForm.Label>Category</BootstrapForm.Label>
                                    <Select
                                        name="categoryId"
                                        options={categories.map(category => ({ value: category.id, label: category.name }))}
                                        onChange={(selectedOption) => handleCategoryChange(selectedOption, { setFieldValue })}
                                    />
                                    {/* {errors.categoryId && touched.categoryId && <div className="text-danger">{errors.categoryId}</div>} */}
                                </BootstrapForm.Group>
                            </Col>
                            <Col md={6}>
                                <BootstrapForm.Group>
                                    <BootstrapForm.Label>Subcategory</BootstrapForm.Label>
                                    <Select
                                        name="subCategoryId"
                                        options={subcategories.map(subcategory => ({ value: subcategory.id, label: subcategory.name }))}
                                        isDisabled={!selectedCategoryId}
                                        onChange={(selectedOption) => handleSubcategoryChange(selectedOption, { setFieldValue })}
                                    />
                                    {/* {errors.subCategoryId && touched.subCategoryId && <div className="text-danger">{errors.subCategoryId}</div>} */}
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
                                        name="AdditionalBookDetails.recentlyLaunched"
                                        as={Field}
                                        checked={values.AdditionalBookDetails.recentlyLaunched}
                                        onChange={(e) =>
                                            setFieldValue(
                                                "recentlyLaunched",
                                                e.target.checked ? "yes" : "no"
                                            )
                                        }
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
                                        onChange={(e) =>
                                            setFieldValue(
                                                "AdditionalBookDetails.BestSeller",
                                                e.target.checked ? "yes" : "no"
                                            )
                                        }
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
                                        onChange={(e) =>
                                            setFieldValue(
                                                "AdditionalBookDetails.BestSellerOfTheWeek",
                                                e.target.checked ? "yes" : "no"
                                            )
                                        }
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
                                        onChange={(e) =>
                                            setFieldValue(
                                                "AdditionalBookDetails.NationalPoetryMonth",
                                                e.target.checked ? "yes" : "no"
                                            )
                                        }
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
                                        onChange={(e) =>
                                            setFieldValue(
                                                "AdditionalBookDetails.InternationalBookerPrizeLonglist",
                                                e.target.checked ? "yes" : "no"
                                            )
                                        }
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
                                        onChange={(e) =>
                                            setFieldValue(
                                                "AdditionalBookDetails.BooksThatMakeYouSmarter",
                                                e.target.checked ? "yes" : "no"
                                            )
                                        }
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
                                        onChange={(e) =>
                                            setFieldValue(
                                                "AdditionalBookDetails.CarolShieldsPrizeForFictionLonglist",
                                                e.target.checked ? "yes" : "no"
                                            )
                                        }
                                    />
                                </BootstrapForm.Group>
                            </Col>
                            {/*  <Col md={6}>
                                <BootstrapForm.Group>
                                    <BootstrapForm.Check
                                        type="checkbox"
                                        id="BestSeller"
                                        label="Best Seller"
                                        name="AdditionalBookDetails.BestSeller"
                                        as={Field}
                                        checked={values.AdditionalBookDetails.BestSeller}
                                        onChange={(e) =>
                                            setFieldValue(
                                                "AdditionalBookDetails.BestSeller",
                                                e.target.checked ? "yes" : "no"
                                            )
                                        }
                                    />
                                </BootstrapForm.Group>
                            </Col>*/}
                        </Row>
                        <Button type='submit'>Submit</Button>
                    </Form>
                )}
            </Formik>
        </Container>
    );
};

export default RegisterBook;

