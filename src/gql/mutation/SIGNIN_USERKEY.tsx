import { gql } from "@apollo/client";


export const SIGNIN_USERKEY = gql`
mutation SignInByUserKey($usarApiKey: String!) {
    signInByUserKey(usarApiKey: $usarApiKey) {
     token  
    }
  }
`;