import { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import "./SellerLogin.css";
// import { getUserWishlists, getUsers } from '../../../utils/axios-instance';
import { useNavigate } from 'react-router-dom';
import { getSellers } from '../../../../../utils/axios-instance';
import { useDispatch } from 'react-redux';
import { setRole } from "../../../../../redux/actions/roleActions"
// import { setData } from '../../../redux/actions/dataAction';

const initialValues = { email: '', password: '' }
const SellerLogin = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [sellers, setSellers] = useState([])
    useEffect(() => {
        const fetchSellers = async () => {
            try {
                const response = await getSellers()
                if (response.success) {
                    console.log(response)
                    setSellers(response.data)
                } else {
                    console.error("Failed to fetch the Products Data", response.error)
                }
            } catch (error) {
                console.error("Error while Fetching products", error)
            }
        }
        fetchSellers()
    }, [])

    const handleSellerLogin = async (values) => {
        const { email, password } = values;
        const seller = sellers.find((seller) => seller.email === email);
        console.log(seller)
        if (seller && seller.password === password) {
            dispatch(setRole('seller', seller));
            navigate("/seller");
        } else {
            console.log("error");
        }
    }
    return (
        <>
            <br />
            <div className="row justify-content-center">
                <div className="text-center">
                    <h3>Login as an Existing Seller</h3>
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
                                            handleSellerLogin(values);
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

                                            <div className="mb-4 form-check d-flex justify-content-start">
                                                <Field className="form-check-input" type="checkbox" id="form1Example3" />
                                                <label className="form-check-label" htmlFor="form1Example3"> Remember password</label>
                                            </div>
                                            <p className="mb-0">By creating an account, you agree to The Story Sphere's Privacy Notice and Terms of Use.</p>
                                            <br />

                                            <button className="btn btn-danger btn-md btn-block border-radius rounded-pill" type="submit">Login</button>
                                        </Form>
                                    </Formik>

                                    <div className="mt-3">
                                        <p className="mb-0"> or Create a new Account | Forgot password</p>
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

export default SellerLogin;
