import React, { FC } from "react";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip);

export const DoughnutChart: FC<{ data: any }> = ({ data }) => {
  return (
    <div style={{ height: 300, width: 300 }}>
      <Doughnut data={data} />
    </div>
  );
};
