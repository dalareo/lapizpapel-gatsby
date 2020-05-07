import React from "react"
import { Link, graphql } from "gatsby"
import { login, logout, isAuthenticated } from "../utils/auth"
import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Button from "../components/button"
import { rhythm } from "../utils/typography"

function CourseTemplate ({ location, pageContext, data }) {  
  if (!isAuthenticated()) {
    login()
    return <p>Redirecting to login...</p>
  }
  const siteTitle = data.site.siteMetadata.title
  const { edges } = data.allMdx

  return (
    <Layout location={location} title={siteTitle}>
    <SEO title="All units" />
    <Bio />
    <div style={{ margin: "20px 0 40px" }}>
      {edges.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        return (
          <div key={node.fields.slug}>
            <h3
              style={{
                marginBottom: rhythm(1 / 4),
              }}
            >
              <Link
                style={{ boxShadow: `none` }}
                to={`units${node.fields.slug}`}
              >
                {title}
              </Link>
            </h3>
            <small>{node.frontmatter.date}</small>
            <p
              dangerouslySetInnerHTML={{
                __html: node.frontmatter.description || node.excerpt,
              }}
            />
          </div>
        )
      })}
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

export default CourseTemplate

export const pageQuery = graphql`
  query ($code: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(filter: {collection: {eq: "units"}, frontmatter: {courses: {in: [$code]}}}, limit: 2000, sort: {fields: frontmatter___date, order: ASC}) {
      edges {
        node {
          frontmatter {
            title
            description
            date(formatString: "MMMM DD, YYYY")
          }
          excerpt
          fields {
            slug
          }
        }
      }
    }
  }
`
