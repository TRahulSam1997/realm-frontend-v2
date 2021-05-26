import { gql } from '@apollo/client'

const POSTS_FOR_HOME = gql`
        query PostsForHome {
            posts(first: 6, where: {orderby: {field: DATE, order: DESC}}) {
              edges {
                node {
                  id
                  date
                  title
                  slug
                  extraPostInfo {
                    authorExcerpt
                    thumbImage
                    previewImage
                  }
                  author {
                    node {
                      name
                    }
                  }
                }
              }
            }
          }
    `;

export default POSTS_FOR_HOME