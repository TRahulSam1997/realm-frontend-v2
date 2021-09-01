import { gql } from '@apollo/client'

const AUTHOR = gql`
        fragment AuthorDetails on Author {
            posts {
                edges {
                    node {
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
                                id
                            }
                        }
                        extraPostInfo {
                            thumbImage
                            previewImage
                            authorExcerpt
                        }
                    }
                }
            }
        }
        query PostAuthorID($id: ID!, $idType: AuthorIdType!) {
            post(id: $id, idType: $idType) {
                ...AuthorDetails
                content
            }
        }
        `;

export default AUTHOR