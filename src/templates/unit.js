import React from "react"
import { Link, graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { useAuth0 } from '@auth0/auth0-react';import Layout from "../components/layout"
import SEO from "../components/seo"
import Menu from "../components/menu"
import { rhythm, scale } from "../utils/typography"

function UnitTemplate ({ data, pageContext, location, error }) {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  if (isLoading) {
    return <div>Loading ...</div>;
  }
  if (error) {
    return <div>Oops... {error.message}</div>;
  }
  if (!isAuthenticated) {
    return loginWithRedirect()
  } else {
    const siteTitle = data.site.siteMetadata.title
    const unit = data.mdx
    const { previous, next } = pageContext

    return (
      isAuthenticated && (
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
                <Link to={`/units${previous.fields.slug}`} rel="prev">
                  <div>← {previous.frontmatter.title}</div>
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={`/units${next.fields.slug}`} rel="next">
                  <div>{next.frontmatter.title} →</div>
                </Link>
              )}
            </li>
          </ul>
          <Menu />
        </Layout>
      )
    )
  }
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
