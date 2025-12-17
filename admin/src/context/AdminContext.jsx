import { createContext, useState } from "react";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {

    const [aToken, setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : '');
    // const backendUrl = import.meta.env.VIT_BACKEND_URL
    const backendUrl = 'http://localhost:4000';
    // console.log("backend Url: ", backendUrl)

    const value = {
        aToken,setAToken,
        backendUrl,

    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider;