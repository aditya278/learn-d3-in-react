import React, { useState, useEffect } from 'react';
import './App.css';

// import Circles from './components/Circles';
// import CurvedLine from './components/CurvedLine';
// import SmileyFace from './components/smiley/SmileyFace';
import Bar from './components/Bar';
import Bar2 from './components/Bar2';
import Bar3 from './components/Bar3';
import Bar4 from './components/Bar4';
import Bar5 from './components/Bar5';
import StackedBarChart from './components/StackedBarChart';
import StackedBarChartHorizontal from './components/StackedBarChartHorizontal';
import HBarChartPath from './components/HBarChartPath';
import VBarChartPath from './components/VBarChartPath';
import CircularProgressBar from './components/CircularProgressBar';
// import Donut from './components/Donut';

const datas = [
  [10, 30],
  [10, 40],
  [60, 30],
  [20, 10],
  [15.5, 90]
]

const data2 = [
  {
    activity: 1980,
    "qualified": 90,
    "disqualitied": 20
  },
  {
    activity: 1990,
    "qualified": 190,
    "disqualitied": 40
  },
  {
    activity: 2000,
    "qualified": 70,
    "disqualitied": 70
  },
  {
    activity: 2010,
    "qualified": 40,
    "disqualitied": 60,
    
  },
  {
    activity: 2020,
    "qualified": 5,
    "disqualitied": 155,
    
  },
  {
    activity: 2030,
    "qualified": 5,
    "disqualitied": 155
  },
  {
    activity: 2040,
    "qualified": 45,
    "disqualitied": 70
  },
  {
    activity: 2050,
    "qualified": 45,
    "disqualitied": 70
  },
  {
    activity: 2060,
    "qualified": 59,
    "disqualitied": 120
  }
];
const allKeys = ["qualified", "disqualitied"]
const colors = {
  "qualified": "green",
  "disqualitied": "orange"
};

var i = 0;

function App() {
  const [data, setData] = useState(datas[0]);

  useEffect(() => {
    changeData();
  }, []);

  const changeData = () => {
    setData(datas[i++]);
    if(i === datas.length) i = 0;
  }

  return (
    <div className="App">
      {/* <SmileyFace width={960} height={500} radius={250} /> */}
      {/* <Bar width={60} height={60} data={data} /> */}
      {/* <Bar5 width={105} height={105} data={data} /> */}
      {/* <VBarChartPath width={195} height={652} data={data2} keys={allKeys} colors={colors} /> */}
      <CircularProgressBar width={150} height={150} data={[100]} />
      <br/>
      {/* <button onClick={changeData}>Change Data</button> */}
      {/* <Donut data={data[0]} outerRadius={100} innerRadius={50} /> */}
    </div>
  );
}

export default App;