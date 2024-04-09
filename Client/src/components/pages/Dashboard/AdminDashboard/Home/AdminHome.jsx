import React, { useEffect, useState } from 'react'
import { deleteUserData, getUsers } from '../../../../../utils/axios-instance';
import Table from '../../../../common/Table';
import { Button } from "react-bootstrap";
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
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Welcome to Admin Page!</h2>
        <Button variant="success" onClick={ListNewUser}>Add New User </Button>
      </div>
      <Table data={users} headers={usersArray} handleUpdate={handleUserUpdate} handleDelete={handleUserDelete} />
    </>
  )
}

export default AdminHome
