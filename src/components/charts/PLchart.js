import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

const PLchart = ({ data }) => {
    const canvasRef = useRef(null);

    const chartOptions = {
      aspectRatio: false,
      responsive: true,
      align: 'start',
      elements: {
        point: {
          radius: 0
        }
      },
      scales: {
        x: {
          ticks: {
            display: true,
            font: {
              size: 10
            }
          }
        },
        y: {
          ticks: {
            display: true,
            suggestedMin: 0,
            suggestedMax: 10,
            font: {
              size: 10
            }
          }
        }
      },
      plugins: {
        legend: {
          position: 'right', // Placer la légende à gauche
          align: 'start', // Aligner la légende en haut à gauche
          labels: {
            boxWidth: 12, // Ajuster la largeur du rectangle de couleur
            padding: 10 // Ajuster l'espacement autour de la légende
          }
        }
      }
    };
  
  
  
  

    useEffect(() => {
        const ctx = canvasRef.current.getContext('2d');
        const chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.map(d => d.timestamp),
                datasets: [{
                    label: 'P&L',
                    data: data.map(d => d.profit),
                    pointBackgroundColor: '#dc1f30',
                    fill: false,
                    borderColor: '#dc1f30',
                    tension: 0.3,
                    borderWidth: 1.2
                }]
            },
            options: chartOptions
        });

        return () => {
            chart.destroy();
        }
    }, [data]);

    return (
        <canvas ref={canvasRef} style={{width:'100%'}} />
    );

};

export default PLchart;
