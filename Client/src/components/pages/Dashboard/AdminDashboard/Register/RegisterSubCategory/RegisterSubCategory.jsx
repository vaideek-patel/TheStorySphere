import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';
import { getCategory, registerNewCategory } from '../../../../../../utils/axios-instance';
import { useNavigate } from 'react-router-dom';

const RegisterSubCategory = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [selectedCategoryName, setSelectedCategoryName] = useState('');

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

    const initialValues = {
        name: '',
        categoryId: '',
    };

    const validationSchema = Yup.object({
        name: Yup.string().required('Required'),
        categoryId: Yup.string().required('Required'),
    });

    const ListNewSubCategory = async (values, { resetForm }) => {
        console.log(values)
    };

    const options = categories.map(category => ({ value: category.id, label: category.name }))

    const handleCategoryChange = (selectedOption) => {
        setSelectedCategoryName(selectedOption.label);
    };
    return (
        <>
            <div>
                Register New Category
            </div>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={ListNewSubCategory}
            >
                {({ setFieldValue }) => (

                    <Form>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <Field type="text" id="name" name="name" className="form-control" />
                            <ErrorMessage name="name" component="div" className="error" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="categoryId">Category</label>
                            <Field name="categoryId">
                                {({ field }) => (
                                    <Select
                                        {...field}
                                        options={options}
                                        onChange={(option) => {
                                            setFieldValue("categoryId", option.value);
                                            handleCategoryChange(option);
                                        }} />
                                )}
                            </Field>
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
