import { gql } from '@apollo/client'

const POST = gql`
        fragment PostFields on Post {
            title
            excerpt
            slug
            date
            uri
            featuredImage {
                node {
                    sourceUrl
                }
            }
            author {
                node {
                  name
                }
            }
            extraPostInfo {
                thumbImage
                previewImage
                authorExcerpt
            }
        }
        query PostBySlug($id: ID!, $idType: PostIdType!) {
            post(id: $id, idType: $idType) {
                ...PostFields
                content
            }
        }
        `;

export default POST