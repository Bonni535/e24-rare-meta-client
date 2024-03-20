/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, //
  Container,
  Nav,
  Button,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';

export default function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand>Rare</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* Links */}
            <Link passHref href="/">
              <Nav.Link>Home</Nav.Link>
            </Link>
            <Link href="/categories" passHref>
              <Nav.Link>Categories</Nav.Link>
            </Link>
            <Link passHref href="/">
              <Nav.Link>All Posts</Nav.Link>
            </Link>
            <Link passHref href="/">
              <Nav.Link>My Posts</Nav.Link>
            </Link>
            <Link passHref href="/">
              <Nav.Link>Category Manager</Nav.Link>
            </Link>
            <Link passHref href="/tags">
              <Nav.Link>Tag Manager</Nav.Link>
            </Link>
          </Nav>
          <Nav>
            {/* Sign Out Button */}
            <Button variant="danger" onClick={signOut}>Sign Out</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
