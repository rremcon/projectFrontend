import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";


const NotFoundPage = () => {

    const navigate = useNavigate()

    useEffect( ()=> {

        setTimeout( ()=> {
            navigate("/")
        }, 3000)

    }, [])


        return (
            <>
                <h1>Oops! That page can't be found | 404</h1>
            </>
        );
};

export default NotFoundPage;