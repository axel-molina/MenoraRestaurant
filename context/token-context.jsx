import React, {useState, UseEffect, UseMemo } from 'react';
import axios from 'axios';
import CookieManager from '@react-native-cookies/cookies';
import { utils } from "../utils/utils";

const TokenContext = React.createContext();

export function TokenProvider(props) {
   

    const value = UseMemo(() => ({
        token,
        isLoading,
        error,
        setToken,
        setIsLoading,
        setError,
    }), [token, isLoading, error]);

    return (
        <TokenContext.Provider value={value} {...props}/>
         );
}

export function useToken() {
    const context = React.useContext(TokenContext);
    if (context === undefined) {
        throw new Error('useToken no está definido en TokenProvider');
    }
    return context;
}