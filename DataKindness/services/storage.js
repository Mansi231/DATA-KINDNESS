import AsyncStorage from '@react-native-async-storage/async-storage'
import { ROUTES } from './routes'

const KEYS = {
    user:'user',
    lastScreen:'lastScreen',
    screenData:'screenData'
}

const setItemToStorage= async(key,value) =>{
    await AsyncStorage.setItem(key,JSON.stringify(value))
}

const getItemFromStorage = async(key) =>{
   let val = await AsyncStorage.getItem(key)
   return JSON.parse(val)
}

const clearStorage = async() =>{
    await AsyncStorage.clear()
}

export {getItemFromStorage,setItemToStorage,clearStorage,KEYS}