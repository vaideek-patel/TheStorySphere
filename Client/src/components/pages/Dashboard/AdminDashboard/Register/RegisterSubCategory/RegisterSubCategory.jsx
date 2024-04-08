import React, { useEffect, useState } from 'react'
import FormComponent from '../../../../../common/Form';
import * as Yup from 'yup';
import { getCategory } from '../../../../../../utils/axios-instance';

const RegisterSubCategory = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getCategory();
                console.log(response.data)
                setCategories(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const handleCategoryChange = async (categoryId) => {
        console.log(categoryId)
    };

    const fields = [
        { name: 'name', label: 'Name', type: 'text' },
        {
            name: 'category', label: 'Category', as: 'select',
            onChange: ((e) => handleCategoryChange(e.target.value)),
            options: categories.map(category => ({
                value: category.id,
                label: category.name
            })),
        },
    ]

    const initialValues = {
        name: '',
        category: '',
    };

    const validationSchema = Yup.object({
        name: Yup.string().required('Required'),
        // category: Yup.string().required('Required'),
    });

    const handleSubmit = (values, { resetForm }) => {
        console.log(values);
        resetForm();
    };

    return (
        <>
            <div>
                Register New SubCategory
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

export default RegisterSubCategory

