import { gql } from '@apollo/client'

const ABOUT = gql`
        query livingTruthfully {
            page(id: "about", idType: URI) {
                content(format: RENDERED)
                uri
            }
        }
        `;

export default ABOUT