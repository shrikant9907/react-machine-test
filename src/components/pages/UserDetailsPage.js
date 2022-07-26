import React, { useEffect, useState } from 'react'
import { useNavigate, createSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import localDb from '../../_services/localStorageDataService';
import CustomTable from '../common/CustomTable'
import Layout from '../layouts/Layout'

const UserDetailsPage = (props) => {

  const navigate = useNavigate();

  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    const users = localDb.get('users');
    setUsersData(users)
  }, [])

  const tableHead = ['Image', 'Name', 'Age', 'Occupation', 'Gender', "Mobile", "Phone", "Address", "Actions"];

  const handleOnDelete = (id) => {
    let users = localDb.get('users');
    const newUsers = users.filter(u => u.id !== id)
    localDb.set('users', newUsers)
    setUsersData(newUsers)
    toast.success("1 user deleted.")
  }

  const handleOnEdit = (id) => {
    navigate({
      pathname: "/",
      search: createSearchParams({
        uid: id
      }).toString()
    });

  }

  return (
    <Layout> 
      <CustomTable
        heading={"User Listing Table"}
        data={usersData}
        head={tableHead}
        onEdit={handleOnEdit}
        onDelete={handleOnDelete}
      />
    </Layout>
  )
}

export default UserDetailsPage