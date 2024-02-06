import React,{useEffect,createContext,useState} from 'react'
import { client } from '../../services/client';

export const ValContext = createContext();

const Context = ({children}) => {

    const [leadList, setLeadList] = useState([])

    useEffect(() => {
        client.get(`lead`).then((res)=>{console.log(res,':: res ::')}).catch((err)=>{console.log(err,':: err ::')})
    }, [])

    return (
        <ValContext.Provider value={{ leadList, setLeadList }}>{children}</ValContext.Provider>
    )
}

export default Context

