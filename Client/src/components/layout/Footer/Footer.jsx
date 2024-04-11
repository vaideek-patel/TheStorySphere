import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';

const Footer = () => {
  return (
    <div>
      <MDBFooter bgColor='light' className='text-center text-lg-start text-muted' style={{ position: 'sticky', marginTop: 100, bottom: '0', width: '100%', zIndex: '1000' }}>
        <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
        </section>

        <section className=''>
          <MDBContainer className='text-center text-md-start mt-5'>
            <MDBRow className='mt-3'>
              <MDBCol md='3' lg='4' xl='3' className='mx-auto mb-4'>
                <h6 className='text-uppercase fw-bold mb-4'>
                  <MDBIcon color='secondary' icon='gem' className='me-3' />
                  The Story Sphere
                </h6>
                <p>
                  Welcome to "The Story Sphere" - Where every page turns into a new adventure!
                </p>

                {/* <img src="https://rails-assets-us.bookshop.org/assets/ClimateNeutralLabelCertifiedHorizontalWhiteOutline-17ebe1222195c2028711dcd4eb05d8ef1d83ad6f315c9f4445fa69fc570bfff2.png" className="img-fluid me-3 custom" style={{backgroundColor: '#00000'}} alt="New Books Image" /> */}
              </MDBCol>

              <MDBCol md='2' lg='2' xl='2' className='mx-auto mb-4'>
                <h6 className='text-uppercase fw-bold mb-4'>Products</h6>
                <p>
                  <a href='#!' className='text-reset'>
                    About
                  </a>
                </p>
                <p>
                  <a href='#!' className='text-reset'>
                    Support / Help
                  </a>
                </p>
                <p>
                  <a href='#!' className='text-reset'>
                    Gift Cards
                  </a>
                </p>
                <p>
                  <Link to="/seller/login" className='text-reset'>
                    TheStorySphere for Sellers
                  </Link>
                </p>
              </MDBCol>

              <MDBCol md='3' lg='2' xl='2' className='mx-auto mb-4'>
                <h6 className='text-uppercase fw-bold mb-4'>Might be Useful!</h6>
                <p>
                  <a href='#!' className='text-reset'>
                    Carrers - We're Hiring
                  </a>
                </p>
                <p>
                  <a href='#!' className='text-reset'>
                    Contact
                  </a>
                </p>
                <p>
                  <a href='#!' className='text-reset'>
                    Returns and Refund Policy
                  </a>
                </p>
                <p>
                  <a href='#!' className='text-reset'>
                    Privacy Notice
                  </a>
                </p>
              </MDBCol>

              <MDBCol md='4' lg='3' xl='3' className='mx-auto mb-md-0 mb-4'>
                <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
                <p>
                  <MDBIcon color='secondary' icon='home' className='me-2' />
                  New York, NY 10012, US
                </p>
                <p>
                  <MDBIcon color='secondary' icon='envelope' className='me-3' />
                  info@example.com
                </p>
                <p>
                  <MDBIcon color='secondary' icon='phone' className='me-3' /> + 01 234 567 88
                </p>
                <p>
                  <MDBIcon color='secondary' icon='print' className='me-3' /> + 01 234 567 89
                </p>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>

        <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
          © 2024 Copyright:
          <a className='text-reset fw-bold' href='https://mdbootstrap.com/'>
            TheStorySphere
          </a>
        </div>
      </MDBFooter>
    </div>
  );
};

export default Footer;
