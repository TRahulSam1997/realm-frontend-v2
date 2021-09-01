import { gql } from '@apollo/client'

const AUTHORS_WITH_IDS = gql`
        {
            users(first: 10000) {
                edges {
                  node {
                    id
                  }
                }
            }
        }
        `;

export default AUTHORS_WITH_IDS