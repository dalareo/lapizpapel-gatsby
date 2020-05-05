import React from "react"
import { Link, graphql } from "gatsby"
import { login, logout, isAuthenticated } from "../utils/auth"
import { withPlugin } from 'tinacms'
import { MdxCreatorPlugin } from "gatsby-tinacms-mdx"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import Button from "../components/button"

const CreateUnitPlugin = new MdxCreatorPlugin({
  label: 'New Unit',
  fields: [
    {name: 'title', label: 'Title', component: 'text', required: true },
    {name: 'thumbnail', label: 'Thumbnail', component: 'text', required: false },
    {name: 'description', label: 'Description', component: 'text', required: false },
  ],
  filename: form => {
    let slug = form.title.replace(/\s+/, '-').toLowerCase()
    return `content/units/${slug}.md`
  },
  frontmatter: form => ({
    title: form.title,
    description: form.description,
    thumbnail: form.thumbnail,
    date: new Date(),
  }),
  body: form => `Esta es una nueva unidad. Por favor escribe el contenido.`,
})

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

//export default ( Unit, CreateUnitPlugin)
export default withPlugin(Unit, CreateUnitPlugin)

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
