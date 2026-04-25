import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useLocation } from 'react-router-dom';
import StoreLogo from './StoreLogo';

export default function TopMenu() {
  const location = useLocation();

  const navItems = [
    { label: 'About', to: '/about' },
    { label: 'Vendors', to: '/vendors' },
    { label: 'Products', to: '/products' },
    { label: 'Contact', to: '/contact' },
  ];

  function isActivePath(path) {
    if (path === '/') {
      return location.pathname === '/';
    }

    return location.pathname.startsWith(path);
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="shadow">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-inline-flex align-items-center gap-2 fw-bold">
          <StoreLogo />
          <span>Department Store</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto gap-3">
			{navItems.map((item) => (
				<Nav.Link
					as={Link}
					to={item.to}
					key={item.to}
					className={`fw-semibold top-menu-link${isActivePath(item.to) ? ' top-menu-link-active' : ''}`}
				>
					{item.label}
				</Nav.Link>
			))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}