import { createContext, useState } from "react";
import { doctors, assets } from "../assets/assets";

export const AppContext = createContext();

const AppContextProvider = (props) => {

    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');


    const backendUrl = 'http://localhost:4000'
    const currencySymbol = '$';

    const value = {
        doctors,
        assets,
        currencySymbol,
        token, setToken,
        backendUrl,

    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;