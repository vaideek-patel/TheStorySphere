import React, { useEffect, useState } from 'react';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import { Button, Form as BootstrapForm } from 'react-bootstrap';
import * as Yup from 'yup';
import Select from 'react-select';
import { getCategory, getSubCategory, registerNewCategory, registerNewSubCategory } from '../../../../../../utils/axios-instance';
import { useNavigate } from 'react-router-dom';

const RegisterSubCategory = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [subCategoriesData, setSubCategoriesData] = useState('');
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

        const fetchSubCategoriesForLength = async () => {
            try {
                const response = await getSubCategory();
                setSubCategoriesData(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchSubCategoriesForLength()
        fetchData();
    }, []);

    const ListNewSubCategory = async (values, { resetForm }) => {
        console.log(values)
        try {
            const lastId = subCategoriesData.length > 0 ? parseInt(subCategoriesData[subCategoriesData.length - 1].id) + 1 : 1;
            const newCategory = { id: lastId.toString(), ...values };
            const response = await registerNewSubCategory(newCategory)
            if (response.success) {
                navigate("/admin/manage-sub-category")
            }
            resetForm();
        } catch (error) {
            console.log("Error:", error);
        }

    };
    const handleCategoryChange = (selectedOption, { setFieldValue }) => {
        setSelectedCategoryId(selectedOption.value);
        const selectedCategory = categories.find(category => category.id === selectedOption.value);
        setFieldValue('categoryId', selectedOption.value);
        // setFieldValue('category', selectedCategory ? selectedCategory.name : '');
    };
    return (
        <>
            <div>
                Register New Category
            </div>
            <Formik
                initialValues={{
                    name: '',
                    categoryId: '',
                }}
                // validationSchema={validationSchema}
                onSubmit={ListNewSubCategory}
            >
                {({ values, setFieldValue }) => (

                    <Form>
                        <div className="form-group">

                            <BootstrapForm.Group>
                                <BootstrapForm.Label>Name</BootstrapForm.Label>
                                <Field name="name" type="text" className="form-control" />
                                {/* {errors.name && touched.name && <div className="text-danger">{errors.name}</div>} */}
                            </BootstrapForm.Group>
                        </div>
                        <div className="form-group">
                            <label htmlFor="categoryId">Category</label><Select
                                name="categoryId"
                                options={categories.map(category => ({ value: category.id, label: category.name }))}
                                onChange={(selectedOption) => handleCategoryChange(selectedOption, { setFieldValue })}
                            />
                            <ErrorMessage name="categoryId" component="div" className="error" />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default RegisterSubCategory;
