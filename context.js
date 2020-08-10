import React from 'react'

export const context = {
    backend: process.env.REACT_APP_HOST
}

export const AppContext = React.createContext(context);

