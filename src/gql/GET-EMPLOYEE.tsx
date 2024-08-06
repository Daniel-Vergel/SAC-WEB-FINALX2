import { gql } from "@apollo/client";

export const GET_EMPLOYEE = gql`query Employee($employeeInput: EmployeeInput!) {
    employee(employeeInput: $employeeInput) {
      
      stopwatchDate
      stopwatchChanged
      producto
      PerDataAct
      
    }
  }
`;