import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import logo from '../logo.svg'
import styled from 'styled-components';
import {ButtonContainer} from './Button';

export default class Navlink extends Component {
    render() {
        return (
           <NavbarWrapper className="navbar navbar-expand-sm bg-primary navbar-dark px-sm-5">
                <Link to="/">
                    <img src={logo} alt="shop" className="navbar-brand"/>
                </Link>
                <ul className="navbar-nav align-item-center">     
                <li className="nav-item ml-5">
                    <Link to="/" className="nav-link">
                        Products
                    </Link>
                </li>
                </ul>
                <Link to="/Cart" className="ml-auto">
                    <ButtonContainer>
                        <span className="mr-2">
                            <i className="fas fa-cart-plus" />
                        </span>
                        My Cart
                    </ButtonContainer>
                </Link>
           </NavbarWrapper>
        )
    }
}

const NavbarWrapper = styled.nav`
    background: var(--mainBlue);
    .nav-link {
      color: var(--mainWhite) !important;
      font-size: 1.3rem;
      text-transform: capitalize;
    }
`
