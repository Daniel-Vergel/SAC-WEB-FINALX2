import { useQuery } from "@apollo/client";
import { endOfWeek, startOfWeek } from "./fechas/semanas/getStartAndEndOfWeek";
import { GET_ACTIVITY_STATE_BY_DATES } from "../../gql/GET-ACTIVITY-BY-DATES";
import { CardsActivitysSqueleton } from "../squeletons/activityWeeks/CardsActivitysSqueleton";



type ActivityState = {
    state: string;
    total: number;
  };
  
  type Data = {
    getActivityStateByDates: ActivityState[];
  };

export const CardsActivitys = () => {
    const { data, loading, error } = useQuery<Data>(GET_ACTIVITY_STATE_BY_DATES, {
        variables: {
          args: {
            FecIni: startOfWeek,
            FecFin: endOfWeek
          },
        },
      });

      //console.log("DATA DE CARDS", data)
      
  if (loading) return <CardsActivitysSqueleton/>;
  if (error) return <p>Error: {error.message}</p>;

  //PRIMERAS TARJETAS (data) (logica)

  const activityStates = data?.getActivityStateByDates || [];

  const resueltas = activityStates.find(item => item.state === 'RESUELTA');
  const enProceso = activityStates.find(item => item.state === 'EN.EJECUCION');
  const enEspera = activityStates.find(item => item.state === 'EN.ESPERA');

  const totalResueltas = resueltas ? resueltas.total : 0;
  const totalenProceso = enProceso ? enProceso.total : 0;
  const totalenEspera = enEspera ? enEspera.total : 0;


  return (
    <>
        <div className=" grid cards-template1 justify-start ">
          {/*Overview*/}
          <div className=" card1 w-119.5 h-80 mr-12 rounded-10 bg-orange3">
            <p className="  ml-10 mt-10 font-verdana text-12 text-black1">
              En espera{" "}
            </p>
            <div className=" w-99.5 ml-10 border-b border-orange2"></div>
            <div className=" grid justify-center font-trebuchet font-bold text-32 text-black1">
              {totalenEspera}
            </div>
          </div>

          {/*Overview*/}
          <div className=" card2 w-119.5 h-80 mr-12 rounded-10 bg-red2">
            <p className="  ml-10 mt-10 font-verdana text-12 text-black1">
              Replicadas{" "}
            </p>
            <div className=" w-99.5 ml-10 border-b border-red3"></div>
            <div className=" grid justify-center font-trebuchet font-bold text-32 text-black1">
              0
            </div>
          </div>

          {/*Overview*/}
          <div className=" card3 w-119.5 h-80 mr-12 rounded-10 bg-cyan4">
            <p className="  ml-10 mt-10 font-verdana text-12 text-black1">
              En proceso{" "}
            </p>
            <div className=" w-99.5 ml-10 border-b border-cyan2"></div>
            <div className=" grid justify-center font-trebuchet font-bold text-32 text-black1">
              {totalenProceso}
            </div>
          </div>

          {/*Overview*/}
          <div className=" card4 w-119.5 h-80 rounded-10 bg-green4">
            <p className="  ml-10 mt-10 font-verdana text-12 text-black1">
              Resueltas{" "}
            </p>
            <div className=" w-99.5 ml-10 border-b border-green1"></div>
            <div className=" grid justify-center font-trebuchet font-bold text-32 text-black1">
              {totalResueltas}
            </div>
          </div>
        </div>
    </>
  )
}
