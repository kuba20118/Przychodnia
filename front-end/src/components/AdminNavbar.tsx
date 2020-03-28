import React from "react";
import { Navbar } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { IApplicationState } from "../state/ducks";
import { logoutUserAsync } from "../state/ducks/user/actions";

type AdminNavbarPropsT = {
  pageName?: string;
  logoutUserAsyncRequest: () => void;
};

const AdminNavbar: React.FC<AdminNavbarPropsT> = ({
  pageName,
  logoutUserAsyncRequest
}: AdminNavbarPropsT) => {
  const logout = (e: React.MouseEvent<any>) => {
    e.preventDefault();
    logoutUserAsyncRequest();
  };

  return (
    <Navbar className="navbar-default">
      <Navbar.Brand className="navbar-default__brand">{pageName}</Navbar.Brand>
      <Navbar.Collapse className="d-flex justify-content-end">
        <Nav>
          <Nav.Link className="navbar-default__link">Konto</Nav.Link>
          <Nav.Link className="navbar-default__link" onClick={logout}>
            Wyloguj
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AdminNavbar;
