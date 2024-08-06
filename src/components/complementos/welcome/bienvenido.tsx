import { useRankingQuery } from "../../../customHooks/useRankingQuery";
import { getDecodedToken } from "../../../utils/token";
import { BienvenidoSqueleton } from "../../squeletons/Welcome/bienvenidoSqueleton";


interface RankingData {
    PerCod: number;
    nombre: string;
    cargo?: string | null;
    porcentaje: number;
  }

export const Bienvenido = () => {

    const { data, loading, error } = useRankingQuery(9); 

    if (loading) return <BienvenidoSqueleton/>;
    if (error) return <p>Error: {error.message}</p>;

    const decodedToken2 = getDecodedToken();
    const userName = decodedToken2 ? decodedToken2.userLongName : "Usuario"
    console.log("USERNAME", userName)
    
    const nombreFiltrar = userName;
    const personaEspecifica = data.ranking.find((item: RankingData) => item.nombre === nombreFiltrar) ?? [];

    const decodedToken = getDecodedToken();

    const formatDate = (date: Date) => {
      const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
      const months = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", 
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
      ];
    
      const dayName = days[date.getDay()]; 
      const dayNumber = date.getDate(); 
      const monthName = months[date.getMonth()];
      const year = date.getFullYear();
    
      const fechasDate = {
        dayName,
        dayNumber,
        monthName,
        year
      };

      return fechasDate
    };
    
    const currentDate = new Date(); 
    const formattedDate = formatDate(currentDate);

  return (
    <div className=" flex flex-col mr-10  bg-white">
        <div className=" flex ">
          <p className="  text-40 font-trebuchet font-bold">
            Bienvenido (a) {decodedToken ? decodedToken.userLongName : 'Usuario'}
            <button className=" mt-10 ">
              <svg
                className=" ml-21 "
                width="32"
                height="33"
                viewBox="0 0 32 33"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="0.5"
                  y="0.925293"
                  width="31"
                  height="31"
                  rx="15.5"
                  fill="#078BCD"
                />
                <rect
                  x="0.5"
                  y="0.925293"
                  width="31"
                  height="31"
                  rx="15.5"
                  stroke="#078BCD"
                />
                <path
                  d="M10 16.4751C10 16.7418 10.0167 17.0043 10.05 17.2626C10.0833 17.5209 10.1417 17.7751 10.225 18.0251C10.3083 18.3084 10.3 18.5793 10.2 18.8376C10.1 19.0959 9.925 19.2834 9.675 19.4001C9.40833 19.5334 9.14583 19.5459 8.8875 19.4376C8.62917 19.3293 8.45833 19.1334 8.375 18.8501C8.24167 18.4668 8.14583 18.0751 8.0875 17.6751C8.02917 17.2751 8 16.8751 8 16.4751C8 14.2418 8.775 12.3418 10.325 10.7751C11.875 9.20843 13.7667 8.4251 16 8.4251H16.175L15.275 7.5251C15.0917 7.34176 15 7.10843 15 6.8251C15 6.54176 15.0917 6.30843 15.275 6.1251C15.4583 5.94176 15.6917 5.8501 15.975 5.8501C16.2583 5.8501 16.4917 5.94176 16.675 6.1251L19.275 8.7251C19.475 8.9251 19.575 9.15843 19.575 9.4251C19.575 9.69176 19.475 9.9251 19.275 10.1251L16.675 12.7251C16.4917 12.9084 16.2583 13.0001 15.975 13.0001C15.6917 13.0001 15.4583 12.9084 15.275 12.7251C15.0917 12.5418 15 12.3084 15 12.0251C15 11.7418 15.0917 11.5084 15.275 11.3251L16.175 10.4251H16C14.3333 10.4251 12.9167 11.0126 11.75 12.1876C10.5833 13.3626 10 14.7918 10 16.4751ZM22 16.3751C22 16.1084 21.9833 15.8459 21.95 15.5876C21.9167 15.3293 21.8583 15.0751 21.775 14.8251C21.6917 14.5418 21.7 14.2709 21.8 14.0126C21.9 13.7543 22.075 13.5668 22.325 13.4501C22.5917 13.3168 22.8542 13.3043 23.1125 13.4126C23.3708 13.5209 23.5417 13.7168 23.625 14.0001C23.7583 14.3834 23.8542 14.7751 23.9125 15.1751C23.9708 15.5751 24 15.9751 24 16.3751C24 18.6084 23.225 20.5084 21.675 22.0751C20.125 23.6418 18.2333 24.4251 16 24.4251H15.825L16.725 25.3251C16.9083 25.5084 17 25.7418 17 26.0251C17 26.3084 16.9083 26.5418 16.725 26.7251C16.5417 26.9084 16.3083 27.0001 16.025 27.0001C15.7417 27.0001 15.5083 26.9084 15.325 26.7251L12.725 24.1251C12.525 23.9251 12.425 23.6918 12.425 23.4251C12.425 23.1584 12.525 22.9251 12.725 22.7251L15.325 20.1251C15.5083 19.9418 15.7417 19.8501 16.025 19.8501C16.3083 19.8501 16.5417 19.9418 16.725 20.1251C16.9083 20.3084 17 20.5418 17 20.8251C17 21.1084 16.9083 21.3418 16.725 21.5251L15.825 22.4251H16C17.6667 22.4251 19.0833 21.8376 20.25 20.6626C21.4167 19.4876 22 18.0584 22 16.3751Z"
                  fill="white"
                />
              </svg>
            </button>
          </p>
        </div>

        <p className=" -mt-10 text-32 font-trebuchet  text-blue1">
            {personaEspecifica.cargo || "Cargo no especificado"}
        </p>
        <p className=" text-16 font-trebuchet  text-blue1">
          {formattedDate.dayName}, {formattedDate.dayNumber} de {formattedDate.monthName} de {formattedDate.year}
        </p>

        <div className=" flex items-center w-141 h-40 mt-19 rounded-4 border-l-8 border-t border-b border-r border-green1">
          <svg
            className=" ml-3"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 20.5V4.5H3V11.5C3 11.7833 2.90417 12.0208 2.7125 12.2125C2.52083 12.4042 2.28333 12.5 2 12.5C1.71667 12.5 1.47917 12.4042 1.2875 12.2125C1.09583 12.0208 1 11.7833 1 11.5V4.5C1 3.95 1.19583 3.47917 1.5875 3.0875C1.97917 2.69583 2.45 2.5 3 2.5H21C21.55 2.5 22.0208 2.69583 22.4125 3.0875C22.8042 3.47917 23 3.95 23 4.5V18.5C23 19.05 22.8042 19.5208 22.4125 19.9125C22.0208 20.3042 21.55 20.5 21 20.5ZM9 13.5C7.9 13.5 6.95833 13.1083 6.175 12.325C5.39167 11.5417 5 10.6 5 9.5C5 8.4 5.39167 7.45833 6.175 6.675C6.95833 5.89167 7.9 5.5 9 5.5C10.1 5.5 11.0417 5.89167 11.825 6.675C12.6083 7.45833 13 8.4 13 9.5C13 10.6 12.6083 11.5417 11.825 12.325C11.0417 13.1083 10.1 13.5 9 13.5ZM9 11.5C9.55 11.5 10.0208 11.3042 10.4125 10.9125C10.8042 10.5208 11 10.05 11 9.5C11 8.95 10.8042 8.47917 10.4125 8.0875C10.0208 7.69583 9.55 7.5 9 7.5C8.45 7.5 7.97917 7.69583 7.5875 8.0875C7.19583 8.47917 7 8.95 7 9.5C7 10.05 7.19583 10.5208 7.5875 10.9125C7.97917 11.3042 8.45 11.5 9 11.5ZM3 21.5C2.45 21.5 1.97917 21.3042 1.5875 20.9125C1.19583 20.5208 1 20.05 1 19.5V18.7C1 18.1333 1.14583 17.6125 1.4375 17.1375C1.72917 16.6625 2.11667 16.3 2.6 16.05C3.63333 15.5333 4.68333 15.1458 5.75 14.8875C6.81667 14.6292 7.9 14.5 9 14.5C10.1 14.5 11.1833 14.6292 12.25 14.8875C13.3167 15.1458 14.3667 15.5333 15.4 16.05C15.8833 16.3 16.2708 16.6625 16.5625 17.1375C16.8542 17.6125 17 18.1333 17 18.7V19.5C17 20.05 16.8042 20.5208 16.4125 20.9125C16.0208 21.3042 15.55 21.5 15 21.5H3ZM3 19.5H15V18.7C15 18.5167 14.9542 18.35 14.8625 18.2C14.7708 18.05 14.65 17.9333 14.5 17.85C13.6 17.4 12.6917 17.0625 11.775 16.8375C10.8583 16.6125 9.93333 16.5 9 16.5C8.06667 16.5 7.14167 16.6125 6.225 16.8375C5.30833 17.0625 4.4 17.4 3.5 17.85C3.35 17.9333 3.22917 18.05 3.1375 18.2C3.04583 18.35 3 18.5167 3 18.7V19.5Z"
              fill="#00BB89"
            />
          </svg>

          <p className=" flex ml-10 text-20 text-gray1 font-trebuchet">
            {" "}
            En oficina{" "}
          </p>
        </div>
      </div>
  )
}
