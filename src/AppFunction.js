import React, {useState, useEffect} from "react";

const App = () => {
    const [count, setCount] = useState(0);
    const [isOn, setIsOn] = useState(false);

    //effect function is called after every re-render (or after a state change that causes a re-render)
    useEffect(() => {
        document.title = `You have clicked ${count} times`;
    });

    const incrementCount = () => {
        setCount(prevCount => prevCount + 1)
    };

    const toggleLight = () => {
        setIsOn(prevIsOn => !prevIsOn)
    };

    return (
        <>
            <h2>Counter</h2>
            <button onClick={incrementCount}>
                I was clicked {count} times
            </button>

            <h2>Toggle Light</h2>
            <img
                src={
                    isOn ? 'https://icon.now.sh/highlight/fd0' : 'https://icon.now.sh/highlight/aaa'
                }
                style={{
                    height: '50px',
                    width: '50px',
                    background: isOn ? 'yellow' : 'grey'
            }}
            alt="Lightbulb"
            onClick={toggleLight}
            />

        </>
    )
};

export default App;