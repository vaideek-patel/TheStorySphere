import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import FormComponent from '../../../../common/Form';
import { getCategory, getSubcategoriesByCategoryId } from '../../../../../utils/axios-instance';

const RegisterBook = () => {
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState('');

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

    const handleCategoryChange = async (categoryId) => {
        console.log(categoryId)
        setSelectedCategoryId(categoryId);
        try {
            const response = await getSubcategoriesByCategoryId(categoryId);
            setSubcategories(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const initialValues = {
        name: '',
        author: '',
        description: '',
        price: '',
        releaseDate: '',
        image: '',
        recentlyLaunched: "",
        category: '',
        subcategory: ''
    };

    const validationSchema = Yup.object({
        name: Yup.string().required('Required'),
        author: Yup.string().required('Required'),
        description: Yup.string().required('Required'),
        price: Yup.number().required('Required'),
        releaseDate: Yup.date().required('Required'),
        image: Yup.string().url('Invalid URL').required('Required'),
        category: Yup.string().required('Required'),
        subcategory: Yup.string().required('Required')
    });

    const handleSubmit = (values, { resetForm }) => {
        console.log(values);
        resetForm();
    };

    const fields = [
        { name: 'name', label: 'Name', type: 'text' },
        { name: 'author', label: 'Author', type: 'text' },
        { name: 'description', label: 'Description', as: 'textarea', rows: 4 },
        { name: 'price', label: 'Price', type: 'number' },
        { name: 'releaseDate', label: 'Release Date', type: 'date' },
        { name: 'image', label: 'Image URL', type: 'url' },
        {
            name: 'category',
            label: 'Category',
            as: 'select',
            onChange: ((e) => handleCategoryChange(e.target.value)),

            options: categories.map(category => ({
                value: category.id,
                label: category.name
            })),
        },
        // Render subcategory select field only if selectedCategoryId and subcategories exist
        selectedCategoryId && subcategories.length > 0 && {
            name: 'subcategory',
            label: 'Subcategory',
            as: 'select',
            options: subcategories.map(subcategory => ({
                value: subcategory.id,
                label: subcategory.name
            }))
        },
        { name: 'recentlyLaunched', label: 'Recently Launched', type: 'checkbox' }
    ].filter(Boolean);

    return (
        <FormComponent
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            fields={fields}
        />
    );
};

export default RegisterBook;
