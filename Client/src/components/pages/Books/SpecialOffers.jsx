import React from 'react';
import "../../../Global.css";

const SpecialOffers = () => {
  return (
    <>
      <div className="subCategory-heading-container">
        <h2 className='playfair-display-mygooglefont'>Explore Special Offers on The Story Sphere.</h2>
      </div>
      <div className="special-offers-points ms-5">
        <h3>Special Offers:</h3>
        <ul>
          <li>There's a 10% discount on these special titles every month from DK here!</li>
          <li>Get 15% off select titles from FSG & Picador here!</li>
          <li>Get 10% off THE WOMEN and more by Kristin Hannah!</li>
          <li>Get 15% off these classic Cormac McCarthy books!</li>
          <li>Get 10% off these books in the Grumpy Monkey series!</li>
          <li>Get 10% off OTHERWORLDLY and more by F.T. Lukens!</li>
          <li>Get 10% off these nerdy spring reads from MIT Press!</li>
          <li>Get 10% off AHOY by bestselling creator Sophie Blackall!</li>
        </ul>
      </div>
    </>
  );
};

export default SpecialOffers;
