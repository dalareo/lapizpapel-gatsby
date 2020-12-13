import React from "react"
import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Menu from "../components/menu"

function IndexPage ({ location }) {
    const siteTitle = "Lapiz y Papel"

    return (
      <Layout location={location} title={siteTitle}>
        <SEO
          title="Inicio"
          keywords={[`cms`, `gatsby`]}
        />
        <Bio />
        <img style={{ margin: 0 }} src="./lapiz-papel.jpg" alt="Lapiz y papel" />
        <h3>El LMS low-cost. Sin base de datos. Sin servidor.</h3>
        <Menu />
      </Layout>
    )
  }

export default IndexPage
