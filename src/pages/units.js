import React from "react"
import { Link, graphql, navigate } from "gatsby"
import { login, logout, isAuthenticated } from "../utils/auth"
import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import Button from "../components/button"

class Unit extends React.Component {
  render() {
    if (!isAuthenticated()) {
      login()
      return <p>Redirecting to login...</p>
    }
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const units = data.allMdx.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="All units" />
        <Bio />
        <div style={{ margin: "20px 0 40px" }}>
          {units.map(({ node }) => {
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
            <Link onClick={e => {
              e.preventDefault()
              navigate('#logout')
              logout()
            }}>
              <Button marginTop="5px">Salir</Button>
            </Link>
          </li>
        </ul>
      </Layout>
    )
  }
}

export default Unit

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`
