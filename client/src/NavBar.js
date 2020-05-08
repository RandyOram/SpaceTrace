import React from 'react'
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
function NavBar() {
    return (
        <Navbar class="navbar" bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="#home">Space Trace</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link href="#home">Profile</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
        
    )
}

export default NavBar;