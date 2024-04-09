import React, { useEffect, useState } from 'react'
import FormComponent from '../../../../../common/Form';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom'
import { getUsers, registerUser } from '../../../../../../utils/axios-instance';

const RegisterUser = () => {
  const navigate = useNavigate()
  const [users, setUsers] = useState([]);

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
    fetchData();
  }, []);

  const fields = [
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'password', label: 'Password', type: 'text' },
  ]

  const initialValues = {
    name: '',
    email: '',
    password: ''
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
  });

  const ListNewUser = async (values) => {
    try {
      const lastId = users.length > 0 ? parseInt(users[users.length - 1].id) + 1 : 1;
      const newUser = { id: lastId.toString(), ...values };
      const response = await registerUser(newUser)
      navigate("/admin/home")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div>
        Register New Category
      </div>
      <FormComponent
        initialValues={initialValues}
        // validationSchema={validationSchema}
        onSubmit={ListNewUser}
        fields={fields}
      />
    </>
  )
}

export default RegisterUser

