import React from "react"
import { Link } from "gatsby"
import Button from "./button"
import { useAuth0 } from "@auth0/auth0-react"

function Menu() {
  const { logout, isAuthenticated, loginWithRedirect } = useAuth0()
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
      {isAuthenticated === false && (
        <li>
          <Link to="#login" onClick={() => loginWithRedirect()}>
            <Button marginTop="5px">Acceso</Button>
          </Link>
        </li>
      )}

      {isAuthenticated === true && (
        <li>
          <Link to="/courses/">
            <Button marginTop="5px">Contenidos</Button>
          </Link>
        </li>
      )}
      {isAuthenticated === true && (
        <li>
          <Link to="/admin/">
            <Button marginTop="5px">Admin</Button>
          </Link>
        </li>
      )}
      {isAuthenticated === true && (
        <li>
          <Link
            to="#logout"
            onClick={() => logout({ returnTo: window.location.origin })}
          >
            <Button marginTop="5px">Salir</Button>
          </Link>
        </li>
      )}
    </ul>
  )
}

export default Menu
