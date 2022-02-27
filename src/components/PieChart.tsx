import React, { FC } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const PieChart: FC<{ data: any }> = ({ data }) => {
  return (
    <div style={{ height: 300, width: 300 }}>
      <Pie data={data} />
    </div>
  );
};
