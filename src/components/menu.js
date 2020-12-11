import React from 'react';
import { Link } from "gatsby"
import Button from "./button"
import { useAuth0 } from '@auth0/auth0-react';

function Menu () {
  const { logout } = useAuth0();
  return (
    <ul
    style={{
      display: `flex`,
      flexWrap: `wrap`,
      justifyContent: `space-between`,
      listStyle: `none`,
      padding: 0,
    }}
    >
    <li>
      <Link to="/courses/">
        <Button marginTop="5px">Contenidos</Button>
      </Link>
    </li>
    <li>
      <a href="/admin">
        <Button marginTop="5px">Admin</Button>
      </a>
    </li>
    <li>
      <a href="#logout" onClick={() => logout({ returnTo: window.location.origin })}>
        <Button marginTop="5px">Salir</Button>
      </a>
    </li>
    </ul>
  )
}

export default Menu

