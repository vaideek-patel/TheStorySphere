import { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import "./AdminLogin.css";
// import { getUserWishlists, getUsers } from '../../../utils/axios-instance';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setRole } from "../../../../../redux/actions/roleActions"
import Swal from 'sweetalert2'


const initialValues = { email: '', password: '' }
const AdminLogin = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleAdminLogin = async (values) => {
        const { email, password } = values;
        if (email === "admin@gmail.com" && password === "Admin@123") {
            dispatch(setRole('admin', values));
            navigate("/admin/home");
            Swal.fire({
              title: "Welcome Back Admin!",
              text: "Manage your Library!",
              icon: "success"
            });
        } else {
            console.log("error");
        }

    }


    return (
        <>
            <br />
            <div className="row justify-content-center">
            </div>
            <section className="login-section">


                <div className="container py-5">
                    <div className="row justify-content-center align-items-center">
                        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <h3 className='playfair-display-mygooglefont '>Admin Login</h3>

                            <div className="card shadow rounded-3">
                                <div className="card-body p-5 text-center">
                                    <Formik
                                        initialValues={initialValues}
                                        onSubmit={(values) => {
                                            handleAdminLogin(values);
                                        }}
                                    >
                                        <Form className="text-start">
                                            <div className="mb-4">
                                                <label className="form-label" htmlFor="typeEmailX-2">Email</label>
                                                <div className="d-flex align-items-center">
                                                    <Field type="email" id="typeEmailX-2" name="email" className="form-control form-control-lg" />
                                                </div>
                                            </div>

                                            <div className="mb-4">
                                                <label className="form-label" htmlFor="typePasswordX-2">Password</label>
                                                <div className="d-flex align-items-center">
                                                    <Field type="password" id="typePasswordX-2" name="password" className="form-control form-control-lg" />
                                                </div>
                                            </div>

                                            <button className="btn btn-danger btn-md btn-block border-radius rounded-pill" type="submit">Login</button>
                                        </Form>
                                    </Formik>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default AdminLogin;
