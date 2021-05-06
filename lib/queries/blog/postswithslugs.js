import { gql } from '@apollo/client'

const POSTS_WITH_SLUGS = gql`
        {
            posts(first: 10000) {
                edges {
                    node {
                        slug
                    }
                }
            }
        }
        `;

export default POSTS_WITH_SLUGS