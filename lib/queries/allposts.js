import { gql } from '@apollo/client'

const ALL_POSTS = gql`
    query allPosts {
        posts(first: 20, where: {orderby: {field: DATE, order: DESC}}) {
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
        }
    }
    `;

export default ALL_POSTS