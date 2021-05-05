import { gql } from '@apollo/client'

const ALL_POSTS = gql`
    query allPosts( $first: Int, $after: String ) {
        posts: posts(first: $first, after: $after) {
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
                }
            }
            pageInfo {
              offsetPagination {
                total
              }
              hasNextPage
              endCursor
            }
        }
    }
    `;

export default ALL_POSTS