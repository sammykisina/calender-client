import React from "react";
import Chart from "react-apexcharts";

const ActivityChart = () => {
  const options: any = {
    series: [
      {
        name: "Completed",
        data: [3, 6, 5, 4, 5, 4, 9],
      },
    ],
    options: {
      colors: ["#6969de"],
      chart: {
        background: "transparent",
        toolbar: {
          show: false,
        },
        fill: {
          type: "gradient",
          shade: "dark",
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0,
            type: "diagonal1",
            inverseColors: true,
            opacityTo: 0.1,
            stops: [0, 90, 100],
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        categories: ["Sun", "Mon", "Tue", "Wen", "Thur", "Fri", "Sat"],
      },

      legend: {
        position: "top",
      },
      grid: {
        show: true,
        // borderColor: "#4b576c",
        position: "back",
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
        column: {
          colors: undefined,
          opacity: 0.5,
        },
      },
    },
  };

  return (
    <div className="border mt-5 py-3 rounded-md shadow-md xl:w-3/4">
      <span className="text-lg font-bold px-6">
        Overview - <span className="text-sm">Completed</span>
      </span>
      <div className="h-[200px] px-1 w-full">
        <Chart
          options={options.options}
          series={options.series}
          type="area"
          height="100%"
          width="100%"
        />
      </div>
    </div>
  );
};

export default ActivityChart;
