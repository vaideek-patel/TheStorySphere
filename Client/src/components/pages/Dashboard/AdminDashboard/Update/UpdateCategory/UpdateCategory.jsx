import React, { useEffect, useState } from 'react';
import FormComponent from '../../../../../common/Form';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { getCategorydataFromId, updateCateoryData, updateUserData } from '../../../../../../utils/axios-instance';


const UpdateCateogry = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categoriesData, setCategoriesData] = useState(null);

  useEffect(() => {
    const fetchCategoryFromId = async () => {
      try {
        const response = await getCategorydataFromId(id);
        console.log("response from id", response);
        setCategoriesData(response.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategoryFromId()

  }, [id]);

  console.log(categoriesData)
  const initialValues = {
    name: categoriesData ? categoriesData.name : '',
  };

  const fields = [
    { name: 'name', label: 'Name', type: 'text' },
  ];

  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
  });


  const UpdateCategory = async (values) => {
    try {
      const currentCateogory = { id: id.toString(), ...values };
      const response = await updateCateoryData(id, currentCateogory)
      navigate("/admin/manage-category")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div>
        Update Category
      </div>
      <FormComponent
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={UpdateCategory}
        fields={fields}
      />
    </>
  );
};

export default UpdateCateogry;
