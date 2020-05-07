import React from "react"
import { Link, graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { login, logout, isAuthenticated } from "../utils/auth"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Button from "../components/button"
import { rhythm, scale } from "../utils/typography"

function UnitTemplate ({ data, pageContext, location }) {
  if (!isAuthenticated()) {
    login()
    return <p>Redirecting to login...</p>
  }
  const siteTitle = data.site.siteMetadata.title
  const unit = data.mdx
  const { previous, next } = pageContext

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={unit.frontmatter.title}
        description={unit.frontmatter.description || unit.excerpt}
      />
      <h1>{unit.frontmatter.title}</h1>
      <p
        style={{
          ...scale(-1 / 5),
          display: `block`,
          marginBottom: rhythm(1),
          marginTop: rhythm(-1),
        }}
      >
      </p>
      <MDXRenderer>{unit.body}</MDXRenderer>
      <hr
        style={{
          marginBottom: rhythm(1),
        }}
      />

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
          {previous && (
            <Link to={`units${previous.fields.slug}`} rel="prev">
              <Button>← {previous.frontmatter.title}</Button>
            </Link>
          )}
        </li>
        <li>
          <Link to="/courses/">
            <Button>Contenidos</Button>
          </Link>
        </li>
        <li>
        <a href="https://awesome-brattain-e95477.netlify.app/admin">
          <Button>Admin</Button>
        </a>
      </li>
      <li>
        <a href="#logout" onClick={e => {
          e.preventDefault()
          logout()
        }}>
          <Button>Salir</Button>
        </a>
      </li>
        <li>
          {next && (
            <Link to={`units${next.fields.slug}`} rel="next">
              <Button>{next.frontmatter.title} →</Button>
            </Link>
          )}
        </li>
      </ul>
    </Layout>
  )
}

export default UnitTemplate

export const pageQuery = graphql`
  query UnitBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      body
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`
