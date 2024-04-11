import React, { useEffect, useState } from 'react'
import FormComponent from '../../../../../common/Form';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom'
import { getAccountDetailByUsertId, getUsers, updateUserData } from '../../../../../../utils/axios-instance';
import Swal from 'sweetalert2'

const UpdateUser = () => {
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
      Swal.fire({
        title: "User updated!",
        text: "Happy Exploring the Story Sphere!",
        icon: "success",
      });
      navigate("/admin/home")
    } catch (error) {
      console.log(error)
    }
  }

  return (

    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="border rounded shadow p-4">
            <h3 className="text-center mb-4 playfair-display-mygooglefont">
              Update Exsisting User
            </h3>
            <FormComponent
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={UpdateSelectedUser}
              fields={fields}
            />
          </div>
        </div>
      </div>
    </div>

  )
}

export default UpdateUser




