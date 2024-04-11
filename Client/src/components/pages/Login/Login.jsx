import { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import "./Login.css";
import "../../../Global.css"
import { getUsers } from '../../../utils/axios-instance';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setRole } from '../../../redux/actions/roleActions';
import Swal from 'sweetalert2';

const initialValues = { email: '', password: '' }

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers()
        if (response.success) {
          setUsers(response.data)
        } else {
          console.error("Failed to fetch the Users Data", response.error)
        }
      } catch (error) {
        console.error("Error while Fetching users", error)
      }
    }

    fetchUsers()
  }, [])

  const handleUsersLogin = async (values) => {
    const { email, password } = values;
    const user = users.find((user) => user.email === email);
    if (user && user.password === password) {
      dispatch(setRole('user', user));
      Swal.fire({
        title: "Welcome Back!",
        text: "Happy Exploring the Story Sphere!",
        icon: "success",
      });
      navigate("/");
    } else {
      Swal.fire({
        title: "Invalid Credentials",
        text: "Please check your email and password",
        icon: "error",
      });
    }
  }

  return (
    <>
      <br />
      <section className="login-section">
        <div className="container py-5">
          <div className="row justify-content-center align-items-center">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="mb-3">
                <h2 className='playfair-display-mygooglefont mb-3'>Login as an Existing Customer</h2>
              </div>
              <div className="card shadow rounded-3">
                <div className="card-body p-5 text-center">
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                      handleUsersLogin(values);
                    }}
                  >
                    {({ errors, touched }) => ( 
                      <Form className="text-start">
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

                        <p className="mb-0">By creating an account, you agree to The Story Sphere's Privacy Notice and Terms of Use.</p>
                        <br />

                        <button className="btn btn-danger btn-md btn-block border-radius rounded-pill" type="submit">Login</button>
                      </Form>
                    )}
                  </Formik>

                  <div className="mt-3">
                    <p className="mb-0"> or <Link to="/signUp"> Create a new Account  </Link>| <Link to="/forgotPassword">Forgot password </Link></p>
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
