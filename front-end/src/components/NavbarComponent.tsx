import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import ReactTooltip from "react-tooltip";
import { MdInfo } from "react-icons/md";

type NavbarComponentPropsT = {
  readonly pageName?: string;
  readonly pageDescription?: string;
  readonly logoutUserAsyncRequest: () => void;
};

const NavbarComponent: React.FC<NavbarComponentPropsT> = ({
  pageName,
  pageDescription,
  logoutUserAsyncRequest,
}: NavbarComponentPropsT) => {
  const onLogout = (e: React.MouseEvent<any>) => {
    e.preventDefault();
    logoutUserAsyncRequest();
  };

  return (
    <Navbar className="navbar-default">
      <Navbar.Brand className="navbar-default__brand">
        {pageName}
        <a
          data-tip={pageDescription}
          data-for={`navbar-tooltip-${pageName}`}
          className="navbar__tooltip"
        >
          <MdInfo size="1.2em" />
        </a>
        <ReactTooltip
          id={`navbar-tooltip-${pageName}`}
          className="navbar__tooltip-text"
          type="info"
          multiline={true}
        />
      </Navbar.Brand>

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
