'use client'
import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

interface EmissionData {
    volume: number;
    CO2e: number;
    year: string;
    scope: string;
}

type CO2EmissionsChartsProps = {
    data: EmissionData[];
    selectedYear: string;
};

const CO2EmissionsChart: React.FC<CO2EmissionsChartsProps> = ({ data, selectedYear }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  const years = Array.from(new Set(data.map(item => item.year))).sort();
  const scopes = Array.from(new Set(data.map(item => item.scope))).sort();

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }

        const datasets = scopes.map((scope, index) => ({
          label: scope,
          data: years.map(year => 
            data.filter(item => item.year === year && item.scope === scope)
              .reduce((sum, item) => sum + item.CO2e, 0)
          ),
          // Too big to define in an interface / type
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          backgroundColor: (context: { chart: any; dataIndex: number; }) => {
            const chart = context.chart;
            console.log('chart')
            console.log(chart)
            const { chartArea } = chart;
            if (!chartArea) {
              return `hsla(${index * 360 / scopes.length}, 70%, 50%, 1)`;
            }
            const yearIndex = years.indexOf(selectedYear);
            return context.dataIndex === yearIndex 
              ? `hsla(${index * 360 / scopes.length}, 70%, 50%, 1)`
              : `hsla(${index * 360 / scopes.length}, 70%, 50%, 0.3)`;
          },
          barThickness: 40,
          borderWidth: 2,
          borderColor: 'white',
        }));

        chartInstance.current = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: years.map(year => `Y-${year}`),
            datasets: datasets,
          },
          options: {
            animations: {
                tension: {
                  duration: 1000,
                  easing: 'linear',
                  from: 1,
                  to: 0,
                  loop: true
                }
              },
            scales: {
                x: { 
                    stacked: true,
                    ticks: {
                      font: {
                        weight: 'bold'
                      }
                    }
                  },
                  y: { 
                    stacked: true,
                    grid: {
                        display: false,
                    }
                  },
            },
            maintainAspectRatio: false,
            responsive: true,
            plugins: {
              legend: { display: false },
              title: {
                display: false,
                text: 'CO2 Emissions by Scope and Year',
              },
            },
          },
        });
      }
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
    // No need to re-run this effect when the scope or years changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, selectedYear]);

  return (
    <div className="w-full max-w-96 mx-auto p-4 h-96 bg-gray-50 rounded-b-md">
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default CO2EmissionsChart;