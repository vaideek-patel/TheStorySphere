import React from 'react'
import FormComponent from '../../../../../common/Form';
import * as Yup from 'yup';

const RegisterSeller = () => {

    const fields = [
        { name: 'name', label: 'Name', type: 'text' },
        { name: 'email', label: 'Email', type: 'text' },
        { name: 'password', label: 'Password', as: 'password' },
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

    const validationSchema = Yup.object({
        name: Yup.string().required('Required'),
        email: Yup.string().required('Required'),
        password: Yup.string().required('Required'),
        companyName: Yup.string().required('Required'),
        gstNumber: Yup.string().required('Required'),
        storeKeepingUnit: Yup.string().required('Invalid URL').required('Required'),
    });

    const handleSubmit = (values, { resetForm }) => {
        console.log(values);
        resetForm();
    };

    return (
        <>
            <div>
                Register New Seller
            </div>
            <FormComponent
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                fields={fields}
            />
        </>
    )
}

export default RegisterSeller

