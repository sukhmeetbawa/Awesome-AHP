import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

interface BarGraphProps {
    data: number[];
    labels: string[];
    label: string;
}

const BarGraph: React.FC<BarGraphProps> = ({ data, labels, label }) => {
    const chartRef = useRef<HTMLCanvasElement | null>(null);
    const chartInstance = useRef<Chart | null>(null);

    const createChart = () => {
        // Destroy the existing chart if it exists
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        // Create a new chart
        if (chartRef.current) {
            const ctx = chartRef.current.getContext("2d");
            if (ctx) {
                chartInstance.current = new Chart(ctx, {
                    type: "bar",
                    data: {
                        labels: labels,
                        datasets: [
                            {
                                label: label,
                                data: data,
                                backgroundColor: "rgba(75, 192, 192, 0.2)",
                                borderColor: "rgba(75, 192, 192, 1)",
                                borderWidth: 1,
                            },
                        ],
                    },
                    options: {
                        indexAxis: "y",
                    },
                });
            }
        }
    };

    useEffect(() => {
        createChart();

        // Cleanup function to destroy the chart when the component unmounts
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [data, labels]);

    return <canvas ref={chartRef}></canvas>;
};

export default BarGraph;
