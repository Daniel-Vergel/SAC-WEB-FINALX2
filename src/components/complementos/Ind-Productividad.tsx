import { Cell, Pie, PieChart } from "recharts";
import { ButtonReport } from "./buttom/ButtomReport";
import { useQuery } from "@apollo/client";
import { GET_ACTIVITY_STATE_BY_DATES } from "../../gql/GET-ACTIVITY-BY-DATES";
import { endOfMonth, startOfMonth } from "./fechas/meses/ThreeMonths/getStartAndEndOfLastThreeMonths";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import { endOfMonthSix, startOfMonthSix } from "./fechas/meses/SixMonths/getStartAndEndOfLastSixMonths";
import { endOfMonthNine, startOfMonthNine } from "./fechas/meses/NineMonths/getStartAndEndOfLastNineMonths";
import { SqueletonIndiceProductividad } from "../squeletons/indiceProductividad/SqueletonIndiceProductividad";



//import { useEffect, useState } from "react";

type ActivityState = {
  state: string;
  total: number;
};

type Data = {
  getActivityStateByDates: ActivityState[];
};

export const IndProductividad = () => {

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

  const { data, loading, error } = useQuery<Data>(GET_ACTIVITY_STATE_BY_DATES, {
    variables: {
      args: {
        FecIni: fechaDeInicio,
        FecFin: fechaFinal
      },
    },
    fetchPolicy: 'no-cache', 
  });


  if (loading) return <SqueletonIndiceProductividad/>;
  if (error) return <p>Error: {error.message}</p>;


  // Función para asignar colores según el estado
const getColorForState = (state: string) => {
  switch (state) {
    case 'RESUELTA':
      return '#00E0A4';
    case 'EN.EJECUCION':
      return '#03BAD9';
    case 'EN.ESPERA':
      return '#EF6A1F';
    default:
      return '#EF6A1F'; // Color por defecto
  }
};


  const array1 = data?.getActivityStateByDates[0];

  const array2 = data?.getActivityStateByDates[1];

  const array3 = data?.getActivityStateByDates[2]; 

 
  const data01 = [
    {
      name: array1?.state || '', 
      value: array1?.total || 0, 
      color: getColorForState(array1?.state || ''), 
    },
    {
      name: array2?.state || '',
      value: array2?.total || 0, 
      color: getColorForState(array2?.state || ''),
    },
    {
      name: array3?.state || '', 
      value: array3?.total || 0, 
      color: getColorForState(array3?.state || ''), 
    },
  ];

  //console.log('Final data:', data01);

  const activityStates = data?.getActivityStateByDates || [];

  // Filtrar los estados específicos
  const resueltas = activityStates.find(item => item.state === 'RESUELTA');
  const enProceso = activityStates.find(item => item.state === 'EN.EJECUCION');
  const enEspera = activityStates.find(item => item.state === 'EN.ESPERA');

 
  // Calcular el total general
  const totalGeneral = activityStates.reduce((acc, curr) => acc + curr.total, 0);

  // Calcular el total de tareas resueltas
  const totalResueltas = resueltas ? resueltas.total : 0;

  // Calcular el porcentaje de efectividad (solo tareas resueltas)
  const porcentajeEfectividad = totalResueltas > 0 ? (totalResueltas / totalGeneral) * 100 : 0;


  return (
    <>
      {/*frame 973*/}
      <div className="grid h-full ml-10 mr-10 border-1 rounded-10 border-gray3">
        {/*frame 1117*/}
        <div className=" grid grid-flow-col  ml-10 mt-10 ">
          <div className=" grid  translate-y-5.5 font-trebuchet font-bold text-16 text-blue2  ">
            Índice de productividad
          </div>
          <div className=" grid justify-end mr-10">
            <ButtonReport />
          </div>
        </div>
        <div className=" grid -mt-16 ml-10 mr-10 mb-16  border-b border-cyan2"></div>

        {/*frame 1132*/}
        <div className="flex ml-10 mr-10">
          {/*Chart Graphic*/}
          <div className="flex w-152 h-152  ">
          <PieChart className="" width={162} height={165} style={{ transform: "scaleX(-1)" }}>
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
                {`${porcentajeEfectividad.toFixed()}%`}
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
            <div className=" flex flex-col w-full  -mt-7  border-b border-gray5  ">
              {/*frame 7*/}
              <div className=" grid grid-flow-col font-trebuchet font-bold text-16   ">
                <div className=" grid tracking-1  ">Total de actividades</div>
                <div className="grid justify-end  tracking-1  ">{totalGeneral}</div>
              </div>

              {/*frame 10*/}
              <div className=" grid grid-flow-col mt-4  font-trebuchet text-14 text-gray2">
                <div
                  className=" absolute translate-y-2 w-14 h-14 
                                    rounded-full bg-cyan1"
                ></div>

                <div className=" flex ml-23  ">En proceso</div>

                <div className=" grid justify-end tracking-1  ">{enProceso && enProceso.total !== undefined ? enProceso.total : 0}</div>
              </div>

              {/*frame 13*/}
              <div className=" grid grid-flow-col mt-4  font-trebuchet text-14 text-gray2">
                <div
                  className=" absolute translate-y-2 w-14 h-14 
                                    rounded-full bg-orange1"
                ></div>

                <div className=" flex ml-23  ">En espera</div>

                <div className=" grid justify-end tracking-1  ">{enEspera && enEspera.total !== undefined ? enEspera.total : 0}</div>
              </div>

              {/*frame 12*/}
              <div className=" grid grid-flow-col mt-4 font-trebuchet text-14 text-gray2">
                <div
                  className=" absolute translate-y-2 w-14 h-14 
                                    rounded-full bg-green1"
                ></div>

                <div className=" flex ml-23  ">Resueltos  </div>

                <div className=" grid justify-end tracking-1  ">{resueltas && resueltas.total !== undefined ? resueltas.total : 0}</div>
              </div>
            </div>

            {/*frame 14*/}
            <div className="flex flex-col w-full  mt-10 ">
              {/*frame 12*/}
              <div className=" grid grid-flow-col  ">
                <div className="font-trebuchet text-13 tracking-1 text-gray1">
                  {" "}
                  Tiempo promedio de respuesta*{" "}
                </div>
                <div className=" grid justify-end -mt-3 font-trebuchet font-bold text-16 tracking-1 text-black1  ">
                  {" "}
                  0H 3M{" "}
                </div>
              </div>

              {/*frame 13*/}
              <div className=" grid grid-flow-col w-272 h-19 mt-4 ">
                <div className="font-trebuchet text-13 tracking-1 text-gray1">
                  {" "}
                  Tiempo promedio de solución{" "}
                </div>
                <div className=" grid justify-end -mt-3 font-trebuchet font-bold text-16 tracking-1 text-black1  ">
                  {" "}
                  9H 20M{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" flex ml-16 font-trebuchet text-10 text-gray9">
          {" "}
          *Tiempo entre asignación y registro de la primera interacción en una
          actividad{" "}
        </div>
      </div>
    </>
  );
};
