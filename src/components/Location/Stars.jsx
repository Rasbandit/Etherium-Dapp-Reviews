import React from "react";
import { Field } from "formik";


export const Star = (props) => {
  console.log(props)

  const { index, rating, width, handleClick } = props;
  const fullStars = Math.floor(rating);
  const fractionalStars = rating - fullStars;
  let percent = 0;
  if (index <= fullStars) {
    percent = 100;
  } else if (index === fullStars + 1) {
    // exact percentage
    // percent = fractionalStars * 100;
    // round to closest quarter percentage
    percent = Math.round(fractionalStars * 4) * 25;
    // round down if rating lower than full quarter
    // percent = Math.floor(fractionalStars * 4) * 25;
  }
  return (
    <svg
      className="star-svg"
      viewBox="0 0 400 400"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: width }}
      onClick={() => {
        handleClick(index);
      }}
    >
      <g>
        <clipPath id={`fill-percent_${index}`}>
          <rect x="0" y="0" width={`${percent}%`} height="100%" />
        </clipPath>
        <path
          id={`star-stroke_${index}`}
          fill="lightgray"
          // stroke="#000"
          // strokeWidth="5"
          // strokeLinejoin="round"
          d="m2.1625,144.9219l151.42047,0l46.79009,-143.84879l46.79012,143.84879l151.42044,0l-122.50151,88.90242l46.79251,143.84879l-122.50156,-88.90484l-122.50153,88.90484l46.79252,-143.84879l-122.50155,-88.90242z"
        />
        <path
          id={`star-fill_${index}`}
          fill="gold"
          clipPath={`url(#fill-percent_${index})`}
          d="m2.1625,144.9219l151.42047,0l46.79009,-143.84879l46.79012,143.84879l151.42044,0l-122.50151,88.90242l46.79251,143.84879l-122.50156,-88.90484l-122.50153,88.90484l46.79252,-143.84879l-122.50155,-88.90242z"
        />
        <path
          id={`star-stroke_${index}`}
          fill="none"
          stroke="#000"
          strokeWidth="5"
          strokeLinejoin="round"
          d="m2.1625,144.9219l151.42047,0l46.79009,-143.84879l46.79012,143.84879l151.42044,0l-122.50151,88.90242l46.79251,143.84879l-122.50156,-88.90484l-122.50153,88.90484l46.79252,-143.84879l-122.50155,-88.90242z"
        />
      </g>
    </svg>
  );
};

const Stars = (props) => {
  const rating = Number(props.count) || 0;
  return (
    <Field>
      {() => (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {[...Array(5)].map((x, i) => (
            <Star
              key={i}
              index={i + 1}
              rating={rating}
              width="50px"
              handleClick={props.handleClick}
            />
          ))}
        </div>
      )}
    </Field>
  );
};
export default Stars;
