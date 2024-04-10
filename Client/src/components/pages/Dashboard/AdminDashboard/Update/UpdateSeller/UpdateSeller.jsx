import React, { useEffect, useState } from 'react';
import FormComponent from '../../../../../common/Form';
import { getSellerDataBySellerId, updateSellerData } from '../../../../../../utils/axios-instance/index';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateSeller = () => {
    const navigate = useNavigate();
    const { sellerId } = useParams();
    const [sellerData, setSellerData] = useState(null);

    useEffect(() => {
        const fetchSeller = async () => {
            try {
                const fetchData = await getSellerDataBySellerId(sellerId);
                setSellerData(fetchData.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchSeller();
    }, [sellerId]);

    const handleSubmit = async (values) => {
        try {
            const currentSeller = { id: sellerId.toString(), ...values };
            const response = await updateSellerData(sellerId, currentSeller)
            navigate("/admin/manage-sellers")
          } catch (error) {
            console.log(error)
          }
    };

    const fields = [
        { name: 'name', label: 'Name', type: 'text' },
        { name: 'email', label: 'Email', type: 'text' },
        { name: 'password', label: 'Password', type: 'text' },
        { name: 'companyName', label: 'Company Name', type: 'text' },
        { name: 'gstNumber', label: 'GST Number', type: 'text' },
        { name: 'storeKeepingUnit', label: 'Store Keeping Unit', type: 'text' },
    ];

    if (!sellerData) return <div>Loading...</div>;

    return (
        <>
            <div>Update Seller</div>
            <FormComponent
                initialValues={sellerData}
                onSubmit={handleSubmit}
                fields={fields}
            />
        </>
    );
};

export default UpdateSeller;
