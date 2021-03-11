import React from "react";

const moods = {
  0: {
    path: `M50.1,0c-7.1,0-14,1.5-20.5,4.5c-1.1-1.3-2-2.2-2.2-2.5c-0.4-0.4-1.1-0.7-1.7-0.7S24.5,1.6,24,2
    c-0.3,0.3-5.2,5.5-7.8,11.5c-0.1,0.1-0.2,0.2-0.3,0.3c-9.8,9.4-15.1,22-15.1,35.6c0,27.2,22.1,49.4,49.4,49.4
    c27.2,0,49.4-22.1,49.4-49.4C99.5,22.2,77.4,0,50.1,0z M50.1,4.7c24.6,0,44.7,20,44.7,44.7s-20,44.7-44.7,44.7S5.5,74,5.5,49.4
    c0-10.1,3.3-19.6,9.3-27.3c0.2,2,0.9,3.7,2,5c1.9,2.1,4.8,3.2,8.9,3.2s7.2-1.1,9.2-3.3c1.8-2.1,2.6-5,2.1-8.8
    c-0.4-3.4-2.4-6.9-4.4-9.9C38.1,5.9,44,4.7,50.1,4.7z M25.8,7.2c2.5,2.9,6.1,7.8,6.6,11.5c0.3,2.4-0.1,4.1-1,5.1
    c-1,1.1-2.9,1.7-5.7,1.7c-2.6,0-4.4-0.5-5.3-1.6c-0.9-1-1.1-2.8-0.8-5.2C20.1,14.6,23.6,9.8,25.8,7.2z M62.1,36
    c-1.3,0-2.3,1-2.3,2.3c0,5.8,4.7,10.6,10.4,10.6c1.3,0,2.3-1,2.3-2.3s-1.1-2.3-2.3-2.3c-3.1,0-5.7-2.7-5.7-5.9
    C64.5,37.1,63.4,36,62.1,36z M37.9,36.2c-1.3,0-2.3,1-2.3,2.3c0,3.1-2.7,5.7-5.9,5.7c-1.3,0-2.3,1.1-2.3,2.3s1,2.3,2.3,2.3
    c5.7,0,10.6-4.7,10.6-10.4C40.2,37.2,39.2,36.2,37.9,36.2z M48,59.4c-10,0-18.1,8-18.1,17.9c0,1.3,1.1,2.3,2.3,2.3
    c1.3,0,2.3-1.1,2.3-2.3c0-7.4,5.9-13.2,13.5-13.2h7.9c7.4,0,13.5,6,13.5,13.4c0,1.3,1.1,2.3,2.3,2.3s2.3-1.1,2.3-2.3
    c0-9.9-8.1-18-18.1-18H48V59.4z`,
    text: "Needs Work",
  },

  1: {
    path: `M49.4,0C22.2,0,0,22.2,0,49.5S22.2,99,49.4,99s49.4-22.2,49.4-49.5C98.9,22.2,76.7,0,49.4,0z M49.4,4.8
    c24.6,0,44.7,20,44.7,44.7s-20,44.7-44.7,44.7c-24.6,0-44.7-20-44.7-44.7S24.8,4.8,49.4,4.8z M33,30.8c-3.1,0-5.7,2.6-5.7,5.7
    c0,3.1,2.5,5.7,5.7,5.7c3.1,0,5.7-2.5,5.7-5.7C38.7,33.4,36.1,30.8,33,30.8z M65.7,30.8c-3.1,0-5.7,2.6-5.7,5.7
    c0,3.1,2.6,5.7,5.7,5.7c3.1,0,5.7-2.5,5.7-5.7C71.4,33.4,68.9,30.8,65.7,30.8z M43.1,59.4c-7.9-0.1-14,5.7-14.2,6
    c-0.9,0.9-0.9,2.4,0,3.4s2.4,1,3.4,0c0,0,5-4.8,10.8-4.6c3.2,0.1,6.2,1.6,8.9,4.5c3.4,3.6,6.9,5.5,10.7,5.5c0.4,0,0.7,0,1.1,0
    c7.3-0.7,12.1-8.1,12.3-8.4c0.7-1.1,0.4-2.6-0.7-3.3s-2.6-0.4-3.3,0.7c0,0.1-3.8,5.8-8.7,6.2c-2.6,0.2-5.2-1.1-7.8-3.9
    C51.7,61.5,47.6,59.5,43.1,59.4z`,
    text: "Fair",
  },

  2: {
    path: `M49.5,0C22.2,0,0,22.2,0,49.5S22.2,99,49.4,99c27.3,0,49.4-22.2,49.4-49.5C98.9,22.2,76.7,0,49.5,0z M49.5,4.8
    c24.6,0,44.7,20,44.7,44.7s-20,44.7-44.7,44.7c-24.6,0-44.7-20-44.7-44.7S24.8,4.8,49.5,4.8z M33,30.8c-3.1,0-5.7,2.6-5.7,5.7
    c0,3.1,2.5,5.7,5.7,5.7c3.1,0,5.7-2.5,5.7-5.7C38.7,33.4,36.2,30.8,33,30.8z M65.8,30.8c-3.1,0-5.7,2.6-5.7,5.7
    c0,3.1,2.5,5.7,5.7,5.7c3.1,0,5.7-2.5,5.7-5.7C71.4,33.4,68.9,30.8,65.8,30.8z M28.2,64.7c-1.3,0-2.4,1.1-2.4,2.4s1.1,2.4,2.4,2.4
    h44.4c1.3,0,2.4-1.1,2.4-2.4s-1.1-2.4-2.4-2.4H28.2z`,
    text: "Good",
  },

  3: {
    path: `M49.4,0.8C22.1,0.8,0,22.9,0,50.2c0,27.2,22.1,49.4,49.4,49.4c27.2,0,49.4-22.1,49.4-49.4
    C98.7,22.9,76.6,0.8,49.4,0.8z M49.4,5.5C74,5.5,94,25.5,94,50.2c0,24.6-20,44.7-44.7,44.7c-24.6,0-44.7-20-44.7-44.7
    C4.7,25.5,24.7,5.5,49.4,5.5z M32.9,31.5c-3.1,0-5.7,2.5-5.7,5.7s2.5,5.7,5.7,5.7s5.7-2.5,5.7-5.7S36.1,31.5,32.9,31.5z M65.6,31.5
    c-3.1,0-5.7,2.5-5.7,5.7s2.5,5.7,5.7,5.7c3.1,0,5.7-2.5,5.7-5.7S68.8,31.5,65.6,31.5z M30,59.1c-1.3,0-2.3,1-2.3,2.3
    c0,9.9,8.1,17.9,18.1,17.9h7.9c10.2,0,18.1-7.8,18.1-17.7c0-1.3-1-2.3-2.3-2.3s-2.3,1-2.3,2.3c0,7.3-5.9,13-13.5,13h-7.9
    c-7.5,0-13.5-5.8-13.5-13.2C32.3,60.1,31.3,59.1,30,59.1z`,
    text: "Great",
  },

  4: {
    path: `M50.2,0C23,0,0.8,22.2,0.8,49.5S23,99,50.2,99s49.4-22.2,49.4-49.5C99.7,22.2,77.5,0,50.2,0z M50.2,4.8
    c24.6,0,44.7,20,44.7,44.7c0,24.6-20,44.7-44.7,44.7c-24.6,0-44.7-20-44.7-44.7S25.6,4.8,50.2,4.8z M33.8,30.8
    c-3.1,0-5.7,2.6-5.7,5.7c0,3.1,2.5,5.7,5.7,5.7c3.1,0,5.7-2.5,5.7-5.7C39.5,33.4,36.9,30.8,33.8,30.8z M66.5,30.8
    c-3.1,0-5.7,2.6-5.7,5.7c0,3.1,2.5,5.7,5.7,5.7c3.1,0,5.7-2.5,5.7-5.7C72.2,33.4,69.7,30.8,66.5,30.8z M26.6,60
    c-1.3,0-2.4,1.1-2.4,2.4c0,10.9,9.6,19.8,21.5,19.8h9.6c11.9,0,21.5-8.9,21.5-19.8c0-1.3-1.1-2.4-2.4-2.4C74.4,60,26.6,60,26.6,60z
    M29.2,64.7h42.6c-1.3,7.2-8.2,12.7-16.5,12.7h-9.6C37.4,77.4,30.5,71.9,29.2,64.7z`,
    text: "Excellent",
  },
};

const textStyle = {
    fontSize: `20px`,
    fontFamily : 'san-serif',
};
const Mood = ({ width, height, rating, range, index, padding }) => {
  return (
    <svg
      width={width - padding}
      height={height}
      x={width * index}
      y="0px"
      viewBox="0 0 100 100"
    >
      <path d={moods[index].path} fill={rating >= range[0] && rating <= range[1] ? "#994090" : "#d8d8d8"} />
      <text x='50%' y='120%' dominant-baseline="middle" text-anchor="middle" style={textStyle}>{moods[index].text}</text>
    </svg>
  );
};

export default Mood;
