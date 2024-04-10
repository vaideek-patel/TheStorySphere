import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { Container, Row, Col, Button, Form as BootstrapForm } from 'react-bootstrap';
import * as Yup from 'yup';
import { getBookById } from '../../../../../../utils/axios-instance';
import { useNavigate, useParams } from 'react-router-dom';

// import { getBooks, getCategory, getSubcategoriesByCategoryId, registerNewBook } from '../../../../../utils/axios-instance';
// import { useSelector } from 'react-redux';
import Select from 'react-select';

const UpdateBook = () => {
    const { bookId } = useParams()
    const [recentlyLaunced, setRecentlyLaunched] = useState(false);
    const [bestSeller, setBestSeller] = useState(false);
    const [bestSellerOfTheWeek, setBestSellerOfTheWeek] = useState(false);
    const [carolShieldsPrizeForFictionLonglist, setCarolShieldsPrizeForFictionLonglist] = useState(false);
    const [InternationalBookerPrizeLonglist, setInternationalBookerPrizeLonglist] = useState(false);
    const [booksThatMakeYouSmarter, setBooksThatMakeYouSmarter] = useState(false);
    const [nationalPoetryMonth, setNationalPoetryMonth] = useState(false);

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
                setRecentlyLaunched(response.data.recentlyLaunched === 'yes');
                setBestSeller(response.data.AdditionalBookDetails.BestSeller === 'yes');
                setBestSellerOfTheWeek(response.data.AdditionalBookDetails.BestSellerOfTheWeek === 'yes');
                setBooksThatMakeYouSmarter(response.data.AdditionalBookDetails.BooksThatMakeYouSmarter === 'yes');
                setNationalPoetryMonth(response.data.AdditionalBookDetails.NationalPoetryMonth === 'yes');
                setCarolShieldsPrizeForFictionLonglist(response.data.AdditionalBookDetails.CarolShieldsPrizeForFictionLonglist === 'yes');
                setInternationalBookerPrizeLonglist(response.data.AdditionalBookDetails.InternationalBookerPrizeLonglist === 'yes');
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

    // const handleSubmit = async (values, { resetForm }) => {
    //     console.log(booksDataForId.length)
    //     const lastId = booksDataForId.length > 0 ? parseInt(booksDataForId[booksDataForId.length - 1].id) + 1 : 1;
    //     console.log(lastId)
    //     values.id = lastId.toString();
    //     values.soldBy = sellerId;

    //     const listNewBook = await registerNewBook(values)
    //     console.log(listNewBook)
    //     console.log(values);
    //     resetForm();
    // };

    console.log(initialValues)

    return (
        <Container>
            <h1 className="text-center mt-5 mb-4 playfair-display-mygooglefont">Update Exsisting Book</h1>
            <Formik
                initialValues={initialValues}
            // initialValues={{
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
            // }}

            // validationSchema={validationSchema}
            // onSubmit={handleSubmit}
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
                                        checked={recentlyLaunced}
                                        onChange={() => setRecentlyLaunched(!recentlyLaunced)}
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
                                        checked={bestSeller} // Check if the value is "yes"
                                        onChange={() => setBestSeller(!bestSeller)}
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
                                        checked={bestSellerOfTheWeek}
                                        onChange={() => setBestSellerOfTheWeek(!bestSellerOfTheWeek)}
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
                                        checked={nationalPoetryMonth}
                                        onChange={() => setNationalPoetryMonth(!nationalPoetryMonth)}
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
                                        checked={InternationalBookerPrizeLonglist}
                                        onChange={() => setInternationalBookerPrizeLonglist(!InternationalBookerPrizeLonglist)}
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
                                        checked={booksThatMakeYouSmarter}
                                        onChange={() => setBooksThatMakeYouSmarter(!booksThatMakeYouSmarter)}
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
                                        checked={carolShieldsPrizeForFictionLonglist}
                                        onChange={() => carolShieldsPrizeForFictionLonglist(!carolShieldsPrizeForFictionLonglist)}
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

