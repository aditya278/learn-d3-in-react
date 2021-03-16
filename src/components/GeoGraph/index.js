import { json } from 'd3-fetch';
import React, { useEffect, useState } from 'react';
import GeoMap from './GeoMap.js'
// import stateJson from './us2.json';

const data = [
    {label : 'Texas', positions: 230, open: 170, hold: 30, closed: 20 },
    {label : 'New York', positions: 180, open: 80, hold: 100 },
    {label : 'California', positions: 100, open: 100 },
    {label : 'Alaska', positions: 100, open: 10, hold: 60, closed: 30 },
    {label : 'New Mexico', positions: 350, open: 50, hold: 100, closed: 200 },
    {label : 'Montana', positions: 80, open: 30, closed: 50 },
    {label : 'Missouri', positions: 60, open: 10, hold: 30, closed: 20 },
    {label : 'Minnesota', positions: 150, hold: 80, closed: 70 },
    {label : 'Nevada', positions: 250, open: 200, hold: 20, closed: 30 },
    {label : 'Georgia', positions: 100, open: 100 },
];

const keys = ['positions', 'open', 'hold', 'closed'];

const GeoGraph = () => {
    const [key, setKey] = useState(keys[0]);
    const [counter, setCounter] = useState(1);
    const [stateJson, setStateJson] = useState();

    const changeKey = () => {
        console.log(counter);
        console.log(keys[counter]);
        if(counter>=keys.length-1)
            setCounter(0);
        else
            setCounter(counter+1);

        setKey(keys[counter]);
    }

    async function fetchData() {
        const res = await json('https://gist.githubusercontent.com/aditya278/a4bac860f267e8cabdb4674fa7b452c3/raw/8ea0059cb6fd7a037da0207071b21f6d734305c4/us-states.json');
        setStateJson(res);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <h1>Total {key}!</h1>
            {
                stateJson && <GeoMap width={500} height={300} stateJson={stateJson} data={data} field={key} />
            }
            <button onClick={changeKey}>Change the Key</button>
      </div>
    );
};

export default GeoGraph;