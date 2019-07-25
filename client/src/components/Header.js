import React, { Component } from 'react';
import { Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Collapse} from 'reactstrap';
import {connect} from 'react-redux';
import logo from '../assets/logo.svg';
import _ from 'lodash';

class Header extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          isOpen: false
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        const {user} = this.props
        return (
            <div>
                <Navbar color="light" light expand="md">
                    <img src={logo} width="30" height="30" className="circle ml-5 mr-2" alt="..."/>
                    <NavbarBrand href="/">whatisBlog</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto mr-5" navbar>
                            <NavItem>
                                <NavLink href="/blogs">Explore</NavLink>
                            </NavItem>
                            {
                                (user.role === "admin") && <NavItem>
                                <NavLink href="/blogs/add">Create</NavLink>
                                </NavItem>
                            }
                            {_.isEmpty(user) ? (
                                <>
                                <NavItem>
                                    <NavLink href="/register">Register</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="/login">Login</NavLink>
                                </NavItem>
                                </>
                            ) : (
                                <NavItem>
                                    <NavLink href="/logout">Logout</NavLink>
                                </NavItem>
                            )}
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Header)