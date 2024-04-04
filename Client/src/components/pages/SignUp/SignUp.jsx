import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import "./SignUp.css";
import { getUsers, registerUser } from '../../../utils/axios-instance';
import { useNavigate } from 'react-router-dom';

const initialValues = {
  name: '',
  email: '',
  password: '',
  passwordConfirmation: ''
}
const Login = () => {
  const [users, setUsers] = useState([])
  const navigate = useNavigate()


  useEffect(() => {
    (async () => {
      const {
        success: usersSuccess,
        data: usersData,
        error: userError,
      } = await getUsers();

      if (userError) {
        toast.error("Something went wronge. Try again later!");
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
      navigate("/")
    } else {
      console.log(error)
    }
  };
  return (
    <>
      <br />
      <div className="row justify-content-center">
        <div className="text-center">
          <h3>Login as an Existing Customer</h3>
        </div>
      </div>
      <section className="login-section">


        <div className="container py-5">
          <div className="row justify-content-center align-items-center">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card shadow rounded-3">
                <div className="card-body p-5 text-center">
                  <Formik
                    initialValues={initialValues}
                    onSubmit={(values) => {
                      registerNewUser(values);
                    }}
                  >
                    <Form className="text-start">

                      <div className="mb-4">
                        <label className="form-label" htmlFor="typeEmailX-2">Full Name</label>
                        <div className="d-flex align-items-center">
                          <Field type="text" id="typeEmailX-2" name="name" className="form-control form-control-lg" />
                        </div>
                      </div>


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

                      <div className="mb-4">
                        <label className="form-label" htmlFor="typePasswordConfirmationX-2">Confirm Password</label> {/* Added Password Confirmation field */}
                        <div className="d-flex align-items-center">
                          <Field type="password" id="typePasswordConfirmationX-2" name="passwordConfirmation" className="form-control form-control-lg" />
                        </div>
                      </div>

                      <div className="mb-4 form-check d-flex align-items-center"> {/* Adjusted class */}
                        <Field className="form-check-input me-3" type="checkbox" id="form1Example3" /> {/* Added me-3 class for spacing */}
                        <div>
                          <p className="mb-0">I want to receive newsletters and emails about new books, authors, and promotions from Bookshop.org.</p>
                        </div>
                      </div>

                      <p className="mb-0">By creating an account, you agree to The Story Sphere's Privacy Notice and Terms of Use.</p>
                      <br />

                      <button className="btn btn-danger btn-md btn-block border-radius rounded-pill" type="submit">Create</button>
                    </Form>
                  </Formik>

                  <div className="mt-3">
                    <p className="mb-0"> or Login as Existing Customer</p>
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

export default Login;
