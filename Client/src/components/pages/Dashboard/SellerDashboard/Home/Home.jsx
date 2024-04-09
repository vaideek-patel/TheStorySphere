import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getSellersBooksBySellerId } from '../../../../../utils/axios-instance';
import Table from '../../../../common/Table';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate()
  const seller = useSelector((state) => state.role.seller);
  const [listedBooks, setListedBooks] = useState([]);

  const productsArray = [
    { key: "name", label: "Name" },
    { key: "author", label: "Author" },
    { key: "price", label: "Price" },
    { key: "category", label: "Category" },
    { key: "subcategoryName", label: "Sub-Category" },
  ];

  useEffect(() => {
    const fetchSellerBooks = async () => {
      try {
        const response = await getSellersBooksBySellerId(seller.id);
        setListedBooks(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSellerBooks();
  }, []);

  const ListNewBook = (id) => {
    console.log(id)
    navigate(`/seller/registerNewBook/${id}`)
  }

  const handleUpdate = (bookId) => {
    console.log(bookId)
    navigate(`/seller/updateBook/${seller.id}/${bookId}`)

  }


  return (
    <>
      <div className='d-flex justify-content-between align-items-center mb-3'>
        <h3>Welcome to Seller HomePage</h3>
        <Button variant='danger' onClick={() => ListNewBook(seller.id)}>List a new Book</Button>
      </div>

      <Table
        data={listedBooks}
        headers={productsArray}
        handleUpdate={handleUpdate}
      // handleDelete={handleDelete}
      />
    </>
  );
};

export default Home;
