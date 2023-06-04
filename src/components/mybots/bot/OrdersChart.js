import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const Plot = dynamic(() => import('react-plotly.js').then((mod) => mod.default), {
  ssr: false,
});

export default function OrdersChart({ chart }) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const trace1 = {
      

      close: chart.close,

      decreasing: { line: { color: 'red' } },

      high: chart.hight,

      increasing: { line: { color: 'green' } },

      line: { color: 'rgba(31,119,180,1)' },

      low: chart.low,

      open: chart.open,

      type: 'candlestick',
      xaxis: 'x',
      yaxis: 'y'
    };

    setChartData([trace1]);
  }, []);

  const layout = {
    autosize: true,
    paper_bgcolor: '#1A1D1F',
    plot_bgcolor: '#1A1D1F',
    dragmode: 'zoom',
    showlegend: false,
    xaxis: {
      autorange: true,
      range: ['2017-01-03 12:00', '2017-02-15 12:00'],
      title: 'Date',
      type: 'date',
      rangeslider: { visible: false }
    },
    yaxis: {
      autorange: true,
      type: 'linear'
    },
  };
  const config = {
    displayModeBar: true,
    modeBarButtonsToRemove: [
      'zoom2d',
      'pan2d',
      'select2d',
      'lasso2d',
      'zoomIn2d',
      'zoomOut2d',
      'autoScale2d',
      'resetScale2d',
      'hoverClosestCartesian',
      'hoverCompareCartesian',
      'toggleSpikelines',
      'toImage',
    ],
    displaylogo: false,
    sliders: false,
  };

  return (
    <div className='w-full h-[500px] rounded-xl relative z-0'>
      <button className='absolute rounded-lg z-10 border border-1 border-white text-white font-light text-sm p-1 pl-2 pr-2 left-[10px] top-[10px]'>Orders | Pnl</button>
      <Plot data={chartData} layout={layout} config={config} style={{ width: '100%', height: '100%' }} />
    </div>
  );
}