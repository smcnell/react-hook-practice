import React, {useState, useEffect} from "react";

//this is just a different way of declaring the variable state
const initialLocationState = {
    latitude: null,
    longitude: null,
    speed: null
};

const App = () => {
    const [count, setCount] = useState(0);
    const [isOn, setIsOn] = useState(false);
    const [mousePosition, setMousePosition] = useState({x: null, y: null});
    const [onlineStatus, setOnlineStatus] = useState(navigator.onLine);
    const [{latitude, longitude, speed}, setLocation] = useState(initialLocationState);
    let mounted = true;

    //effect function is called after every re-render (or after a state change that causes a re-render)
    useEffect(() => {
        document.title = `You have clicked ${count} times`;
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("online", handleOnline);
        window.addEventListener("online", handleOffline);
        navigator.geolocation.getCurrentPosition(handleGeoLocation);
        const watchId = navigator.geolocation.watchPosition(handleGeoLocation);




            //this cleanup function goes at the end of Use Effect function... this is performed when component unmounts or before effect runs
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("online", handleOffline);
            navigator.geolocation.clearWatch(watchId);
            mounted = false;
        }
    },
        //this is if we want to prevent the useEffect from running on every render (only if the value changes as specified below will the side effect be run again
        [count]
    );



    const handleGeoLocation = event => {
        if(mounted) {
            setLocation({
                latitude: event.coords.latitude,
                longitude: event.coords.longitude,
                speed: event.coords.speed
            })
        }
    };

    const handleMouseMove = event => {
        setMousePosition({
            x: event.pageX,
            y: event.pageY
        })
    };

    const handleOnline = event => {
        setOnlineStatus(true);
    };

    const handleOffline = event => {
        setOnlineStatus(false);
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

            <h2>Online Status</h2>
            <p>You are <strong>{onlineStatus ? "online" : "offline"}</strong></p>

            <h2>Location</h2>
            <p>Latitude is {latitude}</p>
            <p>Longitude is {longitude}</p>
            <p>Speed is {speed ? speed: "0"}</p>




        </>
    )
};

export default App;