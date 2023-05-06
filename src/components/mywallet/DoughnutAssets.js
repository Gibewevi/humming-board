import { useState } from "react"
import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';


export default function DoughnutAssets(props) {

    const chartData = {
        labels: [],
        dataSets_data: [],
        backgroundColor: [],
        hoverBackgroundColor: [],
    };

    function getRandomColorInRange(baseColor, range) {
        const color = baseColor.substring(1);
        const R = parseInt(color.substring(0, 2), 16);
        const G = parseInt(color.substring(2, 4), 16);
        const B = parseInt(color.substring(4, 6), 16);
      
        const randomInRange = (value, range) => {
          const min = Math.max(0, value - range);
          const max = Math.min(255, value + range);
          return Math.floor(Math.random() * (max - min + 1)) + min;
        };
      
        const newR = randomInRange(R, range);
        const newG = randomInRange(G, range);
        const newB = randomInRange(B, range);
      
        return `#${((1 << 24) + (newR << 16) + (newG << 8) + newB).toString(16).slice(1)}`;
      }
      

    function getHoverColor(hexColor, shade) {
        const color = hexColor.substring(1);
        let R = parseInt(color.substring(0, 2), 16);
        let G = parseInt(color.substring(2, 4), 16);
        let B = parseInt(color.substring(4, 6), 16);

        R = Math.min(255, Math.floor(R * (1 + shade)));
        G = Math.min(255, Math.floor(G * (1 + shade)));
        B = Math.min(255, Math.floor(B * (1 + shade)));

        return `#${((1 << 24) + (R << 16) + (G << 8) + B).toString(16).slice(1)}`;
    }


    const chartDatas = props.assets.map((asset, key) => {
        chartData.labels.push(asset.pair);
        chartData.dataSets_data.push(asset.currentAmount);
        chartData.backgroundColor.push(getRandomColorInRange('#1A1D1F', 40));
        chartData.hoverBackgroundColor.push(getHoverColor(chartData.backgroundColor[key], 5));
    });
    const chartRef = useRef(null);

    useEffect(() => {
        const ctx = chartRef.current.getContext('2d');
        // Définissez les données et les options pour le graphique Doughnut
        const data = {
            labels: chartData.labels,
            datasets: [
                {
                    data: chartData.dataSets_data,
                    backgroundColor: chartData.backgroundColor,
                    hoverBackgroundColor: chartData.hoverBackgroundColor,
                    borderColor: ['#111315'],
                    hoverOffset: 8,
                },
            ],
        };

        const options = {
            responsive: true,
            cutoutPercentage: 50, // pour un graphique doughnut, utilisez une valeur > 0
            // cutoutPercentage: 0, // pour un graphique pie, utilisez 0
        };

        // Créez le graphique Doughnut
        const doughnutChart = new Chart(ctx, {
            type: 'doughnut',
            data: data,
            options: options,
        });

        // Nettoyer lors du démontage du composant
        return () => {
            doughnutChart.destroy();
        };
    }, [props.assets]);

    return (
        <div className=" w-[350px] h-[350px] shadow-lg bg-[#1A1D1F] p-3">
            <canvas ref={chartRef} ></canvas>
        </div>
    );
};