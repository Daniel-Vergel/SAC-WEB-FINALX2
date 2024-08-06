import { UserYellow } from "../../svg/usersRanking/userYellow";
import { UserAqua } from "../../svg/usersRanking/userAqua";
import { UserBlue } from "../../svg/usersRanking/userBlue";
import { UserGray } from "../../svg/usersRanking/userGray";
import { UserGreen } from "../../svg/usersRanking/userGreen";
import { UserPlomo } from "../../svg/usersRanking/userPlomo";
import { UserRed } from "../../svg/usersRanking/userRed";
import { useRankingQuery } from "../../customHooks/useRankingQuery";
import { CardsSqueleton } from "../squeletons/Ranking/CardsSqueleton";

interface RankingData {
  PerCod: number;
  nombre: string;
  cargo?: string | null;
  porcentaje: number;
}

interface TopItemProps {
  index: number;
  rankingData: RankingData;
}

const users = [
  UserYellow,
  UserAqua,
  UserBlue,
  UserGray,
  UserGreen,
  UserPlomo,
  UserRed
];

const getRandomComponent = () => {
  const randomIndex = Math.floor(Math.random() * users.length);
  return users[randomIndex];
}

const RandomComponent = () => {
  const RandomUserComponent = getRandomComponent();

  return (
    <div className="flex justify-center h-40 w-40 mt-3">
      <RandomUserComponent />
    </div>
  );
};

const TopItem: React.FC<TopItemProps> = ({index,  rankingData }) => (

  <div className="flex-none h-76 ml-2 mr-7 border-b-2 border-gray6">
    <div className="flex">
  
    <div className="ml-10 mt-16">
     
          <div className={`h-32 w-32 mt-4 rounded-full flex items-center justify-center text-20 font-trebuchet font-bold
            ${index === 0 ? 'border-2 border-orange4 bg-orange4 text-orange1' : ''}
            ${index === 1 ? 'border-2 border-blue6 bg-blue6 text-blue1' : ''}
            ${index === 2 ? 'border-2 border-orange6 bg-orange6 text-orange5' : ''}
            ${index >= 3 ? ' text-black2' : ''}
          `}>
        {index + 1}
      </div>
    </div>

      {/* Consultor */}
      <div className="flex w-full ml-8 mt-16">
        <RandomComponent />

        <div className="ml-8 w-187 mr-7 ">
          <p className="font-trebuchet font-bold text-14 text-gray1 overflow-hidden overflow-ellipsis whitespace-nowrap max-w-xs ">
            {rankingData.nombre}
          </p>
          <p className="font-verdana text-10 mt-5 overflow-hidden overflow-ellipsis whitespace-nowrap max-w-xs text-gray2">
            {rankingData.cargo || 'Cargo no especificado'}
          </p>
        </div>
      </div>

      {/* Porcentaje de productividad */}
      <div className="mt-16">
        <div className="flex">
          <div className="grid grid-flow-col items-center w-40 h-20 border-2 border-green1 bg-green2 rounded-3">
            <div className="ml-1 -mt-2 grid grid-flow-col items-center">
              <svg
                className="mt-2 ml-5"
                width="8"
                height="8"
                viewBox="0 0 8 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.90223 1.86621L0.919383 7.84906C0.818754 7.94969 0.69068 8 0.535163 8C0.379646 8 0.251572 7.94969 0.150943 7.84906C0.0503145 7.74843 0 7.62036 0 7.46484C0 7.30932 0.0503145 7.18125 0.150943 7.08062L6.13379 1.09777H3.06003C2.90452 1.09777 2.77416 1.04517 2.66895 0.939966C2.56375 0.834763 2.51115 0.704403 2.51115 0.548885C2.51115 0.393368 2.56375 0.263007 2.66895 0.157804C2.77416 0.0526015 2.90452 0 3.06003 0H7.45112C7.60663 0 7.73699 0.0526015 7.8422 0.157804C7.9474 0.263007 8 0.393368 8 0.548885V4.93997C8 5.09548 7.9474 5.22584 7.8422 5.33105C7.73699 5.43625 7.60663 5.48885 7.45112 5.48885C7.2956 5.48885 7.16524 5.43625 7.06003 5.33105C6.95483 5.22584 6.90223 5.09548 6.90223 4.93997V1.86621Z"
                  fill="#00BB89"
                />
              </svg>

              <div className="text-green1 text-10 mr-3 mt-2">
                {2}%
              </div>
            </div>
          </div>

          <p className="flex justify-center font-trebuchet font-bold -mt-5 ml-8 text-16 text-gray1">
          {rankingData.porcentaje}%
          </p>
        </div>

        <p className="text-10 text-gray1 mt-1 ml-5 font-verdana">
          Productividad
        </p>
      </div>
    </div>
  </div>
);

const RankingComponent: React.FC = () => {
  const { data, loading, error } = useRankingQuery(9); // Aquí pasas el prdCod necesario

  if (loading) return (
  <>
    <CardsSqueleton/>
    <CardsSqueleton/>
    <CardsSqueleton/>
    <CardsSqueleton/>
    <CardsSqueleton/>
    <CardsSqueleton/>
    <CardsSqueleton/>
    <CardsSqueleton/>
  </>

);
  if (error) return <p>Error: {error.message}</p>;

  

  return (
    <div>
      {data.ranking.map((item: RankingData, index: number) => (
        <TopItem key={item.PerCod} index={index} rankingData={item} />
      ))}
    </div>
  );
};

export default RankingComponent;