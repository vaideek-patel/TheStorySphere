import React, { useEffect, useState } from 'react'
import { deleteCategoryData, getCategory } from '../../../../../../utils/axios-instance';
import Table from '../../../../../common/Table';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'

const ManageCategory = () => {
    const navigate = useNavigate()
    const [category, setcategory] = useState([])

    const categoryArray = [
        { key: "id", label: "Id" },
        { key: "name", label: "Name" },
    ]

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await getCategory();
                setcategory(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchCategory();
    }, []);

    const listNewCategory = () => {
        navigate("/admin/register-newCategory")
    }
    const updateCategory = (id) => {
        console.log(id)
        navigate(`/admin/update-Category/${id}`)
    }

    const deleteCategory = async (id) => {
        const deleteCategory = await deleteCategoryData(id)
        console.log(deleteCategory)
        const updatedCategoery = category.filter(category => category.id !== id);
        setcategory(updatedCategoery);
    }
    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Manage Category here!</h2>
                <Button variant="success" onClick={listNewCategory}>Add a new Category </Button>
            </div>
            <Table data={category} headers={categoryArray} handleUpdate={updateCategory} handleDelete={deleteCategory} />
        </>
    )
}

export default ManageCategory
