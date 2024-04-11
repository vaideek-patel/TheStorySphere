import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import FormComponent from '../../common/Form';
import { getAccountDetailByUsertId, getUsers, updateUserData } from '../../../utils/axios-instance';

const EditAccount = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [usersData, setUsersData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getUsers();
                console.log(response.data);
                setUsersData(response.data[0]);
            } catch (error) {
                console.log(error);
            }
        };

        const fetchUserData = async () => {
            try {
                const response = await getAccountDetailByUsertId(userId);
                console.log(response.data);
                setUsersData(response.data[0]);
            } catch (error) {
                console.log(error);
            }
        };

        fetchUserData();
        fetchData();
    }, [userId]);

    const fields = [
        { name: 'name', label: 'Name', type: 'text' },
        { name: 'email', label: 'Email', type: 'email' },
        { name: 'password', label: 'Password', type: 'password' },
    ];

    const initialValues = {
        name: usersData ? usersData.name : '',
        email: usersData ? usersData.email : '',
        password: '',
    };

    const validationSchema = Yup.object({
        name: Yup.string().required('Required'),
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
    });

    const UpdateSelectedUser = async (values) => {
        try {
            const currentUser = { id: userId.toString(), ...values };
            const response = await updateUserData(userId, currentUser);
            navigate("/account");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Update User Details</h2>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <FormComponent
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={UpdateSelectedUser}
                        fields={fields}
                        buttonLabel="Update"
                    />
                </div>
            </div>
        </div>
    );
};

export default EditAccount;
