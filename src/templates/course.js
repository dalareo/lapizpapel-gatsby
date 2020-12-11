import React from "react"
import { Link, graphql } from "gatsby"
import { useAuth0 } from '@auth0/auth0-react';
import Layout from "../components/layout"
import Menu from "../components/menu"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import { MDXRenderer } from "gatsby-plugin-mdx"

function CourseTemplate ({ location, pageContext, data }) {
  const { isAuthenticated, isLoading, loginWithRedirect, error } = useAuth0();
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
    const { edges } = data.allMdx
    const title = pageContext.title
    const body = pageContext.body

    return (
      isAuthenticated && (
        <Layout location={location} title={siteTitle}>
        <SEO title={title} />
        <h1>{title}</h1>
        <MDXRenderer>{body}</MDXRenderer>
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
                    to={`/units${node.fields.slug}`}
                  >
                    {title}
                  </Link>
                </h3>
                <p
                  dangerouslySetInnerHTML={{
                    __html: node.frontmatter.description || node.excerpt,
                  }}
                />
              </div>
            )
          })}
        </div>
        <Menu />
      </Layout>
      )
    )
  }
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
