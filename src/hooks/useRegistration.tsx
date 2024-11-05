

import { createContext, useContext, useState } from "react";

export const RegistrationContext = createContext<{
    storageImages:string[],
    setStorageImages:React.Dispatch<React.SetStateAction<string[]>>,
    behaviours:{
        question:string,
        answer:string
    }[],
    setBehaviours:React.Dispatch<React.SetStateAction<{
        question:string,
        answer:string
    }[]>>
}>({
    storageImages:[],
    setStorageImages:()=>{},
    behaviours:[],
    setBehaviours:()=>{}
});

export const RegistrationProvider = ({children}:{children:React.ReactNode}) => {
    const [storageImages, setStorageImages] = useState<string[]>(["","","","","",""]);
    const [behaviours, setBehaviours] = useState<{
        question:string,
        answer:string
    }[]>([]);

    return (
        <RegistrationContext.Provider value={{storageImages,setStorageImages,behaviours,setBehaviours}}>
            {children}
        </RegistrationContext.Provider>
    )
}

export const useRegistration = ()=>{
    const context = useContext(RegistrationContext);
    return context;
}
