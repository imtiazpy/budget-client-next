import React, {useContext} from "react";
import GlobalHeaderContext from "../../../context/GlobalHeaderContext";
import { Col, Container, Nav, Navbar, NavDropdown, Row } from "react-bootstrap";
import Link from "../Link";


const isObject = function (a) {
  return !!a && a.constructor === Object
}
const Menu = ({...rest}) => {
  const gContext = useContext(GlobalHeaderContext);

  return (
    <>
      <Navbar.Collapse id="responsive-navbar-nav" {...rest}>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" className="d-lg-none offcanvas-close"/>
            <Nav className="mr-auto site-menu-main">
              <Nav.Item className="main-nav-item">
                <Link
                  className="nav-link"
                  to="/#budget"
                  role="button"
                  aria-expanded="false"
                  scroll={false}
                >
                  Try Budget
                </Link>
              </Nav.Item>
              {gContext.isLoggedIn &&
                <Nav.Item className="main-nav-item">
                  <Link
                    className="nav-link"
                    to="/dashboard"
                    role="button"
                    aria-expanded="false"
                  >
                    Dashboard
                  </Link>
                </Nav.Item>
              }
              {gContext.isLoggedIn &&
                <Nav.Item className="main-nav-item">
                  <Link
                    className="nav-link"
                    to="/budget"
                    role="button"
                    aria-expanded="false"
                    scroll={false}
                  >
                    Budget
                  </Link>
                </Nav.Item>
              }
            </Nav>
          </Navbar.Collapse>
          </>
  );
};
export default Menu;
