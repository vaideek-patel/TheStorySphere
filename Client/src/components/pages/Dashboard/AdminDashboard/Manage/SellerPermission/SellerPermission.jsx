import React, { useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { deleteSellerData, getSellers } from '../../../../../../utils/axios-instance';
import Table from '../../../../../common/Table';
import { useNavigate } from 'react-router-dom';

const SellerPermission = () => {
    const navigate = useNavigate();
    const [sellers, setSellers] = useState([]);

    const RegisterNewSeller = () => {
        navigate("/admin/register-newSeller");
    };

    useEffect(() => {
        const fetchSellers = async () => {
            try {
                const response = await getSellers();
                console.log(response.data);
                setSellers(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchSellers();
    }, []);

    const DeleteSellerData = async (sellerId) => {
        const response = await deleteSellerData(sellerId);
        console.log(response);
        const updateSeller = sellers.filter((seller) => seller.id !== sellerId);
        setSellers(updateSeller);
    };

    const sellerArray = [
        { key: "id", label: "Id" },
        { key: "name", label: "Name" },
        { key: "email", label: "Email" },
        { key: "password", label: "Password" },
        { key: "register", label: "Register" },
        { key: "update", label: "Update" },
        { key: "delete", label: "Delete" },
    ];

    const updateSellerPermission = (sellerId) => {
        navigate(`/admin/updateSellerPermission/${sellerId}`)
    }

    return (
        <>
            <Container className="py-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2 className='playfair-display-mygooglefont'>Handle Seller's Permission Here!</h2>
                </div>
                <Table data={sellers} headers={sellerArray} handleUpdate={updateSellerPermission} />
            </Container>
        </>
    );
};

export default SellerPermission;
