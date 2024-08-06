import { useQuery } from '@apollo/client';
import { GET_EMPLOYEE } from '../gql/GET-EMPLOYEE';

export const usePerDataAct = (prdCod: number | null) => {
  const { data, loading, error } = useQuery(GET_EMPLOYEE, {
    variables: {
      employeeInput: {
        id: prdCod
      }
    }
  });

  let PerDataAct = null;

  if (data?.employee?.PerDataAct) {
    try {
      PerDataAct = JSON.parse(data.employee.PerDataAct);
    } catch (e) {
      console.error("Error parsing PerDataAct JSON:", e);
    }
  }

  return { PerDataAct, loading, error };
};


