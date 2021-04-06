// import { gql } from '@apollo/client'

// async function POST() { gql`
//         fragment PostFields on Post {
//             title
//             excerpt
//             slug
//             date
//             featuredImage {
//                 node {
//                     sourceUrl
//                 }
//             }
//         }
//         query PostBySlug($id: ID!, $idType: PostIdType!) {
//             post(id: $id, idType: $idType) {
//                 ...PostFields
//                 content
//             }
//         }
//         `,{
//             variables: {
//               id: slug,
//               idType: 'SLUG'
//             }
//           };

// export default POST