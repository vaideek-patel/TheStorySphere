import React, { useEffect, useState } from 'react';
import CommonCarousel from '../../common/Carousel';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "../../../Global.css"
import { getBooks } from '../../../utils/axios-instance';
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { setLoader } from '../../../redux/actions/appAction';
import Loader from '../../common/Loader';

const Home = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { loader } = useSelector((state) => state.app);
    const [carolShieldsBooks, setCarolShieldsBooks] = useState([]);
    const [nationalPoetry, setNationalPoetry] = useState([]);
    const [bookerPrize, setBookerPrize] = useState([]);
    const [smartBooks, setSmartBooks] = useState([]);


    useEffect(() => {

        const fetchCoralShieldBooks = async () => {
            try {
                dispatch(setLoader(true))
                const response = await getBooks("books?AdditionalBookDetails.CarolShieldsPrizeForFictionLonglist=yes");
                if (response.success) {
                    setCarolShieldsBooks(response.data);
                    dispatch(setLoader(false))
                } else {
                    console.error("Failed to fetch the Products Data", response.error);
                }
            } catch (error) {
                console.error("Error while Fetching products", error);
            }
        };

        const fetchNationPoetryBooks = async () => {
            try {
                dispatch(setLoader(true))
                const response = await getBooks("books?AdditionalBookDetails.NationalPoetryMonth=yes");
                if (response.success) {
                    setNationalPoetry(response.data);
                    dispatch(setLoader(false))
                } else {
                    console.error("Failed to fetch the Products Data", response.error);
                }
            } catch (error) {
                console.error("Error while Fetching products", error);
            }
        };

        const fetchInternationalBookerPrizeBooks = async () => {
            try {
                dispatch(setLoader(true))
                const response = await getBooks("books?AdditionalBookDetails.InternationalBookerPrizeLonglist=yes");
                if (response.success) {
                    console.log(response.data);
                    setBookerPrize(response.data);
                    dispatch(setLoader(false))
                } else {
                    console.error("Failed to fetch the Products Data", response.error);
                }
            } catch (error) {
                console.error("Error while Fetching products", error);
            }
        };

        const fetchSmartBooks = async () => {
            try {
                dispatch(setLoader(true))
                const response = await getBooks("books?AdditionalBookDetails.BooksThatMakeYouSmarter=yes");
                if (response.success) {
                    setSmartBooks(response.data);
                    dispatch(setLoader(false))
                } else {
                    console.error("Failed to fetch the Products Data", response.error);
                }
            } catch (error) {
                console.error("Error while Fetching products", error);
            }
        };

        fetchSmartBooks()
        fetchCoralShieldBooks();
        fetchNationPoetryBooks();
        fetchInternationalBookerPrizeBooks();

    }, []);

    const handleBookClick = (bookId) => {
        console.log("Book clicked:", bookId);
        navigate(`/books/${bookId}`)
    };

    const handlePoetryImageClick = (bookId) => {
        navigate(`/books/${bookId}`)
    }

    const handleInternationalBookerPrizeImage = (bookId) => {
        navigate(`/books/${bookId}`)
    }

    const handleBooksThatMakeSmartImage = (bookId) => {
        navigate(`/books/${bookId}`)
    }

    const handleCarolShieldPrizeImage = (bookId) => {
        navigate(`/books/${bookId}`)
    }

    return (
        <>
            {loader && <Loader />}
            <CommonCarousel>
                <img id='95' onClick={(event) => handleBookClick(event.target.id)} src="https://images-production.bookshop.org/spree/promo_banner_slides/desktop_images/294/original/Bookshop.BooksellersLIbrarians.2048X600rev.jpg?1712671316" alt="First slide" />
                <img id='96' onClick={(event) => handleBookClick(event.target.id)} src="https://images-production.bookshop.org/spree/promo_banner_slides/desktop_images/293/original/Familiar_Bookshop_2048x600.jpg?1712671667" alt="Second slide" />
                <img id='97' onClick={(event) => handleBookClick(event.target.id)} src="https://www.bookswagon.com/bannerimages/80_inr.jpg?v=4.3" alt="Third slide" />
                <img id='98' onClick={(event) => handleBookClick(event.target.id)} src="https://www.bookswagon.com/bannerimages/79_inr.jpg?v=2.5" alt="Fourth slide" />
            </CommonCarousel>

            <div className="container mt-4">
                <div className="container mt-4">
                    <div className="row">
                        <div className="col-md-6">
                            <Card className="mb-3">
                                <div className="row g-0">
                                    <div className="col-md-4  d-flex overflow-hidden">
                                        <img src="https://images-us.bookshop.org/ingram/9781646221974.jpg?height=250&v=v2-5f7652f3d344f6b94469b0926aa98d4a" className="img-fluid me-3 custom" alt="New Books Image" />
                                        <img src="https://images-us.bookshop.org/ingram/9781649374189.jpg?height=250&v=v2-0e0c0a7fc2463723c5a977c9ca6a441e" className="img-fluid me-3 custom" alt="Best of the Week Image" />
                                        <img src="https://images-us.bookshop.org/ingram/9781649374189.jpg?height=250&v=v2-0e0c0a7fc2463723c5a977c9ca6a441e" className="img-fluid me-3 custom" alt="Best of the Week Image" />
                                    </div>
                                    <div className="col-md-8">
                                        <Card.Body>
                                            <Card.Title className='playfair-display-mygooglefont'><h2>New books</h2></Card.Title>
                                            <Card.Text>
                                                <Link to="/books/recentlyLaunched">View all (20)</Link>
                                            </Card.Text>
                                        </Card.Body>
                                    </div>
                                </div>
                            </Card>
                        </div>
                        <div className="col-md-6">
                            <Card className="mb-3">
                                <div className="row g-0">
                                    <div className="col-md-4  d-flex overflow-hidden">
                                        <div className='d-flex pd-19'>
                                            <img src="https://images-us.bookshop.org/ingram/9781649374189.jpg?height=250&v=v2-0e0c0a7fc2463723c5a977c9ca6a441e" className="img-fluid me-3 custom" alt="New Books Image" />
                                            <img src="https://images-us.bookshop.org/ingram/9781649374189.jpg?height=250&v=v2-0e0c0a7fc2463723c5a977c9ca6a441e" className="img-fluid me-3 custom" alt="Best of the Week Image" />
                                            <img src="https://images-us.bookshop.org/ingram/9781649374189.jpg?height=250&v=v2-0e0c0a7fc2463723c5a977c9ca6a441e" className="img-fluid me-3 custom" alt="Best of the Week Image" />                                    </div>
                                    </div>
                                    <div className="col-md-8">
                                        <Card.Body>
                                            <Card.Title className='playfair-display-mygooglefont'><h2>The Story Sphere's BestSellers of the Week</h2></Card.Title>
                                            <Card.Text>
                                                <Link to="/books/bestSellers-of-the-week">View all (10)</Link>
                                            </Card.Text>
                                        </Card.Body>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <Card className="mb-3">
                            <Card.Body>
                                <Card.Title className='playfair-display-mygooglefont'><h2>National Poetry Month</h2></Card.Title>
                                <Card.Text>
                                    <Link to="/books/nationalPoetryMonth">View all (10)</Link>
                                </Card.Text>
                                <div className="row g-0  img-scroll">
                                    <div className="col-md-12 d-flex  flex-nowrap overflow-auto">
                                        {nationalPoetry.map(book => (
                                            <img key={book.id} src={book.image} className="img-fluid me-3 custom" alt={book.title} style={{ "height": "250px" }} onClick={() => handlePoetryImageClick(book.id)} />
                                        ))}
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
                {/* Adding the grid for International Booker Prize Longlist */}
                <div className="grid">
                    <div className="col-md-10">
                        <h2 className='playfair-display-mygooglefont mb-3'>The 2024 International Booker Prize Longlist</h2>
                    </div>
                    <div className="col-md-12">
                        <div className="grid-container">
                            {bookerPrize.map(book => (
                                <div className="grid-item d-flex" key={book.id}>
                                    <img src={book.image} className="img-fluid custom" alt={book.title} />
                                    <div className="book-info" style={{ marginLeft: "10px" }}>
                                        <p className="book-title playfair-display-mygooglefont" onClick={() => handleInternationalBookerPrizeImage(book.id)}>{book.name}</p>
                                        <p className="book-author lora-mygooglefont">{book.author}</p>
                                        <p className="book-price">{book.price}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <br />

                <div className="row">
                    <div className="col-md-12">
                        <Card className="mb-3">
                            <Card.Body>
                                <Card.Title className='playfair-display-mygooglefont'><h2>The Books That Make You Smarter</h2></Card.Title>
                                {/* <Card.Title>The Books That Make you smarter</Card.Title> */}
                                <Card.Text>
                                    <Link to="/books/booksThatMakeSmarter">View all (10)</Link>
                                </Card.Text>
                                <div className="row g-0 image-scroll">
                                    <div className="col-md-12 d-flex flex-nowrap overflow-auto">
                                        {smartBooks.map(book => (
                                            <img key={book.id} src={book.image} className="img-fluid me-3 custom" alt={book.title} style={{ "height": "250px" }} onClick={() => handleBooksThatMakeSmartImage(book.id)} />
                                        ))}
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <Card className="mb-3">
                            <Card.Body>
                                <Card.Title className='playfair-display-mygooglefont'><h2>2024 Carol Shields Prize For Fiction Longlist</h2></Card.Title>
                                <Card.Text>
                                    <Link to="/books/CarolShieldsPrize">View all (10)</Link>
                                </Card.Text>
                                <div className="row g-0 image-scroll">
                                    <div className="col-md-12 d-flex flex-nowrap overflow-auto">
                                        {carolShieldsBooks.map(book => (
                                            <img key={book.id} src={book.image} className="img-fluid me-3 custom" alt={book.title} style={{ "height": "250px" }} onClick={() => { handleCarolShieldPrizeImage(book.id) }} />
                                        ))}
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                </div>

            </div>
        </>
    );
}

export default Home;
