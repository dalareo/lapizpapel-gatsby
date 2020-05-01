import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Button from "../components/button"

function IndexPage ({ location }) {
    const siteTitle = "Lapiz y Papel"

    return (
      <Layout location={location} title={siteTitle}>
        <SEO
          title="Inicio"
          keywords={[`cms`, `gatsby`]}
        />
        <img style={{ margin: 0 }} src="./lapiz-papel.jpg" alt="Lapiz y papel" />
        <h1>
          Hola!
        </h1>
        <p>Esta es una prueba de concepto para un LMS low-cost.</p>
        <p>La página está construida con Gatsby, el contenido se gestiona con Netlify CMS</p>
        <p>¡Construyamos algo maravilloso!</p>
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
            <Link to="/units/">
              <Button marginTop="35px">Contenidos</Button>
            </Link>
          </li>
          <li>
            <Link to="/editor/">
              <Button marginTop="35px">Editor</Button>
            </Link>
          </li>
        </ul>
      </Layout>
    )
  }

export default IndexPage
