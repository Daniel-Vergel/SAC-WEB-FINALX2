import { useQuery } from '@apollo/client';
import { GET_EMPLOYEE } from '../gql/GET-EMPLOYEE';

export const getPerDatAct = (prdCod: number | null ) => {

    const { data, loading, error } = useQuery(GET_EMPLOYEE, {
        variables: {
            employeeInput: {
            id: prdCod
                  
    }},
    });
    
    const data01 = data?.employee
    const PerDataAct = data01.PerDataAct

    console.log("PERDATA", PerDataAct)
    
  return { PerDataAct };

}
  