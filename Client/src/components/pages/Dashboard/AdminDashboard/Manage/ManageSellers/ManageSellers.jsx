import React, { useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { deleteSellerData, getSellers } from '../../../../../../utils/axios-instance';
import Table from '../../../../../common/Table';
import { useNavigate } from 'react-router-dom'

const ManageSellers = () => {
    const navigate = useNavigate()
    const [sellers, setSellers] = useState([]);

    const sellerArray = [
        { key: "id", label: "Id" },
        { key: "name", label: "Name" },
        { key: "email", label: "Email" },
        { key: "password", label: "Password" },
        { key: "companyName", label: "Company Name" },
        { key: "gstNumber", label: "GST No." },
        { key: "storeKeepingUnit", label: "SKU" },
    ];

    const RegisterNewSeller = () => {
        navigate("/admin/register-newSeller")
    }

    useEffect(() => {
        const fetchSellers = async () => {
            try {
                const response = await getSellers();
                setSellers(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchSellers();
    }, []);

    const DeleteSellerData = async (sellerId) => {
        const response = await deleteSellerData(sellerId)
        console.log(response)
        const updateSeller = sellers.filter(sellers => sellers.id !== sellerId);
        setSellers(updateSeller);
    }

    const handleUpdate = (sellerId) => {
        console.log(sellerId)
        navigate(`/admin/updateSeller/${sellerId}`)
    }
    return (
        <>
            <Container className="py-4">

                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2 className='playfair-display-mygooglefont'>Manage Sellers</h2>
                    <Button variant="success" onClick={RegisterNewSeller} >List a new seller</Button>
                </div>
                <Table data={sellers} headers={sellerArray} handleDelete={DeleteSellerData} handleUpdate={handleUpdate} />
            </Container>

        </>
    );
};

export default ManageSellers;
