import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'; // Import Yup for validation
import "./SignUp.css";
import { getUsers, registerUser } from '../../../utils/axios-instance';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setRole } from '../../../redux/actions/roleActions';
import { toast } from 'react-toastify'; // Import toast from react-toastify for displaying messages

const initialValues = {
  name: '',
  email: '',
  password: '',
  passwordConfirmation: ''
}

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
  passwordConfirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm password is required'),
});

const SignUp = () => {
  const [users, setUsers] = useState([])
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    (async () => {
      const {
        success: usersSuccess,
        data: usersData,
        error: userError,
      } = await getUsers();

      if (userError) {
        toast.error("Something went wrong. Try again later!");
      }

      setUsers(usersData)
    })();
  }, [])

  const registerNewUser = async (values) => {
    const { name, email, password } = values;
    console.log(values);

    let userObj = {
      id: users.length !== 0
        ? (parseInt(users[users.length - 1].id) + 1).toString()
        : 1,
      name,
      email,
      password,
      wishlists: []
    }
    const { success, data, error } = await registerUser(userObj);
    if (success) {
      dispatch(setRole('user', userObj));
      navigate("/")
    } else {
      console.log(error)
    }
  };

  return (
    <>
      <br />
      <section className="login-section">
        <div className="container py-5">
          <div className="row justify-content-center align-items-center">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="mb-3">
                <h2 className='playfair-display-mygooglefont'>Create an Account</h2>
              </div>
              <div className="card shadow rounded-3">
                <div className="card-body p-5 text-center">
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema} // Pass the validation schema
                    onSubmit={(values) => {
                      registerNewUser(values);
                    }}
                  >
                    {({ errors, touched }) => ( // Access Formik's errors and touched properties
                      <Form className="text-start">

                        <div className="mb-4">
                          <label className="form-label" htmlFor="typeEmailX-2">Full Name</label>
                          <div className="d-flex align-items-center">
                            <Field type="text" id="typeEmailX-2" name="name" className={`form-control form-control-lg ${errors.name && touched.name ? 'is-invalid' : ''}`} />
                          </div>
                          <ErrorMessage name="name" component="div" className="invalid-feedback" />
                        </div>


                        <div className="mb-4">
                          <label className="form-label" htmlFor="typeEmailX-2">Email</label>
                          <div className="d-flex align-items-center">
                            <Field type="email" id="typeEmailX-2" name="email" className={`form-control form-control-lg ${errors.email && touched.email ? 'is-invalid' : ''}`} />
                          </div>
                          <ErrorMessage name="email" component="div" className="invalid-feedback" />
                        </div>

                        <div className="mb-4">
                          <label className="form-label" htmlFor="typePasswordX-2">Password</label>
                          <div className="d-flex align-items-center">
                            <Field type="password" id="typePasswordX-2" name="password" className={`form-control form-control-lg ${errors.password && touched.password ? 'is-invalid' : ''}`} />
                          </div>
                          <ErrorMessage name="password" component="div" className="invalid-feedback" />
                        </div>

                        <div className="mb-4">
                          <label className="form-label" htmlFor="typePasswordConfirmationX-2">Confirm Password</label>
                          <div className="d-flex align-items-center">
                            <Field type="password" id="typePasswordConfirmationX-2" name="passwordConfirmation" className={`form-control form-control-lg ${errors.passwordConfirmation && touched.passwordConfirmation ? 'is-invalid' : ''}`} />
                          </div>
                          <ErrorMessage name="passwordConfirmation" component="div" className="invalid-feedback" />
                        </div>

                        <div className="mb-4 form-check d-flex align-items-center">
                          <Field className="form-check-input me-3" type="checkbox" id="form1Example3" />
                          <div>
                            <p className="mb-0">I want to receive newsletters and emails about new books, authors, and promotions from Bookshop.org.</p>
                          </div>
                        </div>

                        <p className="mb-0">By creating an account, you agree to The Story Sphere's Privacy Notice and Terms of Use.</p>
                        <br />

                        <button className="btn btn-danger btn-md btn-block border-radius rounded-pill" type="submit">Create</button>
                      </Form>
                    )}
                  </Formik>

                  <div className="mt-3">
                    <p className="mb-0 " > <Link to="/login">or Login as Existing Customer </Link></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default SignUp;
