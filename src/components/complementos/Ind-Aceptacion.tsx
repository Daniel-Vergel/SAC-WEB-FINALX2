import { Cell, Pie, PieChart } from "recharts";
import { ButtonReport } from "./buttom/ButtomReport";
import { useQuery } from "@apollo/client";
import { GET_ACTIVITY_REJECT } from "../../gql/GET-ACTIVITY-REJECT";
import { endOfMonth, startOfMonth } from "./fechas/meses/ThreeMonths/getStartAndEndOfLastThreeMonths";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { endOfMonthSix, startOfMonthSix } from "./fechas/meses/SixMonths/getStartAndEndOfLastSixMonths";
import { endOfMonthNine, startOfMonthNine } from "./fechas/meses/NineMonths/getStartAndEndOfLastNineMonths";
import { AceptacionSqueleton } from "../squeletons/aceptacion/aceptacionSqueleton";



export const IndAceptacion = () => {

  const { months } = useSelector((state: RootState) => state.inputMonthsState);


  // Función para obtener las fechas de inicio y fin según el valor de months
  const getDatesForMonths = (months: string) => {
    switch (months) {

      case '6 meses':
        return { inicio: startOfMonthSix, fin: endOfMonthSix };
      case '9 meses':
        return { inicio: startOfMonthNine, fin: endOfMonthNine };
      default:
        // Por defecto, devolver 3 meses si el valor no coincide
        return { inicio: startOfMonth, fin: endOfMonth };
    }
  };

  // Obtén las fechas de inicio y fin según el valor de months
  const { inicio, fin } = getDatesForMonths(months);

  // Convierte las fechas de inicio y fin en objetos Date si es necesario
  let fechaDeInicio = inicio;
  let fechaFinal = fin;

  const { data, loading, error } = useQuery(GET_ACTIVITY_REJECT, {
    variables: {
      args: {
        FecIni: fechaDeInicio,
        FecFin: fechaFinal
      },
    },
    fetchPolicy: 'no-cache', 
  });
  //console.log("ACEPTACION", data)

  if (loading) return <AceptacionSqueleton/>;
  if (error) return <p>Error: {error.message}</p>;

  const activityData = data?.getActivityRejectByDates[0] ?? [];

const data01 = [
  {
    name: "Aceptado",
    value: activityData?.totalAceptas || 0,
    color: "#3E4EB8",
  },
  {
    name: "Rechazado",
    value: activityData?.totalRechazadas || 0,    
    color: "#FF4F58",
  },
  {
    name: "Rechazado por vencimiento",
    value: activityData?.totalRechazasPorVencimiento || 0 ,   
    color: "#F7A32D",
  },
];

const totalTareas = activityData.total;
const tareasAceptadas = activityData.totalAceptas;

const efectividad = (tareasAceptadas / totalTareas) * 100;


  
  return (
    <>
      {/*frame 973*/}
      <div className=" grid h-full mr-10 border-1 rounded-10 border-gray3">
        {/*frame 1117*/}
        <div className=" grid grid-flow-col ml-10 mt-10 mr-10 h-40 border-b-1 border-cyan2 ">
          <div className=" grid  translate-y-5.5 font-trebuchet font-bold text-16 text-blue2  ">
            Índice de aceptacion
          </div>
          <div className=" grid justify-end">
            <ButtonReport />
          </div>
        </div>

        {/*frame 1132*/}
        <div className="flex  mr-10 -mt-10">
          {/*Chart Graphic*/}
          <div className="flex w-152 h-152 ml-10  ">
            <PieChart
              className="  "
              width={162}
              height={165}
              style={{ transform: "scaleX(-1)" }}
            >
              <Pie
                data={data01}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="45%"
                innerRadius={57}
                outerRadius={80}
                fill="#82ca9d"
                stroke="transparent"
              >
                {data01.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>

            {/*frame 1131*/}
            <div className=" grid absolute w-68 h-42 translate-x-42 translate-y-55 ">
              {/*frame 1128*/}
              <div className=" w-46 h-28 translate-x-10 ">
                <p className="grid justify-center font-trebuchet font-bold text-24 text-black1 -mt-5">
                  {efectividad}% 
                </p>
              </div>

              {/*frame 1129*/}
              <div className=" w-68 h-14 ">
                <p className="grid justify-center font-trebuchet font-bold text-12 -mt-3 text-gray2 ">
                  efectividad
                </p>
              </div>
            </div>
          </div>

          {/*frame 1129*/}
          <div className="flex flex-col w-full ml-13 ">
            {/*frame 13*/}
            <div className=" flex flex-col w-full -mt-7">
              {/*frame 7*/}
              <div className=" grid grid-flow-col font-trebuchet font-bold text-16   ">
                <div className=" grid tracking-1  ">
                  Total de actividades asignadas
                </div>
                <div className="grid justify-end  tracking-1  ">{activityData.total}</div>
              </div>

              {/*frame 10*/}
              <div className=" grid grid-flow-col mt-4  font-trebuchet text-14 text-gray2">
                <div
                  className=" absolute translate-y-2 w-14 h-14 
                                    rounded-full bg-blue4"
                ></div>

                <div className=" flex ml-23  ">Aceptado</div>

                <div className=" grid justify-end tracking-1  ">{activityData?.totalAceptas || 0}</div>
              </div>

              {/*frame 13*/}
              <div className=" grid grid-flow-col mt-4  font-trebuchet text-14 text-gray2">
                <div
                  className=" absolute translate-y-2 w-14 h-14 
                                    rounded-full bg-red3"
                ></div>

                <div className=" flex ml-23  ">Rechazado</div>

                <div className=" grid justify-end tracking-1  ">{activityData?.totalRechazadas || 0}</div>
              </div>

              {/*frame 12*/}
              <div className=" grid grid-flow-col mt-4 font-trebuchet text-14 text-gray2">
                <div
                  className=" absolute translate-y-2 w-14 h-14 
                                    rounded-full bg-orange1"
                ></div>

                <div className=" flex ml-23  ">Rechazado por vencimiento</div>

                <div className=" grid justify-end tracking-1  ">{activityData?.totalRechazadasPorVencimiento || 0}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
