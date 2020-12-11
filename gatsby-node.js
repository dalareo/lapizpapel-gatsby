const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const Unit = path.resolve(`./src/templates/unit.js`)
  const Course = path.resolve(`./src/templates/course.js`)

  const result = await graphql(
    `
      {
        units: allMdx(
          sort: { fields: [frontmatter___date], order: DESC }
          filter: { collection: { eq: "units" }}
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
        courses: allMdx(
          filter: { collection: { eq: "courses" }}
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                code
              }
              body
            }
          }
        }
      }
    `
  );

    // Create units pages.
    const units = result.data.units.edges

    units.forEach((unit, index) => {
      const previous = index === units.length - 1 ? null : units[index + 1].node
      const next = index === 0 ? null : units[index - 1].node

      createPage({
        path: `/units${unit.node.fields.slug}`,
        component: Unit,
        context: {
          slug: unit.node.fields.slug,
          previous,
          next
        },
      })
    })

    // Extract courses data from query
    const courses = result.data.courses.edges
    // Make course pages
    courses.forEach(course => {
      createPage({
        path: `/courses${course.node.fields.slug}`,
        component: Course,
        context: {
          slug: course.node.fields.slug,
          code: course.node.frontmatter.code,
          title: course.node.frontmatter.title,
          body: course.node.body
        },
      })
    })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {
    createNodeField({
      name: `slug`,
      node,
      value: createFilePath({ node, getNode }),
    })
    node.collection = getNode(node.parent).sourceInstanceName;
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
