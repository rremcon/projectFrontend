import React, {useContext} from "react";
import {ClickContext} from "../../context/ClickContext";

function MinButton() {

    const {minOneFunction} = useContext(ClickContext)

    return (
        <button type="button"
                className="quantity-button"
                onClick={minOneFunction}>
            -
        </button>
    );
}

export default MinButton;