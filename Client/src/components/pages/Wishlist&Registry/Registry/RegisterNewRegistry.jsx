import React, { useState } from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';
import "../../../../Global.css"

const RegisterNewRegistry = () => {
  const [wishlistName, setWishlistName] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [isRegistry, setIsRegistry] = useState(false);
  const [isAffiliate, setIsAffiliate] = useState(false);

  const handleWishlistNameChange = (event) => {
    setWishlistName(event.target.value);
  };

  const handleIsPrivateChange = () => {
    setIsPrivate(!isPrivate);
  };

  const handleIsRegistryChange = () => {
    setIsRegistry(!isRegistry);
  };

  const handleIsAffiliateChange = () => {
    setIsAffiliate(!isAffiliate);
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Create a new wishlist or registry</h2>
      <Card className="custom-WishListRegistry-Card-width border-0">
        <Form>
          <Form.Group controlId="wishlistName" className='mb-3'>
            <Form.Control
              type="text"
              placeholder="Wishlist name"
              value={wishlistName}
              onChange={handleWishlistNameChange}
            />
          </Form.Group>
          <h5>Sharing Settings</h5>
          <p>Private wishlists can only be seen by you. Public wishlists can be seen by anyone with the link.</p>
          <Form.Check
            type="checkbox"
            label="This wishlist is private"
            checked={isPrivate}
            onChange={handleIsPrivateChange}
          />
          <h5 className="mt-3">Registry Settings</h5>
          <p>Turn on Registry Settings to convert your wishlist into a registry. This allows you to set a shipping address to direct all purchases made from your list, as well as to set desired quantities for each individual item. The shipping address is never visible to anyone but you.</p>
          <Form.Check
            type="checkbox"
            label="This wishlist is a registry"
            checked={isRegistry}
            onChange={handleIsRegistryChange}
          />
          <h5 className="mt-3">Affiliate Settings</h5>
          <p>Link this wishlist to your favorite bookseller or affiliate. In doing so, all purchases made from your wishlist will benefit the linked bookseller or affiliate through commissions earned from each sale.</p>
          <Form.Check
            type="checkbox"
            label="Link to Affiliate"
            checked={isAffiliate}
            onChange={handleIsAffiliateChange}
          />
          <Button variant="primary" className="mt-3">Create Wishlist</Button>
        </Form>
      </Card>
    </Container>
  );
};

export default RegisterNewRegistry;
