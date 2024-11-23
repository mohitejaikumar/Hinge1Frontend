import { useEffect, useState } from "react"
import { useToken } from "./useToken";

export const useSocket = ()=>{
    const [socket, setSocket] = useState<WebSocket|null>(null);
    const {token} = useToken();
    
    useEffect(()=>{
        const ws = new WebSocket(`wss://hinge1.backend.jaik.co.in/ws`);
        ws.onopen = ()=>{
            setSocket(ws);
            ws.send(JSON.stringify({
                type:'join',
                payload:{
                    token:token
                }
            }))
        }
        ws.onerror = (e) => {
            // an error occurred
            // console.log(e.message);
        };
        return ()=>{
            ws.close();
        }
    },[]);
    
    return socket;
}
