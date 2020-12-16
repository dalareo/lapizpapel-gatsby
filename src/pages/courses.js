import React from "react"
import SEO from "../components/seo"
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react"
import Layout from "../components/layout"
import Menu from "../components/menu"
import { Link, graphql } from "gatsby"
import { rhythm } from "../utils/typography"

function Courses({ data, location }) {
  const { isAuthenticated, isLoading, error } = useAuth0()
  if (isLoading) {
    return <div>Loading ...</div>
  }
  if (error) {
    return <div>Oops... {error.message}</div>
  }

  const siteTitle = data.site.siteMetadata.title
  const courses = data.allMdx.edges

  return (
    isAuthenticated && (
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
                      to={`/courses${node.fields.slug}`}
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
        <Menu />
      </Layout>
    )
  )
}

export default withAuthenticationRequired(Courses, {
  onRedirecting: () => <div>Loading ...</div>,
})

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(
      limit: 2000
      filter: { collection: { eq: "courses" } }
      sort: { fields: [fields___slug] }
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
