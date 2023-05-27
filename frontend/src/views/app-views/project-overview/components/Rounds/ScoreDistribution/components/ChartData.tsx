import { useState } from "react";
import { Bar } from "react-chartjs-2";

const ChartData = () => {
  const [fitnessScores, setFitnessScore] = useState([]);

  const chartData = {
    labels: fitnessScores.map((_, index) => `Entry ${index + 1}`),
    datasets: [
      {
        label: 'Fitness Scores',
        data: fitnessScores,
        backgroundColor: 'rgba(75, 192, 192, 0.8)',
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>ChartData</div>
  )
}

export default ChartData