import Select from "react-select";
import { Print } from "./iconos.jsx/Print";
import { Grilla } from "./complementos/grilla/Grilla";
import { CardsActivitys } from "./complementos/cardsActivitys";
import { CardsActivitys2 } from "./complementos/cardsActivitys2";
import { useDispatch, useSelector } from "react-redux";
import { toggleState } from "../store/grillaState.tsx/SelectedStates";
import { RootState } from "../store/store";

const optionsList = [
  { value: "listado 1", label: "Listado 1" },
  { value: "listado 2", label: "Listado 2" },
  { value: "listado 3", label: "Listado 3" },
];

export const ActividadesDeHoy = () => {

  const dispatch = useDispatch();
  const selectedStates = useSelector((state: RootState) => state.selectedStates.value);
  
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    dispatch(toggleState(value));
  };

  const isChecked = selectedStates.includes('RESUELTA');

  return (
    <div className=" grid border-1 border-gray3 rounded-10">
      {/*Header*/}
      <div className=" grid grid-flow-col ml-10 mt-10 mr-10  ">
        <div className=" flex ">
          <p className=" font-trebuchet font-bold text-24 text-blue1 ">
            {" "}
            Actividades de la semana{" "}
          </p>
        </div>

        <div className=" grid grid-flow-col justify-self-end">
          <div className="flex items-center mr-40">
            <input
              type="checkbox"
              id="mostrarActividades"
              value={'RESUELTA'}
              checked={isChecked}
              onChange={handleCheckboxChange}
              className=" w-20 h-20 mr-7 border-2 border-cyan1"

            />
            <label
              htmlFor="mostrarActividades"
              className="font-roboto text-16 text-gray8"
            >
              Mostrar actividades resueltas
            </label>
          </div>

          <div className=" grid justify-end font-roboto text-16 text-gray8">
            <Select
              options={optionsList}
              placeholder={
                  <p className=" flex items-center font-roboto text-16 text-gray8 ">
                    <Print />
                  <p className="ml-10">Imprimir Listado</p>
                </p>
              }
            />
          </div>
        </div>
      </div>

      {/*CARDS*/}
      <div className=" grid grid-cols-2 ml-10 mr-10 mt-12 ">
        {/* Seccion 1*/}
        <CardsActivitys/>

        {/* Seccion 2*/}
        <CardsActivitys2/>
      </div>

        {/*GRILLA*/}
      <div className=" ml-10 mr-10 mt-18 mb-5 overflow-auto  ">
        <Grilla />
      </div>
    </div>
  );
};
