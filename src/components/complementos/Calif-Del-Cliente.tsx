import ProgressBar from "@ramonak/react-progress-bar";
//import { StarIcons } from "../iconos.jsx/StarIcons";
import { ButtonReport } from "./buttom/ButtomReport";
import { useQuery } from "@apollo/client";
import { GET_ACTIVITY_RATING } from "../../gql/GET-ACTIVITY-RATING";
import StarRatings from 'react-star-ratings';
import { endOfMonth, startOfMonth } from "./fechas/meses/ThreeMonths/getStartAndEndOfLastThreeMonths";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { endOfMonthSix, startOfMonthSix } from "./fechas/meses/SixMonths/getStartAndEndOfLastSixMonths";
import { endOfMonthNine, startOfMonthNine } from "./fechas/meses/NineMonths/getStartAndEndOfLastNineMonths";
import { CalificacionSqueleton } from "../squeletons/calificacion/calificacionSqueleton";




interface ActivityRating {
  __typename: string;
  consultor: number;
  calificacion: string;
  total: number;
}

export const CalifDelCliente = () => {

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
  

  const { data, loading, error } = useQuery(GET_ACTIVITY_RATING, {
    variables: {
      args: {
        FecIni: fechaDeInicio,
        FecFin: fechaFinal
      },
    },
    fetchPolicy: 'no-cache',
  });

  
  if (loading) return <CalificacionSqueleton/>;
  if (error) return <p>Error: {error.message}</p>;



  const data01 = data?.getActivityRatingByDates || [];

  {/* CALIFICACIONES */}
  //SIN CALIFAR
  const SIN_CALIFICAR = data01.find((item: ActivityRating) => item.calificacion === 'SIN.CALIFICAR');
  const totalSinCalificar = SIN_CALIFICAR ? SIN_CALIFICAR.total : 0;

   //MALA
   const MALA = data01.find((item: ActivityRating) => item.calificacion === 'MALA');
   const totalMala = MALA ? MALA.total : 0;

   //MUY BUENA
   const MUY_BUENA = data01.find((item: ActivityRating) => item.calificacion === 'MUY.BUENA');
   const totalMuyBuena = MUY_BUENA ? MUY_BUENA.total : 0;

   //BUENO
   const BUENO = data01.find((item: ActivityRating) => item.calificacion === 'BUENO');
   const totalBueno = BUENO ? BUENO.total : 0;

   //REGULAR
   const REGULAR = data01.find((item: ActivityRating) => item.calificacion === 'REGULAR');
   const totalRegular = REGULAR ? REGULAR.total : 0;

   //PESIMO
   const PESIMO = data01.find((item: ActivityRating) => item.calificacion === 'PESIMO');
   const totalPesimo = PESIMO ? PESIMO.total : 0;

  const totalDeCalificaciones = totalMala + totalMuyBuena + totalBueno + totalRegular + totalPesimo

  {/* CALIFICACIONES NUMERICAS*/}

  // Valores numéricos a las calificaciones
  const asignarValorNumerico = (calificacion: string): number => {
    switch (calificacion) {
      case 'MUY.BUENA':
        return 5;
      case 'BUENA':
        return 4;
      case 'REGULAR':
        return 3;
      case 'MALA':
        return 2;
      case 'SIN.CALIFICAR':
      default:
        return 1;
    }
  };

  const calificacionesValidas = data01.filter((item: ActivityRating) => item.calificacion !== 'SIN.CALIFICAR');

   // Calcular el promedio ponderado de las calificaciones
   let sumaPonderada = 0;
   let totalCalificaciones = 0;
 
   calificacionesValidas.forEach((rating: ActivityRating) => {
     const valorNumerico = asignarValorNumerico(rating.calificacion);
     sumaPonderada += valorNumerico * rating.total;
     totalCalificaciones += rating.total;
   });
 
   const promedio = totalCalificaciones > 0 ? sumaPonderada / totalCalificaciones : 0;

   
 
  
   const PromedioRedondeado = (promedio: number) => {
     // Redondear más cercano a 0.5
     const roundedPromedio = Math.round(promedio * 2) / 2;
     // Limitar el resultado entre 1 y 5
     return Math.max(0, Math.min(5, roundedPromedio));
   };

  


  return (
    <div className="  border-1 mr-10 border-gray3 rounded-10">
      <div className=" grid grid-flow-col  ml-17 mt-10">
        <div className=" grid w-257 h-21  translate-y-5.5  font-trebuchet font-bold text-16 text-blue2 ">
          Calificación del cliente
        </div>

        <div className=" flex justify-end mr-10">
          <ButtonReport />
        </div>
      </div>

      <div className=" grid mr-10 ml-15px mb-8 border-b border-cyan2"></div>

      {/*Frame 1113*/}
      <div className="grid ml-16  h-56  ">
        {/*Frame 1115*/}
        <div className=" grid mr-60 ">
          {/*Frame 1114*/}
          <div className="grid grid-flow-col   ">
          <StarRatings
        rating={PromedioRedondeado(promedio)}
        starRatedColor="#F7A32D"
        numberOfStars={5}
        starDimension="40px"
        starSpacing="5px"
        
      />
          </div>

          {/*Frame 1116*/}
          <div className="w-200 h-16  border-blue-500">
            <p className=" font-trebuchet text-14 text-gray2 ml-10">
              {" "}
              {totalDeCalificaciones} calificaciones
            </p>
          </div>
        </div>
        <div className=" grid justify-end  mt-5 mr-10  -translate-y-60 font-trebuchet font-bold text-32 text-black1">
          {PromedioRedondeado(promedio)}
        </div>
      </div>

      <hr className=" grid mt-7 mr-10 ml-15px mb-8 bg-gray2 " />

      {/*Frame 1119*/}
      <div className="flex items-center  mr-10 ml-12 mb-6px">
        <div className="flex-1 font-trebuchet text-12 ml-10 text-gray-500">Excelente</div>
        <div className="flex-1 -ml-19">
          <ProgressBar
            completed={totalMuyBuena} // Porcentaje completado
            bgColor="#078BCD" // Color de fondo de la barra de progreso
            labelAlignment="center" // Posición de la etiqueta (opciones: inside, outside, center)
            height="7px" // Altura de la barra de progreso
            labelColor="#000" // Color de la etiqueta
            width="150%"
            labelClassName="progressBarLabel hiddenLabel"
            customLabel=""
          />
        </div>
        <div className="flex-1 flex mr-10 justify-end font-trebuchet text-12 text-gray-500">
          {totalMuyBuena}
        </div>
      </div>


      {/*Frame 1120*/}
      <div className="flex items-center  mr-10 ml-12 mb-6px">
        <div className="flex-1 font-trebuchet text-12 ml-10 text-gray-500">Bueno</div>
        <div className="flex-1 -ml-19">
          <ProgressBar
            completed={totalBueno} 
            bgColor="#078BCD" 
            labelAlignment="center" 
            height="7px" 
            labelColor="#000" 
            width="150%"
            labelClassName="progressBarLabel hiddenLabel"
            customLabel=""
          />
        </div>
        <div className="flex-1 flex mr-10 justify-end font-trebuchet text-12 text-gray-500">
          {totalBueno}
        </div>
      </div>

      {/*Frame 1121*/}
      <div className="flex items-center  mr-10 ml-12 mb-6px">
        <div className="flex-1 font-trebuchet text-12 ml-10 text-gray-500">Regular</div>
        <div className="flex-1 -ml-19">
          <ProgressBar
            completed={totalRegular} 
            bgColor="#078BCD"
            labelAlignment="center" 
            height="7px"
            labelColor="#000" 
            width="150%"
            labelClassName="progressBarLabel hiddenLabel"
            customLabel=""
          />
        </div>
        <div className="flex-1 flex mr-10 justify-end font-trebuchet text-12 text-gray-500">
          {totalRegular}
        </div>
      </div>

      {/*Frame 1122*/}
      <div className="flex items-center  mr-10 ml-12 mb-6px">
        <div className="flex-1 font-trebuchet text-12 ml-10 text-gray-500">Malo</div>
        <div className="flex-1 -ml-19">
          <ProgressBar
            completed={totalMala} 
            bgColor="#078BCD"
            labelAlignment="center" 
            height="7px"
            labelColor="#000" 
            width="150%"
            labelClassName="progressBarLabel hiddenLabel"
            customLabel=""
          />
        </div>
        <div className="flex-1 flex mr-10 justify-end font-trebuchet text-12 text-gray-500">
          {totalMala}
        </div>
      </div>

      {/*Frame 1123*/}
      <div className="flex items-center  mr-10 ml-12 mb-6px">
        <div className="flex-1 font-trebuchet text-12 ml-10 text-gray-500">Sin Calificar</div>
        <div className="flex-1 -ml-19">
          <ProgressBar
            completed={totalSinCalificar} 
            bgColor="#078BCD"
            labelAlignment="center" 
            height="7px"
            labelColor="#000" 
            width="150%"
            labelClassName="progressBarLabel hiddenLabel"
            customLabel=""
          />
        </div>
        <div className="flex-1 flex justify-end mr-10 font-trebuchet text-12 text-gray-500">
          {totalSinCalificar}
        </div>
      </div>

    </div>
  );
};
