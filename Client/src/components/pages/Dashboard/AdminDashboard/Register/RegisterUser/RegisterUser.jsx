import React, { useEffect, useState } from 'react';
import FormComponent from '../../../../../common/Form';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { getUsers, registerUser } from '../../../../../../utils/axios-instance';
import Swal from 'sweetalert2'

const RegisterUser = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUsers();
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
    { name: 'password', label: 'Password', type: 'password' },
  ];

  const initialValues = {
    name: '',
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
  });

  const ListNewUser = async (values) => {
    try {
      const lastId = users.length > 0 ? parseInt(users[users.length - 1].id) + 1 : 1;
      const newUser = { id: lastId.toString(), ...values };
      const response = await registerUser(newUser);
      Swal.fire({
        title: "New User Listed!",
        icon: "success",
      });      navigate('/admin/home');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="border rounded shadow p-4">
            <h3 className="text-center mb-4 playfair-display-mygooglefont">Register New User</h3>
            <FormComponent
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={ListNewUser}
              fields={fields}
              inputClass="form-control"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterUser;
