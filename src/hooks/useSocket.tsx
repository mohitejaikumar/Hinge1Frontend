import { useEffect, useState } from "react"
import { useToken } from "./useToken";

export const useSocket = ()=>{
    const [socket, setSocket] = useState<WebSocket|null>(null);
    const {token} = useToken();
    
    useEffect(()=>{
        const ws = new WebSocket(`ws://10.81.4.206:8080`);
        ws.onopen = ()=>{
            setSocket(ws);
            ws.send(JSON.stringify({
                type:'join',
                payload:{
                    token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjM0fQ.1FEb5TV31P_veW1U2uE22qdl6OIBId2KLEcabGmVyEk"
                }
            }))
        }
        ws.onerror = (e) => {
            // an error occurred
            console.log(e.message);
        };
        return ()=>{
            ws.close();
        }
    },[]);
    
    return socket;
}
