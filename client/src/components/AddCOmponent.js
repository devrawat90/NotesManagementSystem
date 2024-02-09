
import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MUIDataTable from "mui-datatables";
import { Button, Col, Row } from 'react-bootstrap';
import MainModal from './MainModal';
import Cookies from 'js-cookie';
export function AddCOmponent({ BASEURL }) {
    // const [token, settoken] = useState("")
    const [adminid, setAdminid] = useState("")


    // fetch all notes data
    const [getdata, setGetData] = useState([])
    const fetchdata = async () => {
        const exists = Cookies.get('authToken');
        const id = localStorage.getItem('adminid');
        setAdminid(id)
        const AxiosCongif = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${exists}`, // Replace with your actual JWT token
            },
        }
        console.log(AxiosCongif);
        await axios.get(`${BASEURL}/getnote/${id}`, AxiosCongif).then((resp) => {
            console.log("....response", resp.data.message);
            if (resp.data.message === "Notes found") {
                const sortedData = resp.data.data.sort((a, b) => {
                    return new Date(b.createdAt) - new Date(a.createdAt);
                });
                setGetData(sortedData)
            } else { setGetData([]); }


        });
    };

    // const getAdminid = () => {

    // }

    useEffect(() => {
        fetchdata()
    }, [])

    console.log(adminid);
    // console.log(getdata);

    //  all columns.......................... 
    const columns = [
        {
            name: "serialno",
            label: "serial no",
            options: {
                filter: true,
                sort: true,
                customBodyRenderLite: (dataIndex) => dataIndex + 1,
            },
        },
        {
            name: "title",
            label: "Title",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "description",
            label: "Description",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "createdAt",
            label: "CreatedAt",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => {
                    const createdAt = new Date(value);
                    const formattedDate = createdAt.toLocaleString(); // You can customize the formatting
                    return (
                        <div>
                            {formattedDate}
                        </div>
                    );
                },
            },
        },
        {
            name: "Actions",
            label: "Actions",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => {
                    const rowData = data[tableMeta.rowIndex];
                    return (
                        <div className='d-flex justify-content-between align-items-center'>
                            <Button variant="outline-primary" onClick={() => handleEdit(rowData)}>
                                Edit
                            </Button>
                            <Button variant="outline-danger" onClick={() => handleDelete(rowData._id)}>
                                Delete
                            </Button>
                        </div>
                    );
                },
            },
        },
    ];
    const data = getdata;
    const options = {
        filterType: 'checkbox',
        responsive: 'standard', // 'vertical' for vertical scroll, 'standard' for horizontal scroll
        selectableRows: "none", // Hide the checkbox column
    };


    // submit note .....................
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true)

        setAdminid(localStorage.getItem('adminid'))
        setFormData({
            title: "",
            adminid: adminid,
            description: '',
        })
    };
    // State to store form values
    const [formData, setFormData] = useState({
        title: "",
        adminid: adminid,
        description: '',
    });

    console.log(formData);

    // Handler for form field changes
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handler for form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(formData);
        await axios.post(`${BASEURL}/createnote`, formData).then((resp) => {
            console.log(resp);
            if (resp.status === 200) {
                toast.success(resp.data.message)
            }
            if (resp.status === 201) {
                toast.error(resp.data.message)
            }
            fetchdata()
            // setFormData()
            handleClose()
        })
    }
    // edit note.....................................
    const [editData, setEditData] = useState({})
    const [editView, setEditView] = useState(false)
    // Define handleEdit function
    const handleEdit = (rowIndex) => {

        // Logic for handling edit action
        setEditView(true)
        // console.log(`Edit action for row index ${rowIndex}`);
        setEditData(rowIndex)
    };
    // console.log(editData);

    // Handler for form field changes
    const handleEditChange = (event) => {
        const { name, value } = event.target;
        setEditData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    // Handler for form submission
    const handleEditSubmit = async (event) => {
        event.preventDefault();
        console.log(formData);
        await axios.post(`${BASEURL}/updatenote/${editData._id}`, editData).then((resp) => {
            console.log(resp);
            if (resp.status === 200) {
                toast.success(resp.data.message)
            }
            if (resp.status === 201) {
                toast.error(resp.data.message)
            }
            fetchdata()
            setEditData({})
            setEditView(false)
        })
    }
    // delete note ....................................................
    // Define handleDelete function
    const handleDelete = async (rowIndex) => {
        // Logic for handling delete action
        // console.log(`Delete action for row id ${rowIndex}`);
        await axios.post(`${BASEURL}/deletenote/${rowIndex}`).then((resp) => {
            if (resp.status === 200) {
                // Update state after successful deletion
                setGetData(prevData => prevData.filter(row => row._id !== rowIndex));
                toast.success(resp.data.message)
            }
            if (resp.status === 201) {
                toast.error(resp.data.message)
            }
        })
    };



    //  form content ......................................................................
    const Addform =
        <div className='p-2'>
            <Form onSubmit={show ? handleSubmit : handleEditSubmit}>
                <Row className="mb-3">
                    <Form.Group className="mb-3" controlId="formGridName">
                        <Form.Control
                            type="hidden"
                            placeholder=""
                            name="adminid"
                            value={show ? formData.adminid : editData.adminid}
                            // onChange={show ? handleChange : handleEditChange}
                            readOnly={true}
                        />
                        <Form.Label>Tittle</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder=""
                            name="title"
                            value={show ? formData.title : editData.title}
                            onChange={show ? handleChange : handleEditChange}
                        />
                    </Form.Group>
                </Row>
                <Form.Group className="mb-3" controlId="formGridAddress1">
                    <Form.Label>Create a  Note</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        type="text"
                        name="description"
                        value={show ? formData.description : editData.description}
                        onChange={show ? handleChange : handleEditChange}
                    />
                </Form.Group>
                <Row>
                    <Col className='d-flex flex-col justify-content-end align-items-end'>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Col>
                </Row>
            </Form>
        </div >
    return (
        <div className='p-4'>
            <ToastContainer />
            <Row className="m-4">
                <Col xs={12} lg={4} className="d-flex flex-col justify-content-end align-items-start ">
                </Col>
                <Col xs={12} lg={8} className="d-flex flex-col justify-content-end align-items-end mr-5">
                    <Button className='mr-5' variant="outline-dark" onClick={handleShow}>Add Note</Button>
                </Col>
            </Row>
            <div className='container'>
                <div >
                    {<MUIDataTable
                        className={"table-responsive"}
                        title={"Notes"}
                        data={data}
                        columns={columns}
                        options={options}
                    />}
                </div>
                {show && <MainModal
                    show={show}
                    modalHeading={show && "Add"}
                    onHide={handleClose}
                    modalContent={Addform}
                />}
                {editView && <MainModal
                    show={editView}
                    modalHeading={editView && "Edit"}
                    onHide={() => { setEditView(false) }}
                    modalContent={Addform}
                />}
            </div>
        </div >
    );
}