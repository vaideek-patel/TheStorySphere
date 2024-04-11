import React, { useEffect, useState } from 'react'
import FormComponent from '../../../../../common/Form';
import * as Yup from 'yup';
import { getSellers, registerNewSeller } from "../../../../../../utils/axios-instance/index"
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'


const RegisterSeller = () => {
    const navigate = useNavigate()
    const [sellers, setSellers] = useState([])
    useEffect(() => {
        const fetchSeller = async () => {
            try {
                const fetchData = await getSellers()
                setSellers(fetchData.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchSeller()
    }, [])

    const fields = [
        { name: 'name', label: 'Name', type: 'text' },
        { name: 'email', label: 'Email', type: 'text' },
        { name: 'password', label: 'Password', type: 'text' },
        { name: 'companyName', label: 'Company Name', type: 'text' },
        { name: 'gstNumber', label: 'GST Number', type: 'text' },
        { name: 'storeKeepingUnit', label: 'Store Keeping Unit', type: 'text' },
    ]

    const initialValues = {
        name: '',
        email: '',
        password: '',
        companyName: '',
        gstNumber: '',
        storeKeepingUnit: '',
    };

    const handleSubmit = async (values, { resetForm }) => {
        const lastId = sellers.length > 0 ? parseInt(sellers[sellers.length - 1].id) + 1 : 1;
        const newSellerObj = { id: lastId.toString(), ...values };
        const response = await registerNewSeller(newSellerObj)
        if (response.success) {
            Swal.fire({
                title: "Seller Registered Sucessfully!",
                icon: "success",
            });
            navigate("/admin/manage-sellers")
        }
        resetForm();
        console.log(values);
        resetForm();
    };


    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="border rounded shadow p-4">
                        <h3 className="text-center mb-4 playfair-display-mygooglefont">Register New Seller</h3>
                        <FormComponent
                            initialValues={initialValues}
                            onSubmit={handleSubmit}
                            fields={fields}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterSeller






// validationSchema={validationSchema}

// const validationSchema = Yup.object({
//     name: Yup.string().required('Required'),
//     email: Yup.string().required('Required'),
//     password: Yup.string().required('Required'),
//     companyName: Yup.string().required('Required'),
//     gstNumber: Yup.string().required('Required'),
//     storeKeepingUnit: Yup.string().required('Invalid URL').required('Required'),
// });
