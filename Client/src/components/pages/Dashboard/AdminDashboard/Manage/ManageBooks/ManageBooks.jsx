// import React, { useEffect, useState } from 'react'
// import {getSubCategory } from '../../../../../../utils/axios-instance';

import { useEffect, useState } from "react"
import { getAllBooks } from "../../../../../../utils/axios-instance";
import Table from "../../../../../common/Table";
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap';


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
    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Manage Books</h2>
                <Button variant="success" onClick={RegisterNewBook} >List a new Book</Button>
            </div>
            <Table data={books} headers={booksArray} />
        </>
    )
}

export default ManageBooks

