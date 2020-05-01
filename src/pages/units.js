import React from "react"
import { Link, graphql } from "gatsby"
import { login, logout, isAuthenticated } from "../utils/auth"
//import { MdxCreatorPlugin } from "gatsby-tinacms-mdx"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Button from "../components/button"

/* const CreateUnitPlugin = new MdxCreatorPlugin({
  label: 'New Unit',
  filename: form => {
    return form.filename
  },
  fields: [
    {
      name: 'filename',
      component: 'text',
      label: 'Filename',
      placeholder: 'content/units/new-unit.md',
      description:
        'The full path to the new markdown file, relative to the repository root.',
    },
  ],
  filename: form => {
    return form.filename
  },
}) */

function Unit ({ data, location}) {
    if (!isAuthenticated()) {
      login()
      return <p>Redirecting to login...</p>
    }
    const siteTitle = data.site.siteMetadata.title
    const units = data.allMdx.edges

    return (
      <Layout location={location} title={siteTitle}>
        <SEO title="All units" />
        <Bio />
        <div>
          {units.map(({ node }) => {
            const title = node.frontmatter.title || node.fields.slug
            return (
              <div key={node.fields.slug}>
                <h3>
                  <Link
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
          <Link to="/">
            <Button marginTop="5px">Inicio</Button>
          </Link>
          <a href="https://awesome-brattain-e95477.netlify.app/admin">
            <Button marginTop="5px">Admin</Button>
          </a>
          <a href="#logout" onClick={e => {
            e.preventDefault()
            logout()
          }}>
            <Button marginTop="5px">Salir</Button>
          </a>
      </Layout>
    )
  }

//export default ( Unit, CreateUnitPlugin)
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
