import React, { useState } from "react";
import "./login.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
const Signup = ({ BASEURL }) => {
    const [data, setData] = useState({
        name: "",
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
        await axios.post(`${BASEURL}/registeruser`, data).then((resp) => {
            console.log(resp);
            if (resp.status === 200) {
                toast.success(resp.data.message)
            }
            if (resp.status === 201) {
                toast.error(resp.data.message)
            }
            setData({
                name: "",
                email: "",
                password: ""
            })
        })
    }
    return (
        <div className="container-fluid">
            <ToastContainer />
            <div className="row">
                <div className="hr-w  mar-new">
                    <div className="col-sm-4 shadow-1">
                        <Form className="padd-3" onSubmit={handleSbmit}>
                            <center>
                                <h3 className="mb-4">Register</h3>
                            </center>
                            <center>
                                <hr className="w-75" />
                            </center>
                            <Form.Group
                                className="mb-3"
                                controlId="exampleForm.ControlInput1"
                            >
                                <Form.Label>Name*</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="name"
                                    name="name"
                                    className="int"
                                    required
                                    onChange={handleSbmitChange}
                                    value={data.name}
                                />
                            </Form.Group>
                            <Form.Group
                                className="mb-3"
                                controlId="exampleForm.ControlInput3"
                            >
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    onChange={handleSbmitChange}
                                    value={data.email}
                                    placeholder="name@example.com"
                                    className="int"
                                    required
                                />
                            </Form.Group>

                            <Form.Group
                                className="mb-3"
                                controlId="exampleForm.ControlInput2"
                            >
                                <Form.Label>Password*</Form.Label>
                                <Form.Control
                                    name="password"
                                    type="password"
                                    placeholder="password"
                                    className="int"
                                    required
                                    onChange={handleSbmitChange}
                                    value={data.password}
                                />
                            </Form.Group>

                            <center>
                                <Button
                                    className="btn btn-dark w-100 "
                                    variant="dark"
                                    type="submit"
                                >
                                    Register
                                </Button>
                            </center>
                            <center>
                                <hr />
                            </center>
                            <center>
                                <p>
                                    Already have an account
                                    <Link to="/">
                                        <span className="text-danger">-login</span>
                                    </Link>
                                </p>
                            </center>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
