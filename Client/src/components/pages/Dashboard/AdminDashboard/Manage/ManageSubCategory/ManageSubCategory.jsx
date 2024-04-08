
import React, { useEffect, useState } from 'react'
import {getSubCategory } from '../../../../../../utils/axios-instance';
import Table from '../../../../../common/Table';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'

const ManageSubCategory = () => {
    const navigate = useNavigate()
    const [subCategory, setSubCategory] = useState([])

    const subCategoryArray = [
        { key: "id", label: "Id" },
        { key: "name", label: "Name" },
        { key: "categoryId", label: "CategoryId" },
    ]

    useEffect(() => {
        const fetchSubCategory = async () => {
            try {
                const response = await getSubCategory();
                console.log(response.data)
                setSubCategory(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchSubCategory();
    }, []);

    const ListNewSubCategory = () => {
        navigate("/admin/register-newSubCategory")
    }

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Manage Sub-Category here!</h2>
                <Button variant="success" onClick={ListNewSubCategory}  >Add a new Sub-Category </Button>
            </div>
            <Table data={subCategory} headers={subCategoryArray} />
        </>
    )
}

export default ManageSubCategory
