import React from "react"
import { Link } from "gatsby"

function Layout ( { location, title, children }) {
  const rootPath = `${__PATH_PREFIX__}/`
  const unitPath = `${__PATH_PREFIX__}/units/`
  let header

  if (location.pathname === rootPath || location.pathname === unitPath) {
    header = (
      <h1>
        <Link 
          to={location.pathname === unitPath ? `/units/` : `/`}
        >
          {title}
        </Link>
      </h1>
    )
  } else {
    header = (
      <h3>
        <Link
          to={`/units/`}
        >
          {title}
        </Link>
      </h3>
    )
  }
  return (
      <div className="ui container"
      style={{
        marginTop: `50px`,
      }}
      >
      <div>
        <div className="ui header center">{header}</div>
        <div>{children}</div>
      </div>
      <div>
        © {new Date().getFullYear()}, Built by
        {` `}
        <a href="https://dalareo.github.io">David A. Lareo</a>
      </div>
    </div>
  )
}

export default Layout
