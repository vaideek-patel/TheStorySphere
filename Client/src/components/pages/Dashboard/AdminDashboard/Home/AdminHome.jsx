import React, { useEffect, useState } from 'react'
import { deleteUserData, getUsers } from '../../../../../utils/axios-instance';
import Table from '../../../../common/Table';
import { Button, Container } from "react-bootstrap";
import { useNavigate } from 'react-router-dom'

const AdminHome = () => {
  const navigate = useNavigate()
  const usersArray = [
    { key: "id", label: "Id" },
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "password", label: "Password" },
  ];
  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        console.log(response.data)
        setUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []);

  const ListNewUser = () => {
    navigate("/admin/register-newUser")
  }
  const handleUserUpdate = (userId) => {
    navigate(`/admin/update-user/${userId}`)

  }
  const handleUserDelete = async (userId) => {
    const deleteUser = await deleteUserData(userId)
    console.log(deleteUser)
    const updatedUsers = users.filter(user => user.id !== userId);
    setUsers(updatedUsers);
  }
  return (
    <Container className="py-4">
      <div className="text-center">
        <h2 className='playfair-display-mygooglefont'>Welcome to Admin Dashboard!</h2>
      </div>
      <div className="d-flex justify-content-between align-items-center mt-3">
        <h4 className='playfair-display-mygooglefont'>Manage Users</h4>
        <Button variant="success" onClick={ListNewUser}>Add New User</Button>
      </div>
      <Table data={users} headers={usersArray} handleUpdate={handleUserUpdate} handleDelete={handleUserDelete} />
    </Container>
  )
}

export default AdminHome
