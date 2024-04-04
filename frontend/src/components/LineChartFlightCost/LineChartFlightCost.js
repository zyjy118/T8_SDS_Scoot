import { Line } from "react-chartjs-2";
import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Registering the components necessary for the line chart
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const LineChart_FlightCost = ({ connectingFlightNumber, costData }) => {
  const noDelayCostData = Array(costData.length).fill(costData[0] || 0);
  // Dummy data for the chart
  const data = {
    labels: [
      "0 min",
      "5 min",
      "10 min",
      "15 min",
      "20 min",
      "25 min",
      "30 min",
      "35 min",
      "40 min",
      "45 min",
      "50 min",
      "55 min",
      "60 min",
    ],
    datasets: [
      {
        label: "No Delay Cost",
        data: noDelayCostData,
        fill: false,
        backgroundColor: "#EE5757",
        borderColor: "#EE5757",
        hoverBackgroundColor: "#FF7171",
      },
      {
        label: "Delay Cost",
        data: costData,
        fill: false,
        backgroundColor: "#1679DB",
        borderColor: "#1679DB",
        hoverBackgroundColor: "#3199FF",
      },
    ],
  };

  // Updated Custom Legend Component
  const CustomLegend = ({ data }) => {
    if (!data?.datasets?.length) {
      return null;
    }

    const labelsToShow = ["Delay Cost", "No Delay Cost"];

    return (
      <div
        className="chartjs-legend"
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          paddingTop: "5px",
        }}
      >
        <ul
          style={{
            listStyleType: "none",
            margin: 0,
            padding: 0,
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {data.datasets
            .filter((dataset) => labelsToShow.includes(dataset.label))
            .map((dataset, index) => (
              <li
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginRight: "15px",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    marginRight: "10px",
                    backgroundColor: dataset.backgroundColor,
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    border: `2px solid ${dataset.borderColor}`,
                  }}
                ></span>
                {dataset.label}
              </li>
            ))}
        </ul>
      </div>
    );
  };

  let maxValue = Math.max(...data.datasets[0].data, ...data.datasets[1].data);
  maxValue += 50;

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Delay Time (min)",
          color: "#000",
          font: {
            size: 15,
            weight: "bold",
            lineHeight: 1.2,
          },
          padding: { top: 5, left: 0, right: 0, bottom: 0 },
        },
      },
      y: {
        min: 0,
        max: maxValue,
        title: {
          display: true,
          text: "Cost ($)",
          color: "#000",
          font: {
            size: 15,
            weight: "bold",
            lineHeight: 1.2,
          },
          ticks: {
            beginAtZero: true,
            stepSize: 50,
          },
          padding: { top: 0, left: 0, right: 0, bottom: 5 },
        },
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div style={{ position: "relative", height: "250px", width: "450px" }}>
      <Line data={data} options={options} />
      <CustomLegend data={data} />
    </div>
  );
};
