import React, { useEffect, useState } from 'react';
import FormComponent from '../../../../../common/Form';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { getCategorydataFromId } from '../../../../../../utils/axios-instance';


const UpdateCateogry = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categoriesData, setCategoriesData] = useState(null);

  useEffect(() => {
    const fetchCategoryFromId = async () => {
      try {
        const response = await getCategorydataFromId(id);
        console.log("response from id", response);
        setCategoriesData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategoryFromId()

  }, [id]);

console.log(categoriesData)
  const initialValues = {
    name: categoriesData && categoriesData.length > 0 ? categoriesData[0].name : '',
  };

  const fields = [
    { name: 'name', label: 'Name', type: 'text' },
  ];

  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
  });

  // const ListNewCategory = async (values, { resetForm }) => {
  //   try {
  //     const lastId = categories.length > 0 ? parseInt(categories[categories.length - 1].id) + 1 : 1;
  //     const newCategory = { id: lastId.toString(), ...values };
  //     const response = await registerNewCategory(newCategory);
  //     if (response.success) {
  //       navigate("/admin/manage-category");
  //     }
  //     resetForm();
  //   } catch (error) {
  //     console.log("Error:", error);
  //   }
  // };

  return (
    <>
      <div>
        Update Category
      </div>
      <FormComponent
        initialValues={initialValues}
        validationSchema={validationSchema}
        // onSubmit={ListNewCategory}
        fields={fields}
      />
    </>
  );
};

export default UpdateCateogry;
