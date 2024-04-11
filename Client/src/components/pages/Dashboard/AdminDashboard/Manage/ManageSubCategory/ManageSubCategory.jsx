
import React, { useEffect, useState } from 'react'
import { deleteSellerData, deleteSubCategoryData, getSubCategory } from '../../../../../../utils/axios-instance';
import Table from '../../../../../common/Table';
import { Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'


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

    const deleteSubCategory =  (subCategoryId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await deleteSubCategoryData(subCategoryId)
                console.log(response)
                const updateSubCategory = subCategory.filter(subCategory => subCategory.id !== subCategoryId);
                setSubCategory(updateSubCategory);
                Swal.fire({
                    title: "Deleted!",
                    text: "Your Sub-Category has been deleted.",
                    icon: "success"
                });
            }
        });
        console.log(subCategoryId)


    }

    const updateSubCategoryData = (subCategoryId) => {
        console.log(subCategoryId)
        navigate(`/admin/manage-sub-category/${subCategoryId}`)
    }

    return (
        <>
            <Container className="py-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2 className='playfair-display-mygooglefont'>Manage Sub-Category here!</h2>
                    <Button variant="success" onClick={ListNewSubCategory}  >Add a new Sub-Category </Button>
                </div>
                <Table data={subCategory} headers={subCategoryArray} handleDelete={deleteSubCategory} handleUpdate={updateSubCategoryData} />
            </Container>

        </>
    )
}

export default ManageSubCategory

