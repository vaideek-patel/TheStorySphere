// import React, { useEffect, useState } from 'react'
// import {getSubCategory } from '../../../../../../utils/axios-instance';

import { useEffect, useState } from "react"
import { deleteBookData, getAllBooks } from "../../../../../../utils/axios-instance";
import Table from "../../../../../common/Table";
import { useNavigate } from 'react-router-dom'
import { Button, Container } from 'react-bootstrap';


const ManageBooks = () => {
    const navigate = useNavigate()
    const [books, setBooks] = useState([])

    const booksArray = [
        { key: "id", label: "Id" },
        { key: "name", label: "Name" },
        { key: "author", label: "Author" },
        { key: "price", label: "Price" },
        { key: "category", label: "Category" },
        { key: "subcategoryName", label: "Sub-Category" },
        { key: "releaseDate", label: "Release Date" },
        { key: "recentlyLaunched", label: "Recently Launched" },
    ]

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await getAllBooks();
                console.log(response.data)
                setBooks(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchBooks();
    }, []);

    const RegisterNewBook = () => {
        navigate("/admin/register-newBook")
    }

    const handleBookUpdate = (id) => {
        navigate(`/admin/updateBook/${id}`)
    }

    const handleBookDelete = async (id) => {
        const response = await deleteBookData(id)
        const updatedBooks = books.filter(books => books.id !== id);
        setcategory(updatedBooks);
    }
    return (
        <>
            <Container className="py-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2 className='playfair-display-mygooglefont'>Manage Books!</h2>
                    <Button variant="success" onClick={RegisterNewBook} >List a new Book</Button>
                </div>
                <Table data={books} headers={booksArray} handleUpdate={handleBookUpdate} handleDelete={handleBookDelete} />
            </Container>
        </>
    )
}

export default ManageBooks

