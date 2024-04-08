import React, { useEffect, useState } from 'react'
import { getUsers } from '../../../../../utils/axios-instance';
import Table from '../../../../common/Table';
const AdminHome = () => {
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
  return (
    <>
      <div>
        Welcome to admin page
      </div>
      <Table data={users} headers={usersArray} />
    </>
  )
}

export default AdminHome
