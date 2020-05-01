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
        <img className="ui image large" src="./lapiz-papel.jpg" alt="Lapiz y papel" />
        <h1>
          Hola!
        </h1>
        <p>Esta es una prueba de concepto para un LMS low-cost.</p>
        <p>La página está construida con Gatsby, el contenido se gestiona con Netlify CMS</p>
        <p>¡Construyamos algo maravilloso!</p>
          <Link to="/units/">
            <Button marginTop="35px">Contenidos</Button>
          </Link>
          <Link to="/editor/">
            <Button marginTop="35px">Editor</Button>
          </Link>
      </Layout>
    )
  }

export default IndexPage
