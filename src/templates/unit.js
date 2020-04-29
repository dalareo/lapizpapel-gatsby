import React from "react"
import { Link, graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Button from "../components/button"
import { rhythm, scale } from "../utils/typography"

class UnitTemplate extends React.Component {
  render() {
    const unit = this.props.data.mdx
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext

    return (
      <Layout location={this.props.location} title={siteTitle}>
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
          {unit.frontmatter.date}
        </p>
        <MDXRenderer>{unit.body}</MDXRenderer>
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <Bio />

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
