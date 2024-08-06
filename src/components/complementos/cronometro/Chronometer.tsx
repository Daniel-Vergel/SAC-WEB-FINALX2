import React, { useState, useEffect } from 'react';
import { useStopwatchDate } from '../../../customHooks/useStopwatchDate';
import { ChronometerSqueleton } from '../../squeletons/Chronometer/ChronometerSqueleton';
import { ButtomChronometer } from './buttomChronometer';

export const Chronometer: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);  
  }, []);

  const { data, loading, error } = useStopwatchDate(9);

  if (loading) return <ChronometerSqueleton />;
  if (error) return <p>Error: {error.message}</p>;
  
  const employee = data?.employee;
  const stopwatchDate = employee.stopwatchDate;
  
  console.log("Tiempo del API:", stopwatchDate);
  
  const extractTimeFromISO = (isoString: string) => {
    const date = new Date(isoString);
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  const extractLocalTime = (date: Date): string => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };
  
  const stopwatchTime = extractTimeFromISO(stopwatchDate);
  console.log("Tiempo de stopwatch:", stopwatchTime);

  const nowTimeLocal: string = extractLocalTime(currentTime);
  console.log("Tiempo actual local:", nowTimeLocal);
  
  const calculateTimeDifference = (time1: string, time2: string) => {
    const [h1, m1, s1] = time1.split(':').map(Number);
    const [h2, m2, s2] = time2.split(':').map(Number);
  
    let totalSeconds1 = h1 * 3600 + m1 * 60 + s1;
    let totalSeconds2 = h2 * 3600 + m2 * 60 + s2;

    if (totalSeconds1 > totalSeconds2) {
      totalSeconds2 += 24 * 3600; // Añade 24 horas a totalSeconds2 si está en un día diferente
    }
    
    console.log("Total seconds time1:", totalSeconds1);
    console.log("Total seconds time2:", totalSeconds2);
  
    return totalSeconds2 - totalSeconds1; 
  };
  
  const timeDifferenceInSeconds = calculateTimeDifference(stopwatchTime, nowTimeLocal);
  console.log("Diferencia en segundos:", timeDifferenceInSeconds);

  const formatTimeDifference = (seconds: number) => {
    const hours = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${hours}:${minutes}:${secs}`;
  };
  
  const timeDifference = formatTimeDifference(timeDifferenceInSeconds);  
  console.log("Diferencia de tiempo formateada:", timeDifference); 
  
  return (
    <>
      <div className="mt-4 font-roboto font-bold text-24 text-black1">
        <span>{timeDifference}</span>
      </div>
      <ButtomChronometer />
    </>
  );
};
