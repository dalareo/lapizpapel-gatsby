const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const Unit = path.resolve(`./src/templates/unit.js`)
  const Course = path.resolve(`./src/templates/course.js`)

  return graphql(
    `
      {
        allMdx(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                courses
              }
            }
          }
        }
        coursesGroup: allMdx(limit: 2000) {
          group(field: frontmatter___courses) {
            fieldValue
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create units pages.
    const units = result.data.allMdx.edges

    units.forEach((unit, index) => {
      const previous = index === units.length - 1 ? null : units[index + 1].node
      const next = index === 0 ? null : units[index - 1].node

      createPage({
        path: `units${unit.node.fields.slug}`,
        component: Unit,
        context: {
          slug: unit.node.fields.slug,
          previous,
          next,
        },
      })
    })

    // Extract courses data from query
    const courses = result.data.coursesGroup.group
    // Make course pages
    courses.forEach(course => {
      createPage({
        path: `courses/${course.fieldValue}`,
        component: Course,
        context: {
          course: course.fieldValue,
        },
      })
    })

    return null
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /auth0-js/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}
