import React from "react";

const AuthContext = React.createContext({
    idToken: null,
    setIdToken: () => {},
    removeToken: () => {},
});

export default AuthContext;