import React, { useEffect, useState } from 'react';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import { Button, Form as BootstrapForm } from 'react-bootstrap';
import * as Yup from 'yup';
import Select from 'react-select';
import { getCategory, getSubCategoryById, updateSubCategoryData } from '../../../../../../utils/axios-instance';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2'

const UpdateSubCategory = () => {
  const { subCategoryId } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [subCategory, setSubCategory] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCategory();
        setCategories(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSubCategory = async () => {
      try {
        const response = await getSubCategoryById(subCategoryId);
        setSubCategory(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSubCategory();
    fetchData();
  }, [subCategoryId]);

  const initialValues = subCategory
    ? {
      name: subCategory.name,
      categoryId: subCategory.categoryId,
    }
    : {
      name: '',
      categoryId: '',
    };

  const handleCategoryChange = (selectedOption, { setFieldValue }) => {
    setFieldValue('categoryId', selectedOption.value);
  };


  const updateSubCategoryForm = async (values) => {
    console.log(values);
    try {
      const currentSubCategory = { id: subCategoryId.toString(), ...values };
      const response = await updateSubCategoryData(subCategoryId, currentSubCategory)
      Swal.fire({
        title: "Sub-Category Updated",
        icon: "success",
      });
      navigate("/admin/manage-sub-category")
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="border rounded shadow p-4">
            <h3 className="text-center mb-4 playfair-display-mygooglefont">Update Sub Category</h3>
            {subCategory && (
              <Formik
                enableReinitialize
                initialValues={initialValues}
                onSubmit={updateSubCategoryForm}
              >
                {({ values, setFieldValue }) => (
                  <Form>
                    <div className="form-group">
                      <BootstrapForm.Group>
                        <BootstrapForm.Label>Name</BootstrapForm.Label>
                        <Field name="name" type="text" className="form-control" />
                      </BootstrapForm.Group>
                    </div>
                    <div className="form-group">
                      <label htmlFor="categoryId">Category</label>
                      <Select
                        name="categoryId"
                        options={categories.map((category) => ({
                          value: category.id,
                          label: category.name,
                        }))}
                        defaultValue={{
                          value: values.categoryId,
                          label: categories.find(
                            (cat) => cat.id === values.categoryId
                          ).name,
                        }}
                        onChange={(selectedOption) =>
                          handleCategoryChange(selectedOption, { setFieldValue })
                        }
                      />
                      <ErrorMessage name="categoryId" component="div" className="error" />
                    </div>
                    <button type="submit" className="btn btn-primary mt-4">Submit</button>
                  </Form>
                )}
              </Formik>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateSubCategory;
