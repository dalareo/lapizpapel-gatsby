import React from "react"
import SEO from "../components/seo"
import { login, logout, isAuthenticated } from "../utils/auth"
import Layout from "../components/layout"
import { Link, graphql } from "gatsby"
import Button from "../components/button"
import { rhythm } from "../utils/typography"

function Courses ({ data, location}) {
  if (!isAuthenticated()) {
    login()
    return <p>Redirecting to login...</p>
  }
  const siteTitle = data.site.siteMetadata.title
  const courses = data.allMdx.edges

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Cursos" />
      <div>
        <h1>Cursos</h1>
        <ul>
          {courses.map(({ node }) => {
            const title = node.frontmatter.title || node.fields.slug
            const description = node.frontmatter.description || node.excerpt
            return (
              <li key={node.fields.slug}>
                <h3
                  style={{
                    marginBottom: rhythm(1 / 4),
                  }}
                >
                  <Link 
                    style={{ boxShadow: `none` }}
                    to={`courses${node.fields.slug}`}
                  >

                      {title}
                  </Link>
                </h3>
                <div>{description}</div>
              </li>
            ) 
          })}
        </ul>
      </div>
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
            <Link to="/">
              <Button marginTop="5px">Inicio</Button>
            </Link>
          </li>
          <li>
            <a href="https://awesome-brattain-e95477.netlify.app/admin">
              <Button marginTop="5px">Admin</Button>
            </a>
          </li>
          <li>
            <a href="#logout" onClick={e => {
              e.preventDefault()
              logout()
            }}>
              <Button marginTop="5px">Salir</Button>
            </a>
          </li>
        </ul>
    </Layout>
  )
}

export default Courses

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(
      limit: 2000, 
      filter: { collection: { eq: "courses" }}
      sort: { fields: [fields___slug]}
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            description
          }
        }
      }
    }
  }
`
