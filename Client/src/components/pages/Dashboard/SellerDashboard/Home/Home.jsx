import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { deleteBookData, deleteSellerData, getSellerDataBySellerId, getSellersBooksBySellerId } from '../../../../../utils/axios-instance';
import Table from '../../../../common/Table';
import { Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

const Home = () => {
  const navigate = useNavigate()
  const seller = useSelector((state) => state.role.seller);
  const [listedBooks, setListedBooks] = useState([]);
  const [sellerPermissions, setSellerPermissions] = useState({});

  const productsArray = [
    { key: "name", label: "Name" },
    { key: "author", label: "Author" },
    { key: "price", label: "Price" },
    { key: "category", label: "Category" },
    { key: "subcategoryName", label: "Sub-Category" },
  ];

  useEffect(() => {
    const fetchSellerData = async () => {
      try {
        const response = await getSellerDataBySellerId(seller.id);
        setSellerPermissions(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSellerBooks = async () => {
      try {
        const response = await getSellersBooksBySellerId(seller.id);
        setListedBooks(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSellerData();
    fetchSellerBooks();
  }, [seller.id]);


  const ListNewBook = (id) => {
    navigate(`/seller/registerNewBook/${id}`)
  }

  const handleUpdate = (bookId) => {
    if (sellerPermissions.update === 'yes') {
      console.log(bookId)
      navigate(`/seller/updateBook/${seller.id}/${bookId}`)
    } else {
      Swal.fire({
        icon: "error",
        title: "You're not allowed!",
        text: "Please Ask Admin!",
      });
    }
  }

  const DeleteListedBook = (bookId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this book again!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (sellerPermissions.delete === 'yes') {
          const response = await deleteBookData(bookId)
          const updateListing = listedBooks.filter(listedBooks => listedBooks.id !== bookId);
          setListedBooks(updateListing);
        } else {
          Swal.fire({
            icon: "error",
            title: "You're not allowed!",
            text: "Please Ask Admin!",
          });
        }
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
  }

  console.log(sellerPermissions)
  return (
    <>
      <Container className="py-4">

        <h2 className='playfair-display-mygooglefont'>Welcome to Seller DashBoard!</h2>
        <div className='d-flex justify-content-between align-items-center mb-3'>
          <h4 className='playfair-display-mygooglefont'>Manage Your Listings Here!</h4>
          {sellerPermissions.register === 'yes' ? (
            <Button variant='danger' onClick={ListNewBook}>List A New Book</Button>
          ) : (
            <Button variant='danger' disabled>List A New Book</Button>
          )}
        </div>

        <Table
          data={listedBooks}
          headers={productsArray}
          handleUpdate={handleUpdate}
          handleDelete={DeleteListedBook}
        />
      </Container>

    </>
  );
};

export default Home;
