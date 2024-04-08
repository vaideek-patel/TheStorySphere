import React, { useEffect, useState } from 'react'
import FormComponent from '../../../../../common/Form';
import * as Yup from 'yup';
import { getCategory, registerNewCategory } from '../../../../../../utils/axios-instance';
import { useNavigate } from 'react-router-dom'

const RegisterCategory = () => {
    const navigate = useNavigate()
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getCategory();
                setCategories(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const fields = [
        { name: 'name', label: 'Name', type: 'text' },
    ]

    const initialValues = {
        name: '',
    };

    const validationSchema = Yup.object({
        name: Yup.string().required('Required'),
    });

    const ListNewCategory = async (values, { resetForm }) => {
        try {
            const lastId = categories.length > 0 ? parseInt(categories[categories.length - 1].id) + 1 : 1;
            const newCategory = { id: lastId.toString(), ...values };
            const response = await registerNewCategory(newCategory)
            if (response.success) {
                navigate("/admin/manage-category")
            }
            resetForm();
        } catch (error) {
            console.log("Error:", error);
        }
    };

    return (
        <>
            <div>
                Register New Category
            </div>
            <FormComponent
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={ListNewCategory}
                fields={fields}
            />
        </>
    )
}

export default RegisterCategory
