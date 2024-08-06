
import { useQuery } from '@apollo/client';
import { GET_RANKING } from '../gql/GET-RANKING';


export const useRankingQuery = (prdCod: number | null) => {
  const { data, loading, error } = useQuery(GET_RANKING, {
    variables: {
      prdCod: prdCod
    },
  });

  return { data, loading, error };
};
