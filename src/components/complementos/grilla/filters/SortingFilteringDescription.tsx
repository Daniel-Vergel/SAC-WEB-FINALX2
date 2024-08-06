import { useEffect, useRef, useState } from "react";
import { PiSortDescending } from "react-icons/pi";
import { PiSortAscendingLight } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { setSelectedDescription } from "../../../../store/grillaState.tsx/SelectedDescription";
import { useDebounce } from "../../../../utils/useDebounce";

interface SortingFilteringBoxProps {
  requestSort: (key: string, direction: 'asc' | 'desc') => void;
}

const SortingFilteringDescription: React.FC<SortingFilteringBoxProps> = ({ requestSort }) => {
  const dispatch = useDispatch(); 
  const { clientDescriptionState } = useSelector((state: RootState) => state.selectedDescription);
  const [isOpen, setIsOpen] = useState(false);
  const sortingFilteringRef = useRef(null);
  const [direction, setDirection] = useState<'asc' | 'desc'>('asc');

  const [inputFocused, setInputFocused] = useState(false);
  const [inputValue, setInputValue] = useState(clientDescriptionState);
  const debouncedClientName = useDebounce(inputValue, 1000);

  useEffect(() => {
    dispatch(setSelectedDescription(debouncedClientName));
  }, [debouncedClientName, dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === "number" ? parseFloat(e.target.value) : e.target.value;
    setInputValue(value);
  };


  const handleSortBy = (direction: 'asc' | 'desc') => {
    setDirection(direction);
    requestSort('description', direction);
  };


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sortingFilteringRef.current &&
        !(sortingFilteringRef.current as HTMLElement).contains(
          event.target as Node
        ) && !inputFocused
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [inputFocused]);

  const toggleBox = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className=" relative " ref={sortingFilteringRef}>
      <button onClick={toggleBox} className=" text-black  ">
        <div >
        <svg
          className={`mt-5 ml-16  rounded-4 transform ${direction === 'desc' ? 'rotate-180' : ''}`}
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="0.5"
            y="0.5"
            width="19"
            height="19"
            rx="3.5"
            stroke="#999999"
          />
          <path
            d="M6.67462 8H13.3254C13.4604 8.00211 13.5917 8.03736 13.7029 8.10137C13.8141 8.16538 13.9002 8.2553 13.9505 8.35991C14.0008 8.46451 14.0131 8.57917 13.9858 8.68956C13.9585 8.79995 13.8928 8.90118 13.797 8.98062L10.4716 11.8358C10.4099 11.8878 10.3365 11.9291 10.2555 11.9573C10.1746 11.9855 10.0877 12 10 12C9.91228 12 9.82543 11.9855 9.74447 11.9573C9.66352 11.9291 9.59007 11.8878 9.52837 11.8358L6.20299 8.98062C6.10716 8.90118 6.04149 8.79995 6.01419 8.68956C5.98689 8.57917 5.99916 8.46451 6.04947 8.35991C6.09978 8.2553 6.1859 8.16538 6.29708 8.10137C6.40826 8.03736 6.53957 8.00211 6.67462 8Z"
            fill="#4B4B4B"
          />
        </svg>
        </div>
      </button>

      {isOpen && (
        <div className="absolute mt-2 bg-white border border-gray-300 shadow-lg rounded-lg p-4 ">
          <div className="mb-4">
            <h2 className=" mt-5 ml-5 font-worksans text-15 font-bold  text-black">
              Ordenar Información
            </h2>
            <div className="flex flex-col font-worksans text-14 mt-2">
              <button
                onClick={() => handleSortBy("asc")}
                className="px-3 py-1 rounded flex justify-start text-gray2 hover:bg-gray-200"
              >
                <PiSortDescending className=" mt-4 mr-10 text-black " />
                Orden ascendente
              </button>
              <button
                onClick={() => handleSortBy("desc")}
                className="px-3 py-1 rounded flex justify-start text-gray2 hover:bg-gray-200"
              >
                <PiSortAscendingLight className=" mt-4 mr-10 text-black " />
                Orden descendente
              </button>
            </div>
          </div>
          <div className="mt-4">
            <h2 className="mt-2 font-worksans text-14 font-bold  text-black">
              Buscar por:
            </h2>
            <input
              type="text"
              value={inputValue}
              onChange={handleChange}
              onFocus={() => setInputFocused(true)}
              onBlur={() => setInputFocused(false)}
              className="mt-2 mb-2  px-3 py-2 border border-gray-300 rounded"
              placeholder="Cualquier cosa..."
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SortingFilteringDescription;
