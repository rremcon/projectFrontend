import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";


const NotFoundPage = () => {

    const navigate = useNavigate()

    useEffect( ()=> {

        setTimeout( ()=> {
            navigate("/")
        }, 1000)

    }, [])


        return (
            <>
                <h3>Not Found | 404</h3>
            </>
        );

};

export default NotFoundPage;