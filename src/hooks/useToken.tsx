import {createContext, useContext, useState} from "react";


const TokenContext = createContext<{
    token:string,
    userId:number,
    setToken:React.Dispatch<React.SetStateAction<string>>
    setUserId:React.Dispatch<React.SetStateAction<number>>
}>({
    token:"",
    userId:0,
    setToken:()=>{},
    setUserId:()=>{}
});

export const TokenProvider = ({children}:{children:React.ReactNode}) => {
    const [token, setToken] = useState<string>("");
    const [userId, setUserId] = useState<number>(0);
    return (
        <TokenContext.Provider value={{token,setToken,userId,setUserId}}>
            {children}
        </TokenContext.Provider>
    )
}

export const useToken = ()=>{
    const context = useContext(TokenContext);
    return context;
}