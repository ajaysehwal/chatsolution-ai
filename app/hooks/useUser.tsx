import { useContext } from "react";
import { AuthContext } from "../contexts";
import { AuthContextProps } from '../contexts/AuthProvider';

export const useUser=()=>{
    const {metadata}:any=useContext<AuthContextProps | null>(AuthContext)
    return metadata;
}