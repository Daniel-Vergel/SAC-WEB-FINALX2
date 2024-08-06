import { gql } from "@apollo/client";


export const PERDATA = gql`query Employee($employeeInput: EmployeeInput!) {
    employee(employeeInput: $employeeInput) {
     
      PerDataAct 
      
    }
  }
`;
