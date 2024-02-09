import React, { useEffect, useState } from 'react'
import './login.css'
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

import { ToastContainer, toast } from 'react-toastify';
const Login = ({ BASEURL }) => {
    const navigate = useNavigate()
    useEffect(() => {
        const authtoken = Cookies.get("authToken")

        if (authtoken) {
            navigate("/user/dashboard")
        } else {
            navigate("/")
        }

    }, [])





    const [data, setData] = useState({
        email: "",
        password: ""
    })

    const handleSbmitChange = (e) => {
        const { name, value } = e.target;
        setData(prevValue => ({ ...prevValue, [name]: value }))
    }

    const handleSbmit = async (e) => {
        e.preventDefault()
        console.log(data);
        await axios.post(`${BASEURL}/userlogin`, data).then((resp) => {
            console.log(resp);
            if (resp.status === 200 && resp.data.login === true) {
                toast.success(resp.data.message)
                localStorage.setItem("adminid", resp.data.adminid)
                Cookies.set("authToken", resp.data.token, { expires: 1 });
                navigate("/user/dashboard")
            } else {
                toast.error(resp.data.message)
            }
            setData({
                email: "",
                password: ""
            })
        })
    }
    return (
        <div className="container-fluid">
            <ToastContainer />
            <div className="row mt-5">
                <div className='hr-w  mar-new'>
                    <div className="col-sm-4 shadow-1">
                        <Form className='padd-3' onSubmit={handleSbmit}>
                            <center><h3>Login</h3></center>
                            <center><hr className='w-75' /></center>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Email Id*</Form.Label>
                                <Form.Control type="text" placeholder="email" className='int' name="email" value={data.email} onChange={handleSbmitChange} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                <Form.Label>Password*</Form.Label>
                                <Form.Control type="password" placeholder="password" name="password" value={data.password} onChange={handleSbmitChange} className='int' />
                            </Form.Group>
                            {/* <div className="forgot mt-2">
                                <div className="form-check form-switch">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        role="switch"
                                        id="flexSwitchCheckChecked"
                                    />
                                    <p className="form-check-label" htmlFor="flexSwitchCheckChecked">
                                        Remember me
                                    </p>
                                </div>
                                <div>
                                    <p>Forgot?</p>
                                </div>
                            </div> */}
                            <center><Button className="btn w-100 " variant="dark" type="submit" >Login</Button></center>
                            <center><hr /></center>
                            <center><p>don't have an account<Link to='/signup'><span className="text-danger">-get started</span></Link></p></center>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login