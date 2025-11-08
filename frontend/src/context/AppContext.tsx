import { createContext } from "react";

export const AppContext = createContext({});
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const AppContextProvider = (props) => { 

    const contextValue = {
        backendUrl
    };

    return (
        <AppContext.Provider value={contextValue}>
            {props.children}
        </AppContext.Provider>
    );
}

export default AppContextProvider;