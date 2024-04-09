import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { Container, Row, Col, Button, Form as BootstrapForm } from 'react-bootstrap';
import * as Yup from 'yup';
import { getBookById, registerNewBook, updateBookData } from '../../../../../../utils/axios-instance';
import { useNavigate, useParams } from 'react-router-dom';

// import { getBooks, getCategory, getSubcategoriesByCategoryId, registerNewBook } from '../../../../../utils/axios-instance';
// import { useSelector } from 'react-redux';
import Select from 'react-select';

const UpdateBook = () => {
    const { bookId } = useParams()
    const [initialValues, setinitialValues] = useState({
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
        recentlyLaunched: false,
        AdditionalBookDetails: {
            BestSeller: false,
            BestSellerOfTheWeek: false,
            NationalPoetryMonth: false,
            InternationalBookerPrizeLonglist: false,
            BooksThatMakeYouSmarter: false,
            CarolShieldsPrizeForFictionLonglist: false,
        }
    })
    // const sellerId = useSelector((state) => state.role.seller.id);
    // const [categories, setCategories] = useState([]);
    // const [subcategories, setSubcategories] = useState([]);
    // const [selectedCategoryId, setSelectedCategoryId] = useState('');
    // const [booksDataForId, setBooksDataForId] = useState([]);


    useEffect(() => {
        const fetchBookById = async () => {
            try {
                const response = await getBookById(bookId);
                console.log(response.data)
                const bookData = response.data;
                setinitialValues(bookData)
            } catch (error) {
                console.log(error);
            }
        };
        fetchBookById()
    }, []);

    // const handleCategoryChange = async (selectedOption, { setFieldValue }) => {
    //     setSelectedCategoryId(selectedOption.value);
    //     const selectedCategory = categories.find(category => category.id === selectedOption.value);
    //     setFieldValue('categoryId', selectedOption.value);
    //     setFieldValue('category', selectedCategory ? selectedCategory.name : '');

    //     try {
    //         const response = await getSubcategoriesByCategoryId(selectedOption.value);
    //         setSubcategories(response.data);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    // const handleSubcategoryChange = async (selectedOption, { setFieldValue }) => {
    //     setFieldValue('subCategoryId', selectedOption.value);
    //     setFieldValue('subcategoryName', selectedOption.label);
    // };

    // const validationSchema = Yup.object({
    //     // categoryId: Yup.string().required('Required'),
    //     // subCategoryId: Yup.string().required('Required'),
    // });

    const handleSubmit = async (values, { resetForm }) => {
        // const listNewBook = await updateBookData(bookId, values)
        // console.log(listNewBook)
        console.log(values);
        // resetForm();
    };

    console.log(initialValues)

    return (
        <Container>
            <h1 className="text-center mt-5 mb-4">Update Exsisting Book</h1>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
            >
                {({ values, errors, touched, setFieldValue }) => (
                    <Form>
                        <Row className="mb-3">
                            <Col md={6}>
                                <BootstrapForm.Group>
                                    <BootstrapForm.Label>Name</BootstrapForm.Label>
                                    {console.log(initialValues)}
                                    <Field name="name" type="text" className="form-control" value={initialValues.name} />
                                    {/* {errors.name && touched.name && <div className="text-danger">{errors.name}</div>} */}
                                </BootstrapForm.Group>
                            </Col>
                            <Col md={6}>
                                <BootstrapForm.Group>
                                    <BootstrapForm.Label>Author</BootstrapForm.Label>
                                    <Field name="author" type="text" className="form-control" value={initialValues.author} />
                                    {/* {errors.author && touched.author && <div className="text-danger">{errors.author}</div>} */}
                                </BootstrapForm.Group>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col md={6}>
                                <BootstrapForm.Group>
                                    <BootstrapForm.Label>Description</BootstrapForm.Label>
                                    <Field name="description" as="textarea" rows={4} className="form-control" value={initialValues.description} />
                                    {/* {errors.description && touched.description && <div className="text-danger">{errors.description}</div>} */}
                                </BootstrapForm.Group>
                            </Col>
                            <Col md={6}>
                                <BootstrapForm.Group>
                                    <BootstrapForm.Label>Price</BootstrapForm.Label>
                                    <Field name="price" type="number" className="form-control" value={initialValues.price} />
                                    {/* {errors.price && touched.price && <div className="text-danger">{errors.price}</div>} */}
                                </BootstrapForm.Group>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col md={6}>
                                <BootstrapForm.Group>
                                    <BootstrapForm.Label>Release Date</BootstrapForm.Label>
                                    <Field name="releaseDate" type="date" className="form-control" value={initialValues.releaseDate} />
                                    {/* {errors.releaseDate && touched.releaseDate && <div className="text-danger">{errors.releaseDate}</div>} */}
                                </BootstrapForm.Group>
                            </Col>
                            <Col md={6}>
                                <BootstrapForm.Group>
                                    <BootstrapForm.Label>Image URL</BootstrapForm.Label>
                                    <Field name="image" type="url" className="form-control" value={initialValues.image} />
                                    {/* {errors.image && touched.image && <div className="text-danger">{errors.image}</div>} */}
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
                                        checked={values.recentlyLaunched === "yes"} // Check if the value is "yes"
                                        onChange={(e) =>
                                            setFieldValue(
                                                "recentlyLaunched",
                                                e.target.checked ? "yes" : "no" // Set the value to "yes" or "no" based on checkbox state
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
                                        checked={values.AdditionalBookDetails.BestSeller === "yes"} // Check if the value is "yes"
                                        onChange={(e) =>
                                            setFieldValue(
                                                "AdditionalBookDetails.BestSeller",
                                                e.target.checked ? "yes" : "no" // Set the value to "yes" or "no" based on checkbox state
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
                        <Button type='submit'>Update</Button>
                    </Form>
                )}
            </Formik>
        </Container>
    );
};

export default UpdateBook;



























import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { Container, Row, Col, Button, Form as BootstrapForm } from 'react-bootstrap';
import * as Yup from 'yup';
import { getBookById, updateBookData } from '../../../../../../utils/axios-instance';
import { useNavigate, useParams } from 'react-router-dom';

import Select from 'react-select';

const UpdateBook = () => {
    const { bookId } = useParams()
    // const [initialValues, setinitialValues] = useState({
    //     name: '',
    //     author: '',
    //     description: '',
    //     price: '',
    //     releaseDate: '',
    //     image: '',
    //     categoryId: '',
    //     category: '',
    //     subCategoryId: '',
    //     subcategoryName: '',
    //     recentlyLaunched: false,
    //     AdditionalBookDetails: {
    //         BestSeller: false,
    //         BestSellerOfTheWeek: false,
    //         NationalPoetryMonth: false,
    //         InternationalBookerPrizeLonglist: false,
    //         BooksThatMakeYouSmarter: false,
    //         CarolShieldsPrizeForFictionLonglist: false,
    //     }
    // })

    const [data, setData] = useState(null)


    useEffect(() => {
        const fetchBookById = async () => {
            try {
                const response = await getBookById(bookId);
                console.log(response.data)
                setData(response.data)
                // const bookData = response.data;
                // setinitialValues(bookData)
            } catch (error) {
                console.log(error);
            }
        };
        fetchBookById()
    }, []);

    const handleSubmit = async (values, { resetForm }) => {
        const listNewBook = await updateBookData(bookId, values)
        console.log(listNewBook)
        console.log(values);
        // resetForm();
    };

    console.log(initialValues)

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setFieldValue(name, value);
    // };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prevProduct => ({
            ...prevProduct,
            [name]: value
        }));
    };
    return (
        <Container>
            <h1 className="text-center mt-5 mb-4">Update Exsisting Book</h1>
            <Formik
                initialValues={data}
                onSubmit={handleSubmit}
            >
                {({ values, setFieldValue }) => (
                    <Form>
                        <Row className="mb-3">
                            <Col md={6}>
                                <BootstrapForm.Group>
                                    <BootstrapForm.Label>Name</BootstrapForm.Label>
                                    <Field name="name" type="text" className="form-control" value={data.name}
                                        onChange={handleChange} />
                                    {/* {errors.name && touched.name && <div className="text-danger">{errors.name}</div>} */}
                                </BootstrapForm.Group>
                            </Col>
                            <Col md={6}>
                                <BootstrapForm.Group>
                                    <BootstrapForm.Label>Author</BootstrapForm.Label>
                                    <Field name="author" type="text" className="form-control" onChange={handleChange} value={initialValues.author} />
                                    {/* {errors.author && touched.author && <div className="text-danger">{errors.author}</div>} */}
                                </BootstrapForm.Group>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col md={6}>
                                <BootstrapForm.Group>
                                    <BootstrapForm.Label>Description</BootstrapForm.Label>
                                    <Field name="description" as="textarea" rows={4} className="form-control" onChange={handleChange} value={initialValues.description} />
                                    {/* {errors.description && touched.description && <div className="text-danger">{errors.description}</div>} */}
                                </BootstrapForm.Group>
                            </Col>
                            <Col md={6}>
                                <BootstrapForm.Group>
                                    <BootstrapForm.Label>Price</BootstrapForm.Label>
                                    <Field name="price" type="number" className="form-control" onChange={handleChange} value={initialValues.price} />
                                    {/* {errors.price && touched.price && <div className="text-danger">{errors.price}</div>} */}
                                </BootstrapForm.Group>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col md={6}>
                                <BootstrapForm.Group>
                                    <BootstrapForm.Label>Release Date</BootstrapForm.Label>
                                    <Field name="releaseDate" type="date" className="form-control" onChange={handleChange} value={initialValues.releaseDate} />
                                    {/* {errors.releaseDate && touched.releaseDate && <div className="text-danger">{errors.releaseDate}</div>} */}
                                </BootstrapForm.Group>
                            </Col>
                            <Col md={6}>
                                <BootstrapForm.Group>
                                    <BootstrapForm.Label>Image URL</BootstrapForm.Label>
                                    <Field name="image" type="url" className="form-control" onChange={handleChange} value={initialValues.image} />
                                    {/* {errors.image && touched.image && <div className="text-danger">{errors.image}</div>} */}
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
                                        checked={values.recentlyLaunched === "yes"} // Check if the value is "yes"
                                        onChange={(e) =>
                                            setFieldValue(
                                                "recentlyLaunched",
                                                e.target.checked ? "yes" : "no" // Set the value to "yes" or "no" based on checkbox state
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
                                        checked={values.AdditionalBookDetails.BestSeller === "yes"} // Check if the value is "yes"
                                        onChange={(e) =>
                                            setFieldValue(
                                                "AdditionalBookDetails.BestSeller",
                                                e.target.checked ? "yes" : "no" // Set the value to "yes" or "no" based on checkbox state
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
                        </Row>
                        <Button type='submit'>Update</Button>
                    </Form>
                )}
            </Formik>
        </Container>
    );
};

export default UpdateBook;


