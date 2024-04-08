import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { getSellers } from '../../../../../../utils/axios-instance';
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


    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Manage Sellers</h2>
                <Button variant="success" onClick={RegisterNewSeller} >List a new seller</Button>
            </div>
            <Table data={sellers} headers={sellerArray} />
        </>
    );
};

export default ManageSellers;
