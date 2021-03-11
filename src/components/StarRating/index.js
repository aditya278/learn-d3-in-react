import React from "react";

import Star from "./Star";
import Bars from "../FinalBar";
import Mood from './Mood';

const StarRating = ({ width, height, rating, size, variant }) => {
  const maxRating = variant==='stars' || variant==='smiley' ? 5 : 10;
  const unitValue = 100 / maxRating;

  const calculateValue = (index) => {
    const val = rating / unitValue;
    if (val >= index + 1) return 1;

    return val - index >= 0 ? val - index : 0;
  };

  const ratingValArr = [];
  for (let i = 0; i < maxRating; i++) {
    ratingValArr.push(calculateValue(i));
  }

  const getVariant = (ratingValArr) => {
    switch(variant) {
        case 'stars' : return (
            <g>
                {
                    ratingValArr.length>0 &&
                    ratingValArr.map((value, index) => (
                        <Star
                            size={size}
                            x={0 + index * (width/maxRating)}
                            y={height/2 - size/2}
                            value={value}
                            borderWidth={1}
                            borderColor={"#E6E7E8"}
                            starColor={"#f8b53b"}
                            backgroundColor={"#E6E7E8"}
                            index={index}
                        />
                    ))
                }
            </g>
        )
        case 'bars' :
            const dataArr = [];
            const colors = [];
            ratingValArr.forEach((value, index) => {
                dataArr.push({
                    label : index,
                    value : (index+1) * 10
                });
                if(value===1)
                    colors.push('#B2A1E0');
                else
                    colors.push('#e6e7e8');
            });
            return <Bars data={dataArr} color={colors} />
        
        case 'smiley' : return (
            <>
            {
                ratingValArr.length>0 &&
                ratingValArr.map((value, index) => (
                    <Mood 
                        key={index}
                        width={width/maxRating}
                        height={height}
                        rating={rating}
                        range={[(unitValue * index) + 1, unitValue * (index + 1)]}
                        index={index}
                        padding={10}
                    />
                ))
            }
            </>
        )
        default:
            return null;
    }
  };

  return (
    <svg width={width} height={height}>
        {
            getVariant(ratingValArr)
        }
    </svg>
  );
};

export default StarRating;