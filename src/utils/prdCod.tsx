import {jwtDecode} from 'jwt-decode';

interface TokenTypes  {
  exp?: number;
  iat?: number;
  id: number;
  personalId: number;
  userLongName: string; 
  userName: string;
} 

export const GetPrdCod = () => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const decoded = jwtDecode< TokenTypes >(token);
      const PrdCod = decoded.personalId;
      return PrdCod
    } catch (error) {
      console.error('Error decodificando el token:', error);
      return null;
    }
  }
  return null;
};
//console.log("PRDCOD", GetPrdCod )
