import React, { useEffect, useRef, useState } from "react";
// import "./progressBar.css";

interface props {
  size: number;
  progress: number;
  strokeWidth: number;
  circleOneStroke: string;
  circleTwoStroke: string;
}

const ProgressBar: React.FC<props> = ({
  size,
  progress,
  circleTwoStroke,
  circleOneStroke,
  strokeWidth,
}) => {
  const center: number = size / 2;
  const radius: number = size / 2 - strokeWidth / 2;
  const circumference: number = 2 * Math.PI * radius;
  const [offSet, setOffSet] = useState<number>(0);
  const circleRef = useRef(null);

  useEffect(() => {
    const progressOffset = ((100 - progress) / 100) * circumference;
    setOffSet(progressOffset);

    if (null !== circleRef.current) {
      //   circleRef.current.style =
      //     "transition: stroke-dashoffset 850ms ease-in-out";
    }
  }, [circumference, progress, setOffSet, offSet]);

  return (
    <div className="">
      <svg width={size} height={size} className="circular__progress-bar">
        <circle
          ref={circleRef}
          className="circle fill-transparent"
          stroke={circleTwoStroke}
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offSet}
        ></circle>

        <text
          x={center}
          y={center}
          textAnchor="middle"
          alignmentBaseline="middle"
          className="percentage"
          fill=""
        >
          {progress}%
        </text>
      </svg>
    </div>
  );
};

export default ProgressBar;
