import { gql } from '@apollo/client'

const AUTHOR = gql`
        query AuthorByID($id: ID!) {
            user(id: $id) {
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
        }
        `;

export default AUTHOR