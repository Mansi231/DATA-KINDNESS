import React, { useEffect, createContext, useState } from 'react'
import { client } from '../../services/client';
import { Platform } from 'react-native'
import { KEYS, getItemFromStorage } from '../../services/storage';

export const ValContext = createContext();

const Context = ({ children }) => {

    const [leadList, setLeadList] = useState([])
    const [businessCategoryList, setBusinessCategoryList] = useState([])

    const [clientDetail, setClientDetail] = useState({ clientSecret: null, paymentMethodId: null })
    // const [clientSecret, setClientSecret] = useState(null)
    // const [paymentMethodId,setPaymentMethodId] = useState(null)

    // leadData:{selectedLead,userDetail}
    const [leadData, setLeadData] = useState(null)
    const [userDetail, setUserDetail] = useState(null)


    useEffect(() => {
        Promise.all([client.get('lead'), client.get('category'), getItemFromStorage(KEYS.screenData)])
            .then(([leadRes, categoryRes, screenData]) => {
                setLeadList(leadRes?.data?.data || []);
                setBusinessCategoryList(categoryRes?.data?.data || []);

                setLeadData(screenData)
            })
            .catch((err) => {
                console.log(err, ':: err ::');
            });
    }, [])


    return (
        <ValContext.Provider value={{ leadList, setLeadList, businessCategoryList, setBusinessCategoryList, leadData, setLeadData, userDetail, setUserDetail, clientDetail, setClientDetail }}>{children}</ValContext.Provider>
    )
}

export default Context

