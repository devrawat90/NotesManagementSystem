import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './header.css'
import { Button, NavbarBrand } from 'react-bootstrap';

import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
function Header() {
    const navigate = useNavigate()

    const handleLogout = () => {
        // Remove the authToken from cookies
        const authToken = Cookies.remove('authToken');
        console.log(authToken);
        if (authToken == undefined || authToken == null) {
            // Redirect to the login page or any other desired location
            navigate('/');
        }

    };
    return (
        <>
            <Navbar expand="lg" className="mainnav" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="#home">LOGO</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" >
                        <Nav>
                            <Nav.Link className='text-light' href="#home">Home</Nav.Link>
                            <Nav.Link className='text-light' href="#Services">Services</Nav.Link>
                            <Nav.Link className='text-light' href="#About">About us</Nav.Link>
                            <Nav.Link className='text-light' href="#About">Contact us</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    <Navbar.Brand className="">
                        <Button variant="outline-danger" className="" onClick={handleLogout}>Logout</Button>
                    </Navbar.Brand>
                </Container>
            </Navbar>
        </>
    );
}

export default Header;