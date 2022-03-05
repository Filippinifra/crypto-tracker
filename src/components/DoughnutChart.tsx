import React, { FC } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const DoughnutChart: FC<{ data: any }> = ({ data }) => {
  return (
    <div style={{ height: 300, width: 300 }}>
      <Doughnut data={data} />
    </div>
  );
};
