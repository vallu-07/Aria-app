import React, { useEffect, useState } from 'react'
import { Navbar, Nav, Button, Row, Col, NavLink } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import RazorpayPayment from '../payment/RazorpayPayment'
import { logoutUser, fetchUserByEmail } from '../services/UserService';
import Songs from '../pages/Songs'
import UpdatePasswordForm from '../pages/UpdatePasswordForm'
import axios from 'axios';
import { IoPersonOutline } from "react-icons/io5";
import Footer from '../Components/Footer'
import Home from '../Components/Home'

function CustomerHome() {

    const [showSongs, setShowSongs] = useState(false);
    const [showPay, setShowPay] = useState(false);
    const [showUpdatePass, setShowUpdatePass] = useState(false);
    const [showHome, setShowHome] = useState(true);
    const [premium, setPremium] = useState(false);
    const navigate = useNavigate();
    const userEmail = localStorage.getItem("userEmail")
    const [username, setUsername] = useState('')

    useEffect(() => {
        const fetchPremiumStatus = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/premiumStatus?email=${userEmail}`);
                setPremium(response.data === true);
            } catch (error) {
                console.error('Error fetching premium status:', error);
            }
        };

        const getUserByEmail = async () => {
            try {
                const resp = await fetchUserByEmail(userEmail);
                setUsername(resp.username)
            } catch (error) {
                console.error(error);
            }
        }

        getUserByEmail();
        fetchPremiumStatus();
    }, [userEmail]);
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
                <Navbar.Brand as={Link} to='' onClick={() => {
                    setShowSongs(false);
                    setShowUpdatePass(false);
                    setShowPay(false);
                    setShowHome(true);
                }} className='mx-3'>Playforyou</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarSupportedContent" aria-label="Toggle navigation" />
                <Navbar.Collapse id="navbarSupportedContent">
                    <Row className="w-100">
                        {/* Left Column for Nav Links */}
                        <Col className="col-lg-6">
                            <Nav className="mr-auto">
                                <Nav.Link
                                    onClick={() => {
                                        setShowSongs(true);
                                        setShowUpdatePass(false);
                                        setShowPay(false);
                                        setShowHome(false);
                                    }}>Songs</Nav.Link>
                                {premium ? (
                                    <Nav.Link disabled>Subscribed</Nav.Link>
                                ) : (
                                    <Nav.Link
                                        onClick={() => {
                                            setShowPay(true);
                                            setShowSongs(false);
                                            setShowUpdatePass(false);
                                            setShowHome(false);
                                        }}>SubscribePremium</Nav.Link>
                                )}
                            </Nav>
                        </Col>
                        {/* Right Column for Logout Button */}
                        <Col className="col-lg-6">
                            <Nav className="ml-auto justify-content-end">
                                <Nav.Link style={{ color: 'white', display: 'flex', alignItems: 'center' }}>
                                    <IoPersonOutline style={{ marginRight: '5px' }} />
                                    {username}
                                </Nav.Link>
                                <Nav.Link
                                    onClick={() => {
                                        setShowUpdatePass(true);
                                        setShowSongs(false);
                                        setShowPay(false);
                                        setShowHome(false);
                                    }} >ChangePassword</Nav.Link>
                                <Button variant="secondary" className="p rounded-sm text-white"
                                    onClick={handleLogout}>Logout</Button>
                            </Nav>
                        </Col>
                    </Row>
                </Navbar.Collapse>
            </Navbar>
            {showHome && <Home />}
            {showPay && <RazorpayPayment />}
            {showSongs && <Songs />}
            {showUpdatePass && <UpdatePasswordForm />}
            <Footer />
        </div>
    )
}

export default CustomerHome