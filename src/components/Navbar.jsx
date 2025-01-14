import React from 'react';
import './Header.css';

const Navbar = () => {
    return (
        <header className="header">
            <nav className="nav">
                
                <ul className="nav-links">
                    <li><a href="#home">Home</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#services">Services</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;
