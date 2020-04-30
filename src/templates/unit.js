import React from "react"
import { Link, graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import {mdxForm} from "gatsby-tinacms-mdx"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Button from "../components/button"
import { rhythm, scale } from "../utils/typography"

function UnitTemplate ({ data, pageContext, location }) {
  const unit = data.mdx
  const siteTitle = data.site.siteMetadata.title
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

const UnitForm = {
  label: 'Unit',
  fields: [
    {
      label: 'Title',
      name: 'rawFrontmatter.title',
      description: 'Enter the title of the unit here',
      component: 'text',
    },
    {
      label: 'Date',
      name: 'rawFrontmatter.date',
      description: 'Enter the creation date of the unit here',
      component: 'text',
    },
    {
      label: 'Thumbnail',
      name: 'rawFrontmatter.thumbnail',
      description: 'Add a thumbnail to the unit here',
      component: 'text',
    },
    {
      label: 'Description',
      name: 'rawFrontmatter.description',
      description: 'Enter the post description',
      component: 'textarea',
    },
    {
      label: 'Body',
      name: 'rawMdxBody',
      description: 'Enter the post description',
      component: 'markdown',
    },
  ],
}

export default mdxForm(UnitTemplate, UnitForm)

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
      ...TinaMdx
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`
