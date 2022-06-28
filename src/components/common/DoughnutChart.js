import React, { useEffect, useState } from 'react';
import * as agCharts from 'ag-charts-community';
import { AgChartsReact } from 'ag-charts-react';
import { fetchData } from 'src/utils';

const DoughnutChart = ({nameField, refresh}) => {
    // const [totalMonthly, setTotalMonthly] = useState()
    // const [itemsNumber, setItemsNumber] = useState()

    let totalMonthly = 0;
    let totalItems;


    const [options, setOptions] = useState({
        type: 'polar',
        series: [
            {
                type: 'pie',
                labelKey: 'expense',
                angleKey: 'monthly',
                innerRadiusOffset: -70,
                // title: {enabled: true, text: 'Monthly Budgeted Expense', padding: {bottom: 500}}, 
                //useful for nested doughnut
                shadow: {enabled: true, color: '#807d77', xOffset: 5, yOffset: 5, blur: 5},
                tooltip: {
                    // enabled: true,
                    renderer: ({labelKey, angleKey, angleValue}) => {

                        const percentage = parseFloat(100 / (totalMonthly / angleValue)).toFixed(2) 

                        return `
                            <div style="padding: 10px 20px">
                                <p>${angleValue}$</p>
                                <p>${percentage}%</p>
                            </div>
                        `
                    }
                }
            },
        ],
        title: {enabled: true, text: "Budget-2022", padding: {bottom: 1000}, fontSize: 24},
        subtitle: {enabled: true, text: "Monthly Budgeted Expense", fontSize: 18},
        legend: {item: {marker: {shape: 'circle', strokeWidth: 5}, paddingY: 20, paddingX: 20}},
        theme: {
            baseTheme: 'ag-vivid', 
            overrides: {
                pie: {
                    padding: {top: 50, bottom: 50}, 
                    title: {enabled:true, text: 'Testing'}
                }
            }
        }
    })

    useEffect(() => {
        const data = fetchData(nameField)
        const optionsData = []
        
        for (const item of data) {
            optionsData.push({expense: item.expense, monthly: item.monthly})
            totalMonthly += item.monthly
        }

        setOptions({...options, data: optionsData})
        
        totalItems = optionsData.length


    }, [refresh])

    return (
        <div style={{height: 400}}>
            <AgChartsReact 
                options={options}
            />
        </div>
    );
};

export default DoughnutChart;