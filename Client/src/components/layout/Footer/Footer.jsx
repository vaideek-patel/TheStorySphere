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
                <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
                <p>
                  <a href='#!' className='text-reset'>
                    Pricing
                  </a>
                </p>
                <p>
                  <a href='#!' className='text-reset'>
                    Settings
                  </a>
                </p>
                <p>
                  <a href='#!' className='text-reset'>
                    Orders
                  </a>
                </p>
                <p>
                  <a href='#!' className='text-reset'>
                    Help
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
