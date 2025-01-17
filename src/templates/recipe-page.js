import React from "react"
import { Link, graphql } from "gatsby"
import Img from 'gatsby-image'
import Layout from "../components/layout"
import SEO from "../components/seo"
import IngredientList from "../components/ingredient-list"
import { Row, Col, Badge } from 'reactstrap'
import { slugify } from '../utils/utilityFunctions'

class RecipePageTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
          isRecipe={true}
          datePublished={post.frontmatter.date}
          image={post.frontmatter.full_img.publicURL}
          recipe={post.frontmatter}
        />
        <div className="container">
          <Row className="recipe-detail-row">
            <Col md="6" sm="12" className="mb-4">
              <Img className="recipe-full-img" alt={post.frontmatter.title} fluid={post.frontmatter.full_img.childImageSharp.fluid} />
            </Col>
            <Col md="6" className=" d-none d-md-block d-lg-none">

              <div className="recipe-details p-2">

                <h1>{post.frontmatter.title}</h1>
                <p>{post.frontmatter.description}</p>

              </div>

            </Col>
            <Col lg="6" md="12">
              <div className="recipe-details p-2">

                <h1 className="d-block d-md-none d-lg-block">{post.frontmatter.title}</h1>
                <p className="d-block d-md-none d-lg-block">{post.frontmatter.description}</p>

                <div className="recipe-detail-columns">
                  <div className="recipe-detail">
                    <span data-uk-icon="icon: clock; ratio: 1.4" className="uk-icon"><svg width="28" height="28" viewBox="0 0 20 20" xmlns="https://www.w3.org/2000/svg" data-svg="clock"><circle fill="none" stroke="#000" strokeWidth="1.1" cx="10" cy="10" r="9"></circle><rect x="9" y="4" width="1" height="7"></rect><path fill="none" stroke="#000" strokeWidth="1.1" d="M13.018,14.197 L9.445,10.625"></path></svg></span>
                    <h5 className="uk-text-500 uk-margin-small-top mb-0">Prep Time</h5>
                    <span className="uk-text-small">{post.frontmatter.prep}</span>
                  </div>
                  <div className="recipe-detail">
                    <span data-uk-icon="icon: future; ratio: 1.4" className="uk-icon"><svg width="28" height="28" viewBox="0 0 20 20" xmlns="https://www.w3.org/2000/svg" data-svg="future"><polyline points="19 2 18 2 18 6 14 6 14 7 19 7 19 2"></polyline><path fill="none" stroke="#000" strokeWidth="1.1" d="M18,6.548 C16.709,3.29 13.354,1 9.6,1 C4.6,1 0.6,5 0.6,10 C0.6,15 4.6,19 9.6,19 C14.6,19 18.6,15 18.6,10"></path><rect x="9" y="4" width="1" height="7"></rect><path d="M13.018,14.197 L9.445,10.625" fill="none" stroke="#000" strokeWidth="1.1"></path></svg></span>
                    <h5 className="uk-text-500 uk-margin-small-top uk-margin-remove-bottom">Cook Time</h5>
                    <span className="uk-text-small">{post.frontmatter.cook || 'none'}</span>
                  </div>
                  <div className="recipe-detail">
                    <span data-uk-icon="icon: users; ratio: 1.4" className="uk-icon"><svg width="28" height="28" viewBox="0 0 20 20" xmlns="https://www.w3.org/2000/svg" data-svg="users"><circle fill="none" stroke="#000" strokeWidth="1.1" cx="7.7" cy="8.6" r="3.5"></circle><path fill="none" stroke="#000" strokeWidth="1.1" d="M1,18.1 C1.7,14.6 4.4,12.1 7.6,12.1 C10.9,12.1 13.7,14.8 14.3,18.3"></path><path fill="none" stroke="#000" strokeWidth="1.1" d="M11.4,4 C12.8,2.4 15.4,2.8 16.3,4.7 C17.2,6.6 15.7,8.9 13.6,8.9 C16.5,8.9 18.8,11.3 19.2,14.1"></path></svg></span>
                    <h5 className="uk-text-500 uk-margin-small-top uk-margin-remove-bottom">Servings</h5>
                    <span className="uk-text-small">{post.frontmatter.servings}</span>
                  </div>
                </div>

                <hr />

                <div id="recipe-actions" className="text-center">

                  <ul className="list-unstyled list-inline recipe-tag-list">
                      <li className="list-inline-item">
                        <small>Tags:</small>
                      </li>
                    {post.frontmatter.tags.map(tag => (
                        <li key={tag} className="list-inline-item">
                            <Link to={`/tags/${slugify(tag)}`}>
                                <Badge className="bg-orange">{tag}</Badge>
                            </Link>
                        </li>
                    ))}
                  </ul>
                </div>

              </div>


            </Col>

            <Col sm="12">
              <article>

                <Row className="pt-5 recipe-body">
                  <Col sm="12" md="7">
                    <h3>Instructions</h3>
                    <section className="recipe-instructions" dangerouslySetInnerHTML={{ __html: post.html }} />
                  </Col>
                  <Col sm="12" md={{size:4, offset:1}}  className="order-md-last order-first">

                    <IngredientList
                      list={post.frontmatter.tools}
                      title='Tools'
                      cssClass='tool-list' />

                    <IngredientList
                      list={post.frontmatter.ingredients}
                      title='Ingredients'
                      cssClass='ingredients-list' />
                   
                    <IngredientList
                      list={post.frontmatter.sauce}
                      title='Sauce'
                      cssClass='sauce-list' />

                    <IngredientList
                      list={post.frontmatter.suggestions}
                      title='Serving Suggestions'
                      cssClass='suggestion-list' />

                  </Col>
                </Row>              
                

                <hr />

                <nav>
                  <ul className="recipe-footer-nav list-inline">
                    <li className="list-inline-item">
                      {next && (
                        <Link to={next.fields.slug} rel="next">
                          ← {next.frontmatter.title}
                        </Link>
                      )}
                    </li>
                    <li className="list-inline-item">
                      {previous && (
                        <Link to={previous.fields.slug} rel="prev">
                          {previous.frontmatter.title} →
                        </Link>
                      )}
                    </li>
                  </ul>
                </nav>

              </article>

            </Col>

          </Row>
        </div>

      </Layout>
    )
  }
}

export default RecipePageTemplate

export const pageQuery = graphql`
  query RecipeBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        prep
        cook
        servings
        tags
        tools {
          name
          note
        }
        ingredients{
          ingredient
          note
        }
        sauce {
          ingredient
          note
        }
        suggestions {
          ingredient
          note
        }
        full_img {
          publicURL
          childImageSharp{
            fluid(maxWidth:800, quality:100){
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
