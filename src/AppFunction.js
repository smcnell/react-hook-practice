import React, {useState, useEffect} from "react";

const App = () => {
    const [count, setCount] = useState(0);
    const [isOn, setIsOn] = useState(false);
    const [mousePosition, setMousePosition] = useState({x: null, y: null})

    //effect function is called after every re-render (or after a state change that causes a re-render)
    useEffect(() => {
        document.title = `You have clicked ${count} times`;
        window.addEventListener('mousemove', handleMouseMove);

        //this cleanup function goes at the end of Use Effect function... this is performed when component unmounts or before effect runs
        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
        }
    },
        //this is if we want to prevent the useEffect from running on every render (only if the value changes as specified below will the side effect be run again
        [count]
    );

    const handleMouseMove = event => {
        setMousePosition({
            x: event.pageX,
            y: event.pageY
        })
    };

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

            <h2>Current Mouse Position</h2>
            {JSON.stringify(mousePosition, null, 2)}
            <br />

        </>
    )
};

export default App;