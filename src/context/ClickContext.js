import {createContext, useState} from "react";

export const ClickContext = createContext({})

function ClickContextProvider({children}) {

    const [amountOfClicks, setCounter] = useState(0);


    function plusOne() {
        setCounter(amountOfClicks +1)
    }


    function minOne() {
        setCounter(amountOfClicks -1)
    }


    const clickData = {
        clicks: amountOfClicks,
        plusOneFunction: plusOne,
        minOneFunction: minOne
    }


    return (
        <ClickContext.Provider value={clickData}>
            {children}
        </ClickContext.Provider>
    )
}

export default ClickContextProvider;
