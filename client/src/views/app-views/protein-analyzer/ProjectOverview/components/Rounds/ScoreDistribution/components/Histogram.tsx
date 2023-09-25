import React from "react";
import { Box } from "@chakra-ui/react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';

type DataItem = {
  label: string;
  count: number;
};

type HistogramProps = {
  data: DataItem[];
};

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const Histogram = ({ data }: HistogramProps) => {
  const chartData = React.useMemo(() => {
    const labels: string[] = [];
    const counts: number[] = [];
    const backgroundColors: string[] = [];

    data.slice(0, 40).forEach(item => {
      labels.push(item.label);
      counts.push(item.count);
      backgroundColors.push(item.label === 'WT' ? '#ffff' : '#5C89B3');
    });

    return {
      labels: labels,
      datasets: [
        {
          label: "Score Distribution",
          data: counts,
          backgroundColor: backgroundColors,
        },
      ],
    }
  }, [data]);

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Score Distribution"
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          drawBorder: false
        }
      },
      x: {
        grid: {
          display: false
        }
      },
    },
  };

  return (
    <Box width="full" height="full" borderRadius="md">
      <Bar data={chartData} options={chartOptions} />
    </Box>
  );
}

const MemoizedHistogram = React.memo(Histogram);
export default MemoizedHistogram;