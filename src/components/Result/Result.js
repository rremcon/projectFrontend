import React, {useContext} from "react";
import {ClickContext} from "../../context/ClickContext";

function Result() {

    const {clicks} = useContext (ClickContext)

    return(
        <h2>Quantity: {clicks}</h2>
    );
}

export default Result;
