import Skeleton from "react-loading-skeleton"


export const BienvenidoSqueleton = () => {
  return <>
    <div className=" flex flex-col mr-10  bg-white">

        <div className=" flex  ">
          <div className="  ">
            <Skeleton width={460} height={50} borderRadius={5}/>
          </div>
        </div>

        <p className="  ">
            <Skeleton width={350} height={30} borderRadius={5}/>
        </p>
        <p className=" text-16 ">
            <Skeleton width={190} borderRadius={5} />
        </p>

        <div className=" mt-18">
            <Skeleton width={142} height={37} borderRadius={5}/>
        </div>
      </div>
      </>
}
