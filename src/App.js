import React, { useState, useEffect } from "react";
import "./App.css";

// import Circles from './components/Circles';
// import CurvedLine from './components/CurvedLine';
// import SmileyFace from './components/smiley/SmileyFace';
import Bar from "./components/Bar";
import Bar2 from "./components/Bar2";
import Bar3 from "./components/Bar3";
import Bar4 from "./components/Bar4";
import Bar5 from "./components/Bar5";
import StackedBarChart from "./components/StackedBarChart";
import StackedBarChartHorizontal from "./components/StackedBarChartHorizontal";
import HBarChartPath from "./components/HBarChartPath";
import VBarChartPath from "./components/VBarChartPath";
import GroupedStacked from "./components/GroupedStacked";
import HGroupedStacked from "./components/HGroupedStacked";
import CircularProgressBar from "./components/CircularProgressBar";
import StarRating from './components/StarRating';
import FinalBar from './components/FinalBar';
import Mood from './components/StarRating/Mood';
// import Donut from './components/Donut';
import GeoGraph from './components/GeoGraph';

const datas = [
  [10, 30],
  [10, 40],
  [60, 30],
  [20, 10],
  [15.5, 90],
];

// const data2 = [
//   {
//     activity: 1980,
//     "qualified": 90,
//     "disqualitied": 20
//   },
//   {
//     activity: 1990,
//     "qualified": 190,
//     "disqualitied": 40
//   },
//   {
//     activity: 2000,
//     "qualified": 70,
//     "disqualitied": 70
//   },
//   {
//     activity: 2010,
//     "qualified": 40,
//     "disqualitied": 60,

//   },
//   {
//     activity: 2020,
//     "qualified": 5,
//     "disqualitied": 155,

//   },
//   {
//     activity: 2030,
//     "qualified": 5,
//     "disqualitied": 155
//   },
//   {
//     activity: 2040,
//     "qualified": 45,
//     "disqualitied": 70
//   },
//   {
//     activity: 2050,
//     "qualified": 45,
//     "disqualitied": 70
//   },
//   {
//     activity: 2060,
//     "qualified": 59,
//     "disqualitied": 120
//   }
// ];
// const allKeys = ["qualified", "disqualitied"]
// const colors = {
//   "qualified": "green",
//   "disqualitied": "orange"
// };

const data2 = [
  { label: "Sourced", selected: 500, rejected: 450, sourced: 130, },
  { label: "ABCD", selected: 290, rejected: 140, sourced: 40, },
  { label: "EFGH", selected: 70, rejected: 0, sourced: 70, },
  {
    label: "Interviewed",
    selected: 440,
    rejected: 60,
    sourced: 430,
    
  },
  { label: "Offer Sent", selected: 5, rejected: 155, sourced: 30, },
  {
    label: "Applied",
    selected: 55,
    rejected: 555,
    sourced: 603,
    
  },
  // { label: "Onboarding", selected: 45, rejected: 70, sourced: 56, __type: 1 },
  // { label: "Onboarding", selected: 59, rejected: 120, sourced: 35, __type: 2 },
];
const allKeys = ["selected", "rejected", "sourced"]; //, "Social", "Media"];; //["qualified", "disqualitied"]
const colors = {
  selected: "rgba(240, 72, 19, 0.8)",
  rejected: "rgba(255, 199, 128, 0.8)",
  sourced: "rgba(69, 0, 0, 0.8)",
};

// const data2 = [
//   {
//     label: "Brand 1",
//     __group: 1,
//     Affiliate: 10,
//     Social: 20,
//     Media: 30
//   },
//   {
//     label: "Brand 1",
//     __group: 2,
//     Affiliate: 20,
//     Social: 40,
//     Media: 60
//   },
//   {
//     label: "Brand 2",
//     __group: 1,
//     Affiliate: 30,
//     Social: 45,
//     Media: 80
//   },
//   {
//     label: "Brand 3",
//     __group: 1,
//     Affiliate: 40,
//     Social: 60,
//     Media: 100
//   }
// ];

// const allKeys = ["Affiliate", "Social", "Media"];

// const colors = {
//   Affiliate: "rgba(69, 0, 0, 0.8)",
//   Social: "rgba(240, 72, 19, 0.8)",
//   Media: "rgba(255, 199, 128, 0.8)"
// };

export const CircularProgressBarData = [
  { label: 'Assessment', Performance: 30, Attendance: 60, Abandonment: 10 },
  { label: 'Resignation', 'Personal Reasons': 45, 'Better Opportunity': 30, 'Dissatisfaction': 25 },
  { label: 'Completed', 'Tenure Limit': 40, 'Successful': 30, 'Converted to F/T': 20, 'Budget' : 10 },
];

var i = 0;

function App() {
  const [data, setData] = useState(datas[0]);

  useEffect(() => {
    changeData();
  }, []);

  const changeData = () => {
    setData(datas[i++]);
    if (i === datas.length) i = 0;
  };

  return (
    <div className="App">
      {/* <SmileyFace width={960} height={500} radius={250} /> */}
      {/* <Bar width={60} height={60} data={data} /> */}
      {/* <Bar5 width={105} height={105} data={data} /> */}
      {/* <HGroupedStacked
        width={652}
        height={256}
        data={data2}
        keys={allKeys}
        colors={colors}
      /> */}
      {/* <CircularProgressBar width={200} height={200} data={CircularProgressBarData[2]} /> */}
      {/* <StarRating width={400} height={150} rating={80} size={60} variant={'bars'} /> */}
      {/* <Mood width={100} height={100} rating={80} /> */}
      {/* <FinalBar /> */}
      {/* <button onClick={changeData}>Change Data</button> */}
      {/* <Donut data={data[0]} outerRadius={100} innerRadius={50} /> */}
      <GeoGraph />
    </div>
  );
}

export default App;
