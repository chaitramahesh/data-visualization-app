
import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import "./BarChart.css";

const BarChart = ({ data, selectedProducts }) => {
  const [chartData, setChartData] = useState({
    xValues: [],
    yValues: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const selectedIds = selectedProducts;
        const selectedData = selectedIds.map((id) =>
          data.filter((item) => item.id === id)
        );
        const xValues = selectedData.map((product) => product[0].title);
        const yValues = selectedData.map((product) => product[0].price);

        setChartData({
          xValues,
          yValues,
        });
      } catch (error) {
        console.error("Error fetching data for chart:", error);
      }
    };

    fetchData();
  }, [data, selectedProducts]);

  return (
    <div className="bar-chart">
      <Plot
        data={[
          {
            type: "bar",
            x: chartData.xValues,
            y: chartData.yValues,
            marker: { color: "navyBlue" },
          },
        ]}
        layout={{
          displaylogo: false,
          title: "Data Visualization",
          showlegend: false,
          font: {
            family:
              "Segoe UI, Roboto, Oxygen,Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
            color: "black",
            weight: "bold",
          },
          xaxis: { title: "Product Name" },
          yaxis: { title: "Price" },
        }}
        config={{
          displayModeBar: false,  
        }}
      />
    </div>
  );
};

export default BarChart;
