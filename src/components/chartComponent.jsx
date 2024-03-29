import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';


const BarChart = ({current_balance,walletbalance,fixedeposit}) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const chartData = {
    labels: ['Your Balance Sheet'],
    datasets: [
      {
        label: 'Current Balance',
        data: [current_balance || 0],
        backgroundColor: '#96BFFF',
        borderColor: '#96BFFF',
        borderWidth: 1,
        
      },
      // {
      //   label: 'Fixed Deposits',
      //   data: [fixedeposit || 0],
      //   backgroundColor: '#0070B9',
      //   borderColor: '#0070B9',
      //   borderWidth: 1,
      // },
      {
        label: 'Wallet Balance',
        data: [walletbalance || 0],
        backgroundColor: '#7256E1',
        borderColor: '#7256E1',
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    if (!chartRef.current) return;

    // Destroy existing Chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: chartData,
    });

    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [current_balance,walletbalance,fixedeposit]);

  return <canvas ref={chartRef} />;
};

const PieChart = ({data1,data2,label1,label2}) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const chartData = {
    // labels: ['Your Balance Sheet'],
    datasets: [
      {
        label: label1,
        data: [data1,data2],
        backgroundColor: ['#96BFFF','#0070B9'],
        borderColor: '#96BFFF',
        borderWidth: 1,
        
      },
      // {
      //   label: label2,
      //   data: [data2 || 0],
      //   backgroundColor: '#0070B9',
      //   borderColor: '#0070B9',
      //   borderWidth: 1,
      // }
    ],
  };

  useEffect(() => {
    if (!chartRef.current) return;

    // Destroy existing Chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    chartInstance.current = new Chart(ctx, {
      type: 'doughnut',
      data: chartData,
    });

    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data1,data2,label1,label2]);

  return <canvas ref={chartRef} />;
};

export { BarChart,PieChart };
