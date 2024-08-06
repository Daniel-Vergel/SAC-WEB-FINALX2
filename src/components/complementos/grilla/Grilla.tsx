import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { MdFirstPage } from "react-icons/md";
import { MdLastPage } from "react-icons/md";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

import "../../../App.css";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import { useQuery } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import {
  nextPage,
  nextPageX10,
  prevPage,
  prevPagex10,
  setCurrentPage,
} from "../../../store/paginationSate/paginationState";

import { RootState } from "../../../store/store";
import { GET_CURRENT_ACTIVITIES } from "../../../gql/GET-ACTIVITIES";
import { Columns } from "./columns";
import FilteringRows from "./FilteringRows";
import { GrillaSqueleton } from "../../squeletons/grillaSqueletons/grillaSqueleton";
import { useEffect, useMemo, useState } from "react";
import SortingFilteringState from "./filters/SortingFilteringState";
import SortingFilteringBox from "./filters/SortingFilteringBox";
import SortingFilteringClientName from "./filters/SortingFilteringClientName";
import SortingFilteringDescription from "./filters/SortingFilteringDescription";
import SortingFilteringBitTicket from "./filters/SortingFilteringBitTicket";

export const Grilla = () => {
  const { currentPage } = useSelector((state: RootState) => state.PaginationState);
  const { inputValue } = useSelector((state: RootState) => state.valueState);
  const { clientNameState } = useSelector((state: RootState) => state.selectedClientName);
  const { clientDescriptionState } = useSelector((state: RootState) => state.selectedDescription);
  const { bitTicketState } = useSelector((state: RootState) => state.bitTicketState);


  const dispatch = useDispatch();
  const selectedStates = useSelector((state: RootState) => state.selectedStates.value);
  const { inputValueRows } = useSelector((state: RootState) => state.inputValueRows);


  const { data, loading, error } = useQuery(GET_CURRENT_ACTIVITIES, {
    variables: {
      pagination: {
        skip: (currentPage - 1) * 4,
        take: inputValueRows && !isNaN(inputValueRows) && parseInt(inputValueRows.toString()) > 0 ? parseInt(inputValueRows.toString()) : 4,
      },
      where: {
        state: {
          _in: selectedStates
        },
        clientName: {
          _contains: clientNameState
        },
        description: {
          _contains: clientDescriptionState
        },
        bitTicket: {
          _contains: bitTicketState
        },
      },
    },
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    dispatch(setCurrentPage());
  }, [selectedStates, clientNameState, clientDescriptionState, bitTicketState, dispatch]);
   
  //ORDENAMIENTO
  const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc' | 'desc' } | null>({
    key: 'assignedDate',  
    direction: 'desc',    
  });
  
  const sortedData = useMemo(() => {
    if (!data?.getCurrentActivities) return [];
    const sortedArray = [...data.getCurrentActivities];
    if (sortConfig !== null) {
      sortedArray.sort((a, b) => {
        const dateA = new Date(a[sortConfig.key]);
        const dateB = new Date(b[sortConfig.key]);
        if (dateA < dateB) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (dateA > dateB) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortedArray;
  }, [data, sortConfig]);
  
  const requestSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };
  
  // El resto de tu componente
  

  const table = useReactTable({
    data: sortedData,
    columns: Columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter: inputValue,
    },
  });

  if (error) return <p> Error: {error.message}</p>;
  if (loading) return <GrillaSqueleton/>;

  return (
    <>

      <div className="  overflow-auto scrollbar-webkit">
        <table className="w-full ">
          <thead className=" bg-purple1">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className="font-verdana text-12 text-blue1 border-b-2 border-blue1"
              >
                {headerGroup.headers.map((header, index) => (
                  <th
                    key={header.id}
                    className="  h-46 px-6 py-4 text-sm font-semibold tracking-wide text-left"
                    
                  >
                    <div className="  flex items-center" key={index}>
                    {index === 6 ? (
                        // Verifica si es el header 6 y renderiza el nuevo componente
                        <>
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          <div className="  ">
                            <SortingFilteringState requestSort={requestSort} />
                          </div>
                        </>
                      ) : index === 2 ? ( 
                        // Verifica si es el header 3 y renderiza un componente específico para ese índice
                        <>
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          <div className="  ">
                            {/* Componente específico para el índice 3 */}
                            <SortingFilteringClientName requestSort={requestSort} />
                          </div>
                        </>
                      ) : index === 1 ? ( 
                        // Verifica si es el header 3 y renderiza un componente específico para ese índice
                        <>
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          <div className="  ">
                            {/* Componente específico para el índice 3 */}
                            <SortingFilteringBitTicket requestSort={requestSort} />
                          </div>
                        </>
                      ) : index === 3 ? ( 
                        // Verifica si es el header 3 y renderiza un componente específico para ese índice
                        <>
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          <div className="  ">
                            {/* Componente específico para el índice 3 */}
                            <SortingFilteringDescription requestSort={requestSort} />
                          </div>
                        </>
                      ) : index === 4 || [5, 7].includes(index) ? (
                        // Verifica si es la primera columna o una de las columnas específicas
                        <>
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          <div className="  ">
                            <SortingFilteringBox requestSort={requestSort} />
                          </div>
                        </>
                      ) : (
                        <>
                          <div>
                            <FilteringRows />
                          </div>
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </>
                      )}
                      </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody className="divide-y divide-gray-100">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="h-52 px-6 py-4 text-12 text-gray1"
                    style={{
                      maxWidth: "180px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
 

      <div className=" rounded-10 border shadow-md w-150">
        <div className=" flex ml-4 mb-4 mt-4">
          {/* Atras x 10 */}
          <button onClick={() => dispatch(prevPagex10())}>
            <MdKeyboardDoubleArrowLeft className=" text-2xl -mt-2 text-blue1" />
          </button>

          {/* Pagina anterior */}
          <button onClick={() => dispatch(prevPage())} className="mr-10">
            {" "}
            <MdFirstPage className=" text-2xl -mt-2 text-blue1" />
          </button>

          {/*Cantidad de paginas*/}
          <div className="text-blue1  font-trebuchet">{currentPage}</div>

          {/* Siguiente Pagina*/}
          <button onClick={() => dispatch(nextPage())} className="ml-10">
            <MdLastPage className=" text-2xl -mt-2 text-blue1" />
          </button>

          {/*Siguiente x 10*/}
          <button onClick={() => dispatch(nextPageX10())}>
            <MdKeyboardDoubleArrowRight className=" text-2xl -mt-2 text-blue1" />
          </button>
        </div>
      </div>
         
    </>
  );
};
