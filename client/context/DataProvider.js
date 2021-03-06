import { createContext, useReducer } from 'react'

export const DataContext = createContext();


const DataProvider = ({ intialState, reducer, children }) => {
    return (
        <DataContext.Provider value={useReducer(reducer, intialState)}>
            {children}
        </DataContext.Provider >
    )
}

export default DataProvider;