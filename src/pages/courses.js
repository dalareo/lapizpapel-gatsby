import React from "react"
import SEO from "../components/seo"
import { login, logout, isAuthenticated } from "../utils/auth"
import Bio from "../components/bio"
import Layout from "../components/layout"
import { Link, graphql } from "gatsby"
import Button from "../components/button"

function Courses ({ data, location}) {
  if (!isAuthenticated()) {
    login()
    return <p>Redirecting to login...</p>
  }
  const siteTitle = data.site.siteMetadata.title
  const courses = data.allMdx.group

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All courses" />
      <Bio />
      <div>
        <h1>Cursos</h1>
        <ul>
          {courses.map(course => (
            <li key={course.fieldValue}>
              <Link to={`courses/${course.fieldValue}`}>
                {course.fieldValue} ({course.totalCount})
              </Link>
            </li>
          ))}
        </ul>
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

export default Courses

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(limit: 2000) {
      group(field: frontmatter___courses) {
        fieldValue
        totalCount
      }
    }
  }
`
