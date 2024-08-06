import { createColumnHelper } from "@tanstack/react-table";

import ProgressBar from "@ramonak/react-progress-bar";

import { StatusMediumIcon } from "../../../svg/prioridad/statusMediumIcon";
import { StatusHighIcon } from "../../../svg/prioridad/statusHighIcon";
import { StatusLowIcon } from "../../../svg/prioridad/StatusLowIcon";
import { MenuIcon } from "../../../svg/menuIconGrilla";

import { ActivityView } from "../../../_generated_/graphql";
import { IconGRL } from "../../../svg/grilla/producto/cs3Icon";
import { IconSWT } from "../../../svg/grilla/producto/IconSWT";
import { IconSAC } from "../../../svg/grilla/producto/IconSAC";
import { EnProceso } from "../../../svg/grilla/estado/enProceso";
import { EnEspera } from "../../../svg/grilla/estado/enEspera";
import { Resuelto } from "../../../svg/grilla/estado/resuelto";
import { Vencido } from "../../../svg/grilla/estado/vencido";
import { Devuelto } from "../../../svg/grilla/estado/devuelto";
//import { ButtonActivity } from "./buttomActivity";

type Maybe<T> = T | null | undefined;
type IconPrefix = 'SWT' | 'SAC' | 'GRL'

const iconMap: Record<IconPrefix, JSX.Element> = {
  SWT: <IconSWT />, 
  SAC: <IconSAC />,
  GRL: <IconGRL />,
};

const getIconByPrefix = (value: string): JSX.Element => {
  const prefix = value.substring(0, 3).toUpperCase() as IconPrefix; // Asegúrate de que sea un tipo válido

  return iconMap[prefix] || <IconGRL />; // Icono por defecto si no coincide
};

const extractDescription = (priority: string) => {
  const parts = priority.split('. ');
  return parts.length > 1 ? parts[1] : priority;
};

type Priority = "1. ALTO" | "2. MEDIO" | "3. BAJO";

const columnHelper = createColumnHelper<ActivityView>();

export const Columns = [
  columnHelper.accessor("assignedDate", {
    header: () => "", // Esto indica que no habrá encabezado visible para esta columna
    cell: (/*info*/) => {
      //const value = info.getValue() || "";
      return (
      <div className="">
        <MenuIcon />
      </div>
      )
  },
  }),

  columnHelper.accessor("bitTicket", {
    header: () => (
      <div className="flex">
        <p>Ticket</p>
      </div>
    ),
    cell: (info) => {
      const value = info.getValue() || "";
  
      return (
        <div className=" -ml-21 flex items-center font-verdana font-bold text-12">
          <div className="flex-shrink-0">
            {getIconByPrefix(value)} 
          </div>
          <span className="ml-2 whitespace-nowrap">{value}</span>
        </div>
      );
    },
  }),

  columnHelper.accessor("clientName", {
    header: () => (
      <>
        <div className="flex">
          <p className=" ">Cliente</p>
        </div>
      </>
    ),
    cell: (info) => {
      const client = info.getValue();
      return <div className=" -ml-19 font-verdana font-bold text-12">{client}</div>;
    },
  }),

  columnHelper.accessor("description", {
    header: () => (
      <>
        <div className="flex">
          <p className=" ">Asunto</p>
        </div>
      </>
    ),
    cell: (info) => {
      const subject = info.getValue();
      return (
        <div className="-ml-5 flex  font-verdana font-bold text-12 ">{subject}</div>
      );
    },
  }),

  columnHelper.accessor("remainingPercentage", {
    header: () => (
      <>
        <div className="grid ml-14 whitespace-nowrap  ">
          <p className=" ">Tiempo Transcurrido</p>
        </div>
      </>
    ),
    cell: (info) => (
      <div className="ml-14">
        <ProgressBar
          completed={info.row.original.remainingPercentage ?? 0} // Porcentaje completado
          bgColor="#FF4F58" // Color de fondo de la barra de progreso
          labelAlignment="center" // Posición de la etiqueta (opciones: inside, outside, center)
          height="20px" // Altura de la barra de progreso
          labelColor="#000" // Color de la etiqueta
          width="190px"
          labelClassName="progressBarLabel"
        />
      </div>
    ),
  }),

  columnHelper.accessor("remainingTime", {
    header: () => (
      <>
        <div className="flex -ml-16 whitespace-nowrap ">
          <p className=" ">Tiempo restante</p>
        </div>
      </>
    ),
    cell: (info) => {
      const time = info.getValue();
      return <div className="ml-21 font-verdana font-bold text-12">{time}</div>;
    },
  }),

  columnHelper.accessor("state", {
    header: () => (
      <>
        <div className="flex">
          <p className=" ">Estado</p>
        </div>
      </>
    ),
    cell: (info) => {
      const estado: Maybe<string> = info.getValue();

      const estadoText = estado ?? "No definido";
      let EstadoIcon;
  
      switch (estadoText) {
        case "EN.EJECUCION":
          EstadoIcon = <EnProceso />;
          break;
        case "EN.ESPERA":
          EstadoIcon = <EnEspera />;
          break;
        case "RESUELTA":
          EstadoIcon = <Resuelto />;
          break;
        case "BORRADOR":
          EstadoIcon = <Vencido />;
          break;
        case "DEVUELTA":
          EstadoIcon = <Devuelto />;
          break;
        default:
          EstadoIcon = null;
      }
      return (
        <>
          <div className=" flex  justify-start">
            <div className=" w-77 ">
              <div className=" -ml-7 -mt-3  ">
                {EstadoIcon}
              </div>
            </div>
          </div>
        </>
      );
    },
  }),

  columnHelper.accessor("itemDescription", {
    header: () => (
      <>
        <div className="flex">
          <p className=" ">Prioridad</p>
        </div>
      </>
    ),
    cell: (info) => {
      const priority = info.getValue();  
      const description = extractDescription(priority as Priority);
  
        if (priority === "2. MEDIO")
          return (
            <div className="flex -ml-12.25 font-verdana text-12">
              <p>{description}</p>
              <StatusMediumIcon />
            </div>
          );
  
        if (priority === "1. ALTO")
          return (
            <div className="flex -ml-12.25 font-verdana text-12">
              <p>{description}</p>
              <StatusHighIcon />
            </div>
          );
  
          else if (priority === "3. BAJO")
            return (
              <div className="flex -ml-12.25 font-verdana  text-12">
                <p>{description}</p>
                <StatusLowIcon />
              </div>
            );
      }
    },
  )
];
