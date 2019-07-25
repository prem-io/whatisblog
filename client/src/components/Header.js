import React, { Component } from 'react';

import {
    Navbar, NavbarToggler, NavbarBrand,
    Nav, NavItem, NavLink, Collapse} from 'reactstrap';

class Header extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          isOpen: false,
          isAdmin: true
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <Navbar color="light" light expand="md">
                <NavbarBrand href="/">whatisBlog</NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink href="/blogs">Explore</NavLink>
                        </NavItem>
                        {
                            this.state.isAdmin && <NavItem>
                                <NavLink href="/blogs/add">Create</NavLink>
                            </NavItem>
                        }
                        <NavItem>
                            <NavLink href="/register">Register</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/login">Login</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        )
    }
}
export default Header