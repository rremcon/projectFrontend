import React, {createContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";

export const AuthContext = createContext({});

function AuthContextProvider({children}) {

    const [auth, setAuth] = useState({
        isAuth: false,
        user: null,
        status: "pending",
    });
    const navigate = useNavigate();


    useEffect(()=> {
        const storedToken = localStorage.getItem('token')

        if(storedToken) {
        const decodedToken = jwt_decode(storedToken)

        if (Math.floor (Date.now()/1000) < decodedToken.exp) {
            void fetchUserData(storedToken, decodedToken.sub)
        } else {
            localStorage.removeItem('token')
        }
        } else {
            setAuth({
                ...auth,
                isAuth: false,
                user: null,
                status: "done"
            });
        }

    }, []);


    function handleLogin(jwt) {
        localStorage.setItem('token', jwt)

        const decodedToken = jwt_decode(jwt);

        void fetchUserData(jwt, decodedToken.sub, "/account")
    }


        async function fetchUserData(jwt, id, redirect) {
            try {
                const response = await axios.get(`http://localhost:8080/accounts/${id}`, {
                    headers:
                        {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${jwt}`,
                        }
                })
                setAuth(
                    {
                        ...auth,
                        isAuth: true,
                        user: {
                            id: response.data.id,
                            email: response.data.email,
                            username: response.data.username,

                            firstname:response.data.firstname,
                            lastname:response.data.lastname,
                            birthdate:response.data.birthdate,
                            address:response.data.address,
                            zipcode:response.data.zipcode,
                            city:response.data.city,
                            country:response.data.country,
                            authorities:response.data.authority,
                        },
                        status: "done"
                    })

                if (redirect) {
                    navigate(redirect)
                }

            } catch (e) {
                console.error(e)
                setAuth( {
                    ...auth,
                    status: "done"
                })
            }
        }


    function handleLogout() {
        localStorage.removeItem('token')
        setAuth({
            ...auth,
            isAuth: false,
            user: null,
            status: "done"
        })
        navigate("/")
    }


    const contextData = {
        isAuth: auth.isAuth,
        user: auth.user,
        status: auth.status,
        login: handleLogin,
        logout: handleLogout
    }


    return (
        <AuthContext.Provider value={contextData}>
            {auth.status === "done" ? children : <p>Loading..</p>}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;
