import React, {useContext} from "react";
import {ClickContext} from "../../context/ClickContext";

function Addbutton() {

    const {plusOneFunction} = useContext(ClickContext)

    return (
        <button type="button"
                className="quantity-button"
                onClick={plusOneFunction}>
            +
        </button>
    );
}

export default Addbutton;