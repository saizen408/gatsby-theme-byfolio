import React from "react"
import { Helmet } from "react-helmet"
import { css } from "@emotion/core"
import { graphql } from "gatsby"
import AniLink from "gatsby-plugin-transition-link/AniLink"
import { rhythm } from "../utils/typography"
import LayoutContactMe from "../components/layout/layout-contact-me"

export default ({ data }) => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Christian Ibarguen</title>
        <link rel="canonical" href="http://mysite.com/example" />
        <body className="no-js" />
      </Helmet>
      <LayoutContactMe title={`Skills`}>
        <h4>{data.allMarkdownRemark.totalCount} Posts</h4>
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <div key={node.id}>
            <AniLink cover to={node.fields.slug} direction="left" bg="#000">
              <h3
                css={css`
                  margin-bottom: ${rhythm(1 / 4)};
                `}
              >
                {node.frontmatter.company}{" "}
                <span
                  css={css`
                    color: #bbb;
                  `}
                >
                  — {node.frontmatter.date}
                </span>
              </h3>
              <p>{node.excerpt}</p>
            </AniLink>
          </div>
        ))}
      </LayoutContactMe>
    </>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(
      filter: {
        fields: {
          slug: { regex: "/experience/", ne: "/experience/_additionalSkills/" }
        }
      }
      sort: { fields: [frontmatter___dateFrom], order: DESC }
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            company
            jobTitle
            dateFrom(formatString: "YYYY")
            dateTo(formatString: "YYYY")
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`
