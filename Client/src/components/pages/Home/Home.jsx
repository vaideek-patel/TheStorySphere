import React from 'react';
import CommonCarousel from '../../common/Carousel';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "../../../Global.css"

const Home = () => {
    return (
        <>
            <CommonCarousel>
                <img src="https://images-production.bookshop.org/spree/promo_banner_slides/desktop_images/294/original/DESMOND_Poverty_TR_bookshop_2048x600.jpg?1711464411" alt="Second slide" />
                <img src="https://images-production.bookshop.org/spree/promo_banner_slides/desktop_images/293/original/ABDURRAQIB_TheresAlwaysThisYear_HC_bookshop_2048x600.jpg?1711464486" alt="Third slide" />
                <img src="https://images-production.bookshop.org/spree/promo_banner_slides/desktop_images/293/original/AliSmith_Bookshop_2048x600B_%281%29.jpg?1712066742" alt="Third slide" />
                <img src="https://images-production.bookshop.org/spree/promo_banner_slides/desktop_images/294/original/2048_600_SHES_NOT_SORRY.jpg?1712066314" alt="Third slide" />
            </CommonCarousel>

            <div className="container mt-4">
                <div className="container mt-4">
                    <div className="row">
                        <div className="col-md-6">
                            <Card className="mb-3">
                                <div className="row g-0">
                                    <div className="col-md-4  d-flex overflow-hidden">
                                        <img src="https://images-us.bookshop.org/ingram/9781646221974.jpg?height=250&v=v2-5f7652f3d344f6b94469b0926aa98d4a" className="img-fluid me-3" alt="New Books Image" />
                                        <img src="https://images-us.bookshop.org/ingram/9781649374189.jpg?height=250&v=v2-0e0c0a7fc2463723c5a977c9ca6a441e" className="img-fluid me-3" alt="Best of the Week Image" />
                                        <img src="https://images-us.bookshop.org/ingram/9781649374189.jpg?height=250&v=v2-0e0c0a7fc2463723c5a977c9ca6a441e" className="img-fluid me-3" alt="Best of the Week Image" />
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
                                            <img src="https://images-us.bookshop.org/ingram/9781649374189.jpg?height=250&v=v2-0e0c0a7fc2463723c5a977c9ca6a441e" className="img-fluid me-3" alt="New Books Image" />
                                            <img src="https://images-us.bookshop.org/ingram/9781649374189.jpg?height=250&v=v2-0e0c0a7fc2463723c5a977c9ca6a441e" className="img-fluid me-3" alt="Best of the Week Image" />
                                            <img src="https://images-us.bookshop.org/ingram/9781649374189.jpg?height=250&v=v2-0e0c0a7fc2463723c5a977c9ca6a441e" className="img-fluid me-3" alt="Best of the Week Image" />                                    </div>
                                    </div>
                                    <div className="col-md-8">
                                        <Card.Body>
                                        <Card.Title className='playfair-display-mygooglefont'><h2>The Story Sphere's BestSellers of the Week</h2></Card.Title>
                                            <Card.Text>
                                                <Link to="/best-of-the-week">View all (10)</Link>
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
                                    <Link to="/national-poetry-month">View all (10)</Link>
                                </Card.Text>
                                <div className="row g-0 image-scroll">
                                    <div className="col-md-12 d-flex flex-nowrap overflow-auto">
                                        <img src="https://images-us.bookshop.org/ingram/9781644452752.jpg?height=250&v=v2-4275c026893579df3d5230ea38b48c63" className="img-fluid me-3" alt="Image 1" />
                                        <img src="https://images-us.bookshop.org/ingram/9781644452660.jpg?height=250&v=v2-47828ed3acb16c78098f5ec00ff2598f" className="img-fluid me-3" alt="Image 2" />
                                        <img src="https://images-us.bookshop.org/ingram/9780316417525.jpg?height=250&v=v2-e8311ad439f7f99fcbee6777901c2718" className="img-fluid me-3" alt="Image 3" />
                                        <img src="https://images-us.bookshop.org/ingram/9780316417525.jpg?height=250&v=v2-e8311ad439f7f99fcbee6777901c2718" className="img-fluid me-3" alt="Image 3" />
                                        <img src="https://images-us.bookshop.org/ingram/9780316417525.jpg?height=250&v=v2-e8311ad439f7f99fcbee6777901c2718" className="img-fluid me-3" alt="Image 3" />
                                        <img src="https://images-us.bookshop.org/ingram/9781644452752.jpg?height=250&v=v2-4275c026893579df3d5230ea38b48c63" className="img-fluid me-3" alt="Image 1" />
                                        <img src="https://images-us.bookshop.org/ingram/9781644452752.jpg?height=250&v=v2-4275c026893579df3d5230ea38b48c63" className="img-fluid me-3" alt="Image 1" />
                                        <img src="https://images-us.bookshop.org/ingram/9781644452752.jpg?height=250&v=v2-4275c026893579df3d5230ea38b48c63" className="img-fluid me-3" alt="Image 1" />
                                        <img src="https://images-us.bookshop.org/ingram/9781644452752.jpg?height=250&v=v2-4275c026893579df3d5230ea38b48c63" className="img-fluid me-3" alt="Image 1" />
                                        <img src="https://images-us.bookshop.org/ingram/9781644452752.jpg?height=250&v=v2-4275c026893579df3d5230ea38b48c63" className="img-fluid me-3" alt="Image 1" />
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
                {/* Adding the grid for International Booker Prize Longlist */}
                <div className="row">
                    <div className="col-md-12">
                        <h2 className='playfair-display-mygooglefont'>The 2024 International Booker Prize Longlist</h2>
                    </div>
                    <div className="col-md-12">
                        <div className="grid-container">
                            <div className="grid-item">
                                <img src="https://images-us.bookshop.org/ingram/9781644452752.jpg?height=250&v=v2-4275c026893579df3d5230ea38b48c63" className="img-fluid" alt="Book 1" />
                            </div>
                            <div className="grid-item">
                                <img src="https://images-us.bookshop.org/ingram/9781644452752.jpg?height=250&v=v2-4275c026893579df3d5230ea38b48c63" className="img-fluid" alt="Book 2" />
                            </div>
                            <div className="grid-item">
                                <img src="https://images-us.bookshop.org/ingram/9781644452752.jpg?height=250&v=v2-4275c026893579df3d5230ea38b48c63" className="img-fluid" alt="Book 3" />
                            </div>
                            <div className="grid-item">
                                <img src="https://images-us.bookshop.org/ingram/9781644452752.jpg?height=250&v=v2-4275c026893579df3d5230ea38b48c63" className="img-fluid" alt="Book 4" />
                            </div>
                            <div className="grid-item">
                                <img src="https://images-us.bookshop.org/ingram/9781644452752.jpg?height=250&v=v2-4275c026893579df3d5230ea38b48c63" className="img-fluid" alt="Book 5" />
                            </div>
                            <div className="grid-item">
                                <img src="https://images-us.bookshop.org/ingram/9781644452752.jpg?height=250&v=v2-4275c026893579df3d5230ea38b48c63" className="img-fluid" alt="Book 6" />
                            </div>
                            <div className="grid-item">
                                <img src="https://images-us.bookshop.org/ingram/9781644452752.jpg?height=250&v=v2-4275c026893579df3d5230ea38b48c63" className="img-fluid" alt="Book 7" />
                            </div>
                            <div className="grid-item">
                                <img src="https://images-us.bookshop.org/ingram/9781644452752.jpg?height=250&v=v2-4275c026893579df3d5230ea38b48c63" className="img-fluid" alt="Book 8" />
                            </div>
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
                                    <Link to="/national-poetry-month">View all (10)</Link>
                                </Card.Text>
                                <div className="row g-0 image-scroll">
                                    <div className="col-md-12 d-flex flex-nowrap overflow-auto">
                                        <img src="https://images-us.bookshop.org/ingram/9781644452752.jpg?height=250&v=v2-4275c026893579df3d5230ea38b48c63" className="img-fluid me-3" alt="Image 1" />
                                        <img src="https://images-us.bookshop.org/ingram/9781644452660.jpg?height=250&v=v2-47828ed3acb16c78098f5ec00ff2598f" className="img-fluid me-3" alt="Image 2" />
                                        <img src="https://images-us.bookshop.org/ingram/9780316417525.jpg?height=250&v=v2-e8311ad439f7f99fcbee6777901c2718" className="img-fluid me-3" alt="Image 3" />
                                        <img src="https://images-us.bookshop.org/ingram/9780316417525.jpg?height=250&v=v2-e8311ad439f7f99fcbee6777901c2718" className="img-fluid me-3" alt="Image 3" />
                                        <img src="https://images-us.bookshop.org/ingram/9780316417525.jpg?height=250&v=v2-e8311ad439f7f99fcbee6777901c2718" className="img-fluid me-3" alt="Image 3" />
                                        <img src="https://images-us.bookshop.org/ingram/9781644452752.jpg?height=250&v=v2-4275c026893579df3d5230ea38b48c63" className="img-fluid me-3" alt="Image 1" />
                                        <img src="https://images-us.bookshop.org/ingram/9781644452752.jpg?height=250&v=v2-4275c026893579df3d5230ea38b48c63" className="img-fluid me-3" alt="Image 1" />
                                        <img src="https://images-us.bookshop.org/ingram/9781644452752.jpg?height=250&v=v2-4275c026893579df3d5230ea38b48c63" className="img-fluid me-3" alt="Image 1" />
                                        <img src="https://images-us.bookshop.org/ingram/9781644452752.jpg?height=250&v=v2-4275c026893579df3d5230ea38b48c63" className="img-fluid me-3" alt="Image 1" />
                                        <img src="https://images-us.bookshop.org/ingram/9781644452752.jpg?height=250&v=v2-4275c026893579df3d5230ea38b48c63" className="img-fluid me-3" alt="Image 1" />
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
                                    <Link to="/national-poetry-month">View all (10)</Link>
                                </Card.Text>
                                <div className="row g-0 image-scroll">
                                    <div className="col-md-12 d-flex flex-nowrap overflow-auto">
                                        <img src="https://images-us.bookshop.org/ingram/9781644452752.jpg?height=250&v=v2-4275c026893579df3d5230ea38b48c63" className="img-fluid me-3" alt="Image 1" />
                                        <img src="https://images-us.bookshop.org/ingram/9781644452660.jpg?height=250&v=v2-47828ed3acb16c78098f5ec00ff2598f" className="img-fluid me-3" alt="Image 2" />
                                        <img src="https://images-us.bookshop.org/ingram/9780316417525.jpg?height=250&v=v2-e8311ad439f7f99fcbee6777901c2718" className="img-fluid me-3" alt="Image 3" />
                                        <img src="https://images-us.bookshop.org/ingram/9780316417525.jpg?height=250&v=v2-e8311ad439f7f99fcbee6777901c2718" className="img-fluid me-3" alt="Image 3" />
                                        <img src="https://images-us.bookshop.org/ingram/9780316417525.jpg?height=250&v=v2-e8311ad439f7f99fcbee6777901c2718" className="img-fluid me-3" alt="Image 3" />
                                        <img src="https://images-us.bookshop.org/ingram/9781644452752.jpg?height=250&v=v2-4275c026893579df3d5230ea38b48c63" className="img-fluid me-3" alt="Image 1" />
                                        <img src="https://images-us.bookshop.org/ingram/9781644452752.jpg?height=250&v=v2-4275c026893579df3d5230ea38b48c63" className="img-fluid me-3" alt="Image 1" />
                                        <img src="https://images-us.bookshop.org/ingram/9781644452752.jpg?height=250&v=v2-4275c026893579df3d5230ea38b48c63" className="img-fluid me-3" alt="Image 1" />
                                        <img src="https://images-us.bookshop.org/ingram/9781644452752.jpg?height=250&v=v2-4275c026893579df3d5230ea38b48c63" className="img-fluid me-3" alt="Image 1" />
                                        <img src="https://images-us.bookshop.org/ingram/9781644452752.jpg?height=250&v=v2-4275c026893579df3d5230ea38b48c63" className="img-fluid me-3" alt="Image 1" />
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
