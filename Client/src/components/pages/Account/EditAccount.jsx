import React, { useEffect, useState } from 'react'
// import FormComponent from '../../../../../common/Form';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom'
import FormComponent from '../../common/Form';
import { getAccountDetailByUsertId, getUsers, updateUserData } from '../../../utils/axios-instance';
// import { getAccountDetailByUsertId, getUsers, updateUserData } from '../../../../../../utils/axios-instance';

const EditAccount = () => {
  const { userId } = useParams()
  const navigate = useNavigate()
  const [users, setUsers] = useState([]);
  const [usersData, setUsersData] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUsers();
        console.log(response.data)
        setUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetcUserData = async () => {
      try {
        const response = await getAccountDetailByUsertId(userId);
        console.log(response.data)
        setUsersData(response.data[0]);
      } catch (error) {
        console.log(error);
      }
    }
    fetcUserData()
    fetchData();
  }, []);

  const fields = [
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'password', label: 'Password', type: 'text' },
  ]

  const initialValues = {
    name: usersData ? usersData.name : '',
    email: usersData ? usersData.email : '',
    password: usersData ? usersData.password : ''
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
  });

  const UpdateSelectedUser = async (values) => {
    try {
      const currentUser = { id: userId.toString(), ...values };
      const response = await updateUserData(userId, currentUser)
      navigate("/account")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div>
       Update User Details
      </div>
      <FormComponent
        initialValues={initialValues}
        // validationSchema={validationSchema}
        onSubmit={UpdateSelectedUser}
        fields={fields}
      />
    </>
  )
}

export default EditAccount





