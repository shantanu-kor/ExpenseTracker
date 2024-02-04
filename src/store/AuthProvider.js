import React, { useEffect, useState } from "react";

import AuthContext from "./authContext";

const AuthProvider = (props) => {
    const [token, setToken] = useState(null);

    useEffect(() => {
        setToken(localStorage.getItem("token"));
    }, [])
    
    const setIdTokenHandler = (id) => {
        localStorage.setItem("token", id)
        setToken(id);
    }

    const removeTokenHandler = () => {
        localStorage.removeItem("token");
        setToken(null);
    };

    const authProvider = {
        idToken: token,
        setIdToken: setIdTokenHandler,
        removeToken: removeTokenHandler, 
    };
    
    return <AuthContext.Provider value={authProvider}>
        {props.children}
    </AuthContext.Provider>
};

export default AuthProvider;