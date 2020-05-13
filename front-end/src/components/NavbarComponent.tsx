import React from "react";
import { Nav, Navbar } from "react-bootstrap";

type NavbarComponentPropsT = {
  readonly pageName?: string;
  readonly logoutUserAsyncRequest: () => void;
};

const NavbarComponent: React.FC<NavbarComponentPropsT> = ({
  pageName,
  logoutUserAsyncRequest,
}: NavbarComponentPropsT) => {
  const onLogout = (e: React.MouseEvent<any>) => {
    e.preventDefault();
    logoutUserAsyncRequest();
  };

  return (
    <Navbar className="navbar-default">
      <Navbar.Brand className="navbar-default__brand">{pageName}</Navbar.Brand>
      <Navbar.Collapse className="d-flex justify-content-end">
        <Nav>
          <Nav.Link className="navbar-default__link">Konto</Nav.Link>
          <Nav.Link className="navbar-default__link" onClick={onLogout}>
            Wyloguj
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;
