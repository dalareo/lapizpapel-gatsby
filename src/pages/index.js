import React from "react"
import { Link } from "gatsby"
import Bio from "../components/bio"
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
        <Bio />
        <img style={{ margin: 0 }} src="./lapiz-papel.jpg" alt="Lapiz y papel" />
        <h3>El LMS low-cost. Sin base de datos. Sin servidor.</h3>
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
