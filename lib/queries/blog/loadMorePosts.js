import { gql } from '@apollo/client'

const LOAD_MORE_POSTS = gql`
    query loadMorePosts( $first: Int, $after: String ) {
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

export default LOAD_MORE_POSTS