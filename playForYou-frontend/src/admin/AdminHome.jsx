import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Button, Row, Col } from 'react-bootstrap';
import AddSong from '../admin/AddSong';
import Songs from '../pages/Songs'
import Customers from './Customers'
import { logoutUser } from '../services/UserService';
import Footer from '../Components/Footer'


const AdminHome = () => {
    const [showAddSong, setShowAddSong] = useState(false);
    const [showSongs, setShowSongs] = useState(false);
    const [showCust, setShowCust] = useState(true);

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            // Clear local storage or session storage
            localStorage.clear(); // Or sessionStorage.clear();
            sessionStorage.clear();

            // Send logout request to the server
            await logoutUser();
            // Redirect to the login page or home page
            navigate('/login'); // Replace with the appropriate route
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <div>
            <Navbar expand="lg" bg="dark" variant="dark">
                <Navbar.Brand as={Link} to="/">Admin Home</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarSupportedContent" aria-label="Toggle navigation" />
                <Navbar.Collapse id="navbarSupportedContent">
                    <Row className="w-100">
                        {/* Left Column for Nav Links */}
                        <Col className="col-lg-6">
                            <Nav className="mr-auto">
                                <Nav.Link onClick={() => { setShowAddSong(true); setShowSongs(false); setShowCust(false) }}>AddSong</Nav.Link>
                                <Nav.Link onClick={() => { setShowAddSong(false); setShowSongs(true); setShowCust(false) }}>Songs</Nav.Link>
                                <Nav.Link onClick={() => { setShowAddSong(false); setShowSongs(false); setShowCust(true) }}>Customers</Nav.Link>
                            </Nav>
                        </Col>
                        {/* Right Column for Logout Button */}
                        <Col className="col-lg-6">
                            <Nav className="ml-auto justify-content-end">
                                <Button variant="secondary" className="p rounded-sm text-white" onClick={handleLogout}>Logout</Button>
                            </Nav>
                        </Col>
                    </Row>
                </Navbar.Collapse>
            </Navbar>

            {showCust && <Customers />}
            {showAddSong && <AddSong />}
            {showSongs && <Songs />}
            <Footer />
        </div>
    );
};

export default AdminHome;
