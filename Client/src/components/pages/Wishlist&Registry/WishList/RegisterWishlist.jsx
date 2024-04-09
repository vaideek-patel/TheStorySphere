import React, { useState } from 'react';
import { Form, Button, Container, Card, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import "../../../../Global.css"

const RegisterWishlist = () => {
  const [wishlistName, setWishlistName] = useState('');
  // const [isPrivate, setIsPrivate] = useState(false);
  const [isRegistry, setIsRegistry] = useState(false);
  const [isAffiliate, setIsAffiliate] = useState(false);
  const [privacy, setPrivacy] = useState('private'); // Default privacy setting

  const handleWishlistNameChange = (event) => {
    setWishlistName(event.target.value);
  };

  const handlePrivacyChange = (value) => {
    setPrivacy(value);
  };

  // const handleIsPrivateChange = () => {
  //   setIsPrivate(!isPrivate);
  // };

  const handleIsRegistryChange = () => {
    setIsRegistry(!isRegistry);
  };

  const handleIsAffiliateChange = () => {
    setIsAffiliate(!isAffiliate);
  };

  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = {
      wishlistName,
      privacy,
      isRegistry,
      isAffiliate
    };

    // You can now use formData to perform any necessary actions, such as sending it to an API
    console.log(formData);
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Create a new wishlist or registry</h2>
      <Card className="custom-WishListRegistry-Card-width border-0">
        <Form onSubmit={handleSubmit}>
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
          <ToggleButtonGroup type="radio" name="privacy" defaultValue="private" onChange={handlePrivacyChange}>
            <ToggleButton value="private">Private</ToggleButton>
            <ToggleButton value="public">Public</ToggleButton>
          </ToggleButtonGroup>
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
          <Button variant="primary" type="submit" className="mt-3">Create Wishlist</Button>
        </Form>
      </Card>
    </Container>
  );
};

export default RegisterWishlist;
