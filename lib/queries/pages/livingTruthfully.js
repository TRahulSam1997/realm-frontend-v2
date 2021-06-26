import { gql } from '@apollo/client'

const LIVING_TRUTHFULLY = gql`
        query livingTruthfully {
            page(id: "living-truthfully", idType: URI) {
                content(format: RENDERED)
                uri
            }
        }
        `;

export default LIVING_TRUTHFULLY