import { useState } from "react";

const Signup = () => {
    const [clickCount, setClickCount] = useState({
        "btn1": 0,
        "btn2": 0,
        "btn3": 0,
        "btn4": 0,
        "btn5": 0,
    });

    const handleClick = (btn) => {
        const updatedClickCount = { ...clickCount };
        updatedClickCount[btn]++;
        setClickCount(updatedClickCount);

        if (updatedClickCount[btn] === 1) {
            // Display the click count under the button
            const btnIndex = parseInt(btn.substring(3)) - 1;
            const spans = document.querySelectorAll(".btn-click-count span");
            spans[btnIndex].innerText = `Clicked: ${btn}`;
        } else if (updatedClickCount[btn] === 2) {
            // Show an alert when the button is clicked twice
            alert(`Button ${btn} clicked twice!`);


            updatedClickCount[btn] = 0;
            setClickCount(updatedClickCount)
        }
    };

    return (
        <div>
            <button onClick={() => handleClick("btn1")} className="btn mx-2">btn-1</button>
            <button onClick={() => handleClick("btn2")} className="btn mx-2">btn-2</button>
            <button onClick={() => handleClick("btn3")} className="btn mx-2">btn-3</button>
            <button onClick={() => handleClick("btn4")} className="btn mx-2">btn-4</button>
            <button onClick={() => handleClick("btn5")} className="btn mx-2">btn-5</button>
            <p>Click count</p>
            <div className="btn-click-count">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    );
};

export default Signup;
