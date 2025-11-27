import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer className="footer py-3 bg-dark mt-5">
            <Container className="d-flex justify-content-center">
                <span className="text-light">&copy; Shriharsh Pattar 2024</span>
            </Container>
        </footer>
    );
};

export default Footer;
