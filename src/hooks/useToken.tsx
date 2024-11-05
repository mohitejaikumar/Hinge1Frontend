import {createContext, useContext, useState} from "react";


const TokenContext = createContext<{
    token:string,
    setToken:React.Dispatch<React.SetStateAction<string>>
}>({
    token:"",
    setToken:()=>{}
});

export const TokenProvider = ({children}:{children:React.ReactNode}) => {
    const [token, setToken] = useState<string>("jai");
    return (
        <TokenContext.Provider value={{token,setToken}}>
            {children}
        </TokenContext.Provider>
    )
}

export const useToken = ()=>{
    const context = useContext(TokenContext);
    return context;
}